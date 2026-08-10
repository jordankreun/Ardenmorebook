#!/usr/bin/env node
/* The offline guard. Run before every deploy:  node test/check-shell.mjs
 *
 * Splitting one self-contained file into twenty-three has exactly one
 * catastrophic failure mode: a file the service worker does not precache 404s
 * offline, and a module-graph failure is a silent white screen. This script
 * walks the real graph and fails if sw.js's APP list has drifted from it.
 *
 * No dependencies, no package.json — it only reads files.
 */
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const problems = [];

/* 1. Everything reader.html references. */
const html = read("reader.html");
const referenced = new Set();
for (const m of html.matchAll(/<script[^>]+src="([^"]+)"/g)) referenced.add(m[1]);
for (const m of html.matchAll(/<link[^>]+href="([^"]+)"/g)) {
  const href = m[1];
  if (href.endsWith(".css") || href.endsWith(".js")) referenced.add(href);
}
for (const href of referenced) {
  if (href.startsWith("/")) problems.push(`reader.html references an absolute URL: ${href}`);
}

/* 2. The transitive closure of every import in app/. */
const seen = new Set();
const queue = [...referenced].filter((p) => p.endsWith(".js"));
while (queue.length) {
  const file = normalize(queue.shift());
  if (seen.has(file)) continue;
  seen.add(file);
  if (!existsSync(join(ROOT, file))) {
    problems.push(`missing file: ${file}`);
    continue;
  }
  const src = read(file);
  // Comments talk about dynamic import(); only the code counts.
  const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
  if (/[^.\w]import\s*\(/.test(code)) {
    problems.push(
      `${file} uses a dynamic import(). The graph must be static: the service ` +
        `worker adopts running pages, so a late import would mix cache versions.`
    );
  }
  /* `code`, not `src`. This scanned the raw source, so any PROSE containing the
     word from followed by a quoted phrase was read as an import — a comment
     ending 'indistinguishable from "cross-device syncing is not working"' failed
     the build. The same flaw would also have queued a commented-out import as a
     real graph edge. The comment-stripped copy already existed two lines up. */
  for (const m of code.matchAll(/\bfrom\s+"([^"]+)"|^\s*import\s+"([^"]+)"/gm)) {
    const spec = m[1] || m[2];
    if (!spec.startsWith(".")) {
      problems.push(`${file} imports a bare specifier "${spec}" — no bundler, no CDN.`);
      continue;
    }
    queue.push(relative(ROOT, join(ROOT, dirname(file), spec)));
  }
}

/* 3. The closure must be a subset of sw.js's APP list, and APP must not name a
      file that does not exist. */
const sw = read("sw.js");
/* The build stamp shown in Settings must equal the service worker's VERSION.
   They are two hand-edited constants in two files, so they WILL drift, and a
   version display that lies is worse than none: its whole job is to answer
   "am I running the new code?" at a glance. */
const swVer = (sw.match(/const VERSION\s*=\s*"([^"]+)"/) || [])[1];
const cfgVer = (read("app/config.js").match(/APP_VERSION\s*=\s*"([^"]+)"/) || [])[1];
if (!swVer) problems.push("sw.js has no VERSION constant");
if (!cfgVer) problems.push("app/config.js has no APP_VERSION constant");
if (swVer && cfgVer && swVer !== cfgVer) {
  problems.push(
    `version drift: sw.js VERSION is "${swVer}" but app/config.js APP_VERSION is "${cfgVer}". ` +
      `Bump both, or Settings will report a version the app is not running.`
  );
}

const appBlock = sw.match(/const APP = \[([\s\S]*?)\];/);
if (!appBlock) problems.push("sw.js: could not find the APP array");
const app = new Set(appBlock ? [...appBlock[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]) : []);

const needed = new Set([...seen, ...[...referenced].filter((p) => p.endsWith(".css")), "reader.html"]);
for (const f of needed) if (!app.has(f)) problems.push(`sw.js APP is missing: ${f}`);
for (const f of app) if (!existsSync(join(ROOT, f))) problems.push(`sw.js APP lists a missing file: ${f}`);

/* 4. The CSP hash for reader.html's inline failure-surface script. There is no
      build step, so the hash is written into vercel.json by hand; if it drifts,
      the failure surface is silently blocked in production. */
const inline = html.match(/<script>([\s\S]*?)<\/script>/);
if (inline) {
  const hash = "sha256-" + createHash("sha256").update(inline[1], "utf8").digest("base64");
  const vercel = read("vercel.json");
  if (!vercel.includes(hash)) {
    problems.push(
      `vercel.json CSP does not carry the inline script's hash.\n    expected: '${hash}'`
    );
  }
}

/* 5. .vercelignore must not exclude the application itself. */
const ignore = read(".vercelignore")
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith("#"));
for (const line of ignore) {
  if (line === "app" || line === "app/" || line.startsWith("app/")) {
    problems.push(`.vercelignore excludes ${line} — every module would 404 in production.`);
  }
}

if (problems.length) {
  console.error("check-shell FAILED:\n" + problems.map((p) => "  - " + p).join("\n"));
  process.exit(1);
}
console.log(`check-shell OK — ${app.size} files precached, ${seen.size} modules in the graph.`);
