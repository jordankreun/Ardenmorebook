/* The Tower of Ardenmoor — offline service worker.
   Precaches the app shell + the whole manuscript at install, so the reader
   works fully offline and installs as a portable web app. The reader fetches
   the markdown with a ?v= cache-buster and cache:"no-store"; we normalize the
   URL (strip the query) for the cache key so offline lookups still hit. The
   /api/ sync endpoint is never cached (it is dynamic and authenticated). */
const VERSION = "ardenmoor-v18";
const SHELL = [
  "/", "/reader.html", "/manifest.webmanifest",
  "/icon-192.png", "/icon-512.png", "/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    // App shell (best-effort per item so one 404 doesn't fail the whole install).
    await Promise.all(SHELL.map((u) => cache.add(u).catch(() => {})));
    // Precache the whole book so it is available offline right after install.
    try {
      const mres = await fetch("manuscript/manifest.json", { cache: "no-store" });
      await cache.put("/manuscript/manifest.json", mres.clone());
      const files = await mres.json();
      await Promise.all(files.map(async (f) => {
        try {
          const r = await fetch("manuscript/" + f, { cache: "no-store" });
          if (r.ok) await cache.put("/manuscript/" + f, r.clone());
        } catch (e) {}
      }));
    } catch (e) {}
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

function normalize(u) { const url = new URL(u); return url.origin + url.pathname; } // drop ?v=

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Never cache the sync API.
  if (url.pathname.indexOf("/api/") === 0) return;

  // Manuscript (markdown + manifest.json): network-first so edits show when
  // online; fall back to the normalized cache when offline.
  if (url.pathname.indexOf("/manuscript/") === 0) {
    const key = normalize(req.url);
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res && res.ok) { const c = await caches.open(VERSION); c.put(key, res.clone()); }
        return res;
      } catch (e) {
        const hit = await caches.match(key);
        return hit || Response.error();
      }
    })());
    return;
  }

  // Navigations (address bar, PWA launch icon, the start_url "/"): always serve
  // the app shell. Network-first so the freshest reader.html wins when online;
  // fall back to the cached shell when offline. This makes "/" work offline
  // regardless of any server-side "/"→/reader.html rewrite, and guarantees a bare
  // directory index is never cache-served in place of the app. We match the root
  // and any directory path explicitly, not only req.mode==="navigate", because a
  // SW-controlled offline navigation does not always surface mode "navigate".
  const isNav = req.mode === "navigate" || url.pathname === "/" || url.pathname.endsWith("/");
  if (isNav) {
    event.respondWith((async () => {
      // Serve the cached app shell directly. We must NOT fetch the raw navigation
      // URL: "/" (or any directory path) can resolve to a server index listing,
      // and offline that listing may even come back from the browser's own HTTP
      // cache with a 200, masquerading as the app. The reader is a single page, so
      // every navigation is reader.html. Freshness comes from the SW version bump
      // (re-precaches reader.html on activate) and from the network-first manuscript.
      const shell = await caches.match("/reader.html");
      if (shell) return shell;
      try { return await fetch("/reader.html"); } catch (e) {}
      try { return await fetch(req); } catch (e) {}
      return Response.error();
    })());
    return;
  }

  // Other same-origin assets: cache-first, then network, then the cached reader
  // as a last resort.
  event.respondWith((async () => {
    const hit = await caches.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res && res.ok && url.origin === self.location.origin) {
        const c = await caches.open(VERSION); c.put(req, res.clone());
      }
      return res;
    } catch (e) {
      return (await caches.match("/reader.html")) || (await caches.match("/")) || Response.error();
    }
  })());
});
