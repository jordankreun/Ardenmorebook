/* The Tower of Ardenmoor — offline service worker.
   Precaches the app shell + the whole manuscript at install, so the reader
   works fully offline and installs as a portable web app. The reader fetches
   the markdown with a ?v= cache-buster and cache:"no-store"; we normalize the
   URL (strip the query) for the cache key so offline lookups still hit. The
   /api/ sync endpoint is never cached (it is dynamic and authenticated). */
const VERSION = "ardenmoor-v39";

/* THE APPLICATION GRAPH. If a file is missing from this list the app 404s
   offline — and unlike the old single self-contained file, a missing module is a
   silent white screen. test/check-shell.mjs walks every import in app/*.js and
   every src/href in reader.html and fails if anything here is missing. Run it
   before every deploy, and bump VERSION by hand on every content or app push. */
const APP = [
  "reader.html", "app/app.css",
  "app/boot.js", "app/config.js", "app/dom.js", "app/schedule.js", "app/toast.js",
  "app/icons.js", "app/text.js", "app/diff.js", "app/storage.js", "app/store.js",
  "app/manuscript.js", "app/render.js", "app/popover.js", "app/editor.js",
  "app/composer.js", "app/gestures.js", "app/sync.js", "app/exports.js",
  "app/panels.js", "app/shell.js", "app/position.js", "app/verify.js"
];
const EXTRAS = ["/", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
const abs = (p) => new URL(p, self.registration.scope).pathname;

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    /* The app graph is ALL-OR-NOTHING. Best-effort per item is right for icons
       but catastrophic for modules: a partial install is a white screen offline.
       A throw here fails the install and the PREVIOUS worker keeps serving,
       which is the correct failure mode. {cache:"reload"} bypasses the browser's
       own HTTP cache so a VERSION bump genuinely fetches fresh files. */
    await Promise.all(APP.map(async (p) => {
      const u = abs(p);
      const r = await fetch(u, { cache: "reload" });
      if (!r.ok) throw new Error("precache failed: " + u);
      await cache.put(u, r);
    }));
    // Icons and the manifest are best-effort: one 404 must not fail the install.
    await Promise.all(EXTRAS.map((u) => cache.add(abs(u)).catch(() => {})));
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
  // the app shell. This makes "/" work offline regardless of any server-side
  // "/"→/reader.html rewrite, and guarantees a bare directory index is never
  // cache-served in place of the app. We match the root and any directory path
  // explicitly, not only req.mode==="navigate", because a SW-controlled offline
  // navigation does not always surface mode "navigate".
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

  /* Other same-origin assets — which is where every app/*.js module lands:
     cache-first, then network, then the cached reader as a last resort.
     Cache-first is exactly right for the module graph, because it guarantees
     reader.html and its modules are always served from the SAME cache version.
     A mid-session worker swap therefore cannot produce a mixed-version app,
     which is also why app/ contains no dynamic import(). */
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
