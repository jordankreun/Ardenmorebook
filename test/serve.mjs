/* Minimal static server for the harness. Mirrors vercel.json's one rewrite
   ("/" -> reader.html) and additionally exposes the pre-rebuild reader at
   /old-reader.html so both versions can be driven from the site root, where
   their relative manuscript/ URLs resolve. */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".webmanifest": "application/manifest+json",
};

/* Server-side state for the sync stub, so a test can push from one "device" and
   pull from another. Reset with resetStore(). */
export const STORE = { notes: [], revisions: [], clearedAt: 0 };
export function resetStore(v = {}) {
  STORE.notes = v.notes || []; STORE.revisions = v.revisions || []; STORE.clearedAt = v.clearedAt || 0;
}

export function serve(port) {
  const server = createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);

    /* Stub for the sync endpoint. The performance question the author asked
       about ("the edit with track changes is slow") only reproduces when sync
       is CONFIGURED: in the pre-rebuild reader every committed edit scheduled a
       push, and the push's completion callback ran a full decorate() over the
       whole document. With no endpoint the push fails early and that second
       re-render never happens, so the harness measures the wrong thing and
       reports a flattering zero. This stub makes the push succeed. */
    if (p === "/api/sync") {
      let body = "";
      req.on("data", (c) => { body += c; });
      await new Promise((r) => req.on("end", r));
      let j = {};
      try { j = JSON.parse(body || "{}"); } catch {}
      // Enough of the real server to exercise the tombstone: the epoch only ever
      // moves forward, and records at or before it are dropped.
      if (req.method === "POST") {
        STORE.clearedAt = Math.max(STORE.clearedAt, Number(j.clearedAt) || 0);
        const keep = (a) => (a || []).filter((r) => (r.ts || 0) > STORE.clearedAt);
        if (Array.isArray(j.notes)) STORE.notes = keep(j.notes);
        if (Array.isArray(j.revisions)) STORE.revisions = keep(j.revisions);
        if (STORE.clearedAt) { STORE.notes = keep(STORE.notes); STORE.revisions = keep(STORE.revisions); }
      }
      res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
      res.end(JSON.stringify({ ok: true, via: "stub", notes: STORE.notes, revisions: STORE.revisions, clearedAt: STORE.clearedAt }));
      return;
    }

    if (p === "/") p = "/reader.html";
    if (p === "/old-reader.html") p = "/test/old-reader.html";
    const file = join(ROOT, normalize(p).replace(/^(\.\.[/\\])+/, ""));
    try {
      const s = await stat(file);
      if (!s.isFile()) throw new Error("not a file");
      const body = await readFile(file);
      res.writeHead(200, {
        "Content-Type": TYPES[extname(file)] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      res.end(body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("not found");
    }
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.argv[2] || 8137);
  await serve(port);
  console.log("serving " + ROOT + " on http://127.0.0.1:" + port);
}
