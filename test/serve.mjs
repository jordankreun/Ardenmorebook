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

export function serve(port) {
  const server = createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
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
