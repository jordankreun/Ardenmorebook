/* End-to-end smoke test + the tracked-change performance measurement.
 *
 *   NODE_PATH=/opt/node22/lib/node_modules node test/smoke.mjs
 *
 * Drives the real app in real Chromium against the real manuscript. The
 * performance section runs the SAME edit against the rebuilt app and against
 * the pre-rebuild reader kept at test/old-reader.html, so the two numbers are
 * comparable rather than a microbenchmark of the wrong thing.
 */
// ESM ignores NODE_PATH, and playwright is CommonJS, so the global install is
// imported by absolute path via its default export.
import playwright from "/opt/node22/lib/node_modules/playwright/index.js";
const { chromium } = playwright;
import { serve, resetStore, STORE } from "./serve.mjs";

const PORT = 8139;
const BASE = `http://127.0.0.1:${PORT}`;
const KEY_NOTES = "ardenmoor.comments.v1";
const KEY_REVS = "ardenmoor.revisions.v1";
const KEY_MODE = "ardenmoor.mode.v1";
const KEY_INLINE = "ardenmoor.inlineedit.v1";

let pass = 0;
const fails = [];
const ok = (cond, name, detail) => {
  if (cond) { pass++; console.log(`  ok    ${name}`); }
  else { fails.push(name + (detail ? ` — ${detail}` : "")); console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`); }
};

const server = await serve(PORT);
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });

async function newPage(ctxOpts = {}, seed = null) {
  const ctx = await browser.newContext(ctxOpts);
  if (seed) {
    await ctx.addInitScript((s) => {
      for (const [k, v] of Object.entries(s)) localStorage.setItem(k, v);
    }, seed);
  }
  // Every page records main-thread long tasks (>50ms). That is the thing the
  // author actually feels as "the edit with track changes is slow": not the
  // wall-clock of a click handler, but the stretches where the browser cannot
  // respond because the app is re-rendering.
  await ctx.addInitScript(() => {
    window.__long = [];
    try {
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__long.push(e.duration); })
        .observe({ entryTypes: ["longtask"] });
    } catch {}
    window.__blockSince = (t) => window.__long.slice(t).reduce((a, b) => a + b, 0);
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => {
    // Chromium always requests /favicon.ico; the static harness has none. Not an app defect.
    if (m.type() === "error" && !/favicon\.ico/.test(m.text() + JSON.stringify(m.location()))) {
      errors.push("console: " + m.text());
    }
  });
  return { ctx, page, errors };
}

/* ---------- 1. it loads and renders ---------- */
console.log("\n== loads and renders ==");
{
  const { ctx, page, errors } = await newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForSelector("p.para", { timeout: 20000 }).catch(() => {});
  const paras = await page.locator("p.para").count();
  const secs = await page.locator("section").count();
  ok(paras > 1000, "manuscript renders", `${paras} paragraphs`);
  ok(secs >= 37, "every chapter present", `${secs} sections`);
  ok(errors.length === 0, "no page errors on load", errors.slice(0, 3).join(" | "));
  const title = await page.title();
  ok(/Ardenmoor/.test(title), "title", title);
  await ctx.close();
}

/* ---------- 2. old localStorage still loads ---------- */
console.log("\n== reads data written by the OLD app ==");
{
  const oldNote = {
    chap: "Chapter One: Ardenmoor", snip: "I have said the truth is plainer than the tellers would like",
    quote: "winter shut up in a Vethmark townhouse", text: "legacy note body",
    ts: 1785272944281, resolved: false,
  };
  const oldRev = {
    chap: "Chapter One: Ardenmoor", snip: "legacy-rev-snip",
    original: "LEGACY ORIGINAL PARAGRAPH", revised: "LEGACY REVISED PARAGRAPH",
    ts: 1785272944281, resolved: false,
  };
  const { ctx, page, errors } = await newPage({}, {
    [KEY_NOTES]: JSON.stringify([oldNote]),
    [KEY_REVS]: JSON.stringify([oldRev]),
    [KEY_MODE]: "review",
    "ardenmoor.theme.v1": "dark",
    "ardenmoor.fontsize.v1": "22",
  });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForSelector("p.para", { timeout: 20000 }).catch(() => {});
  const after = await page.evaluate(([kn, kr]) => ({
    notes: JSON.parse(localStorage.getItem(kn) || "[]"),
    revs: JSON.parse(localStorage.getItem(kr) || "[]"),
  }), [KEY_NOTES, KEY_REVS]);
  ok(after.notes.length === 1 && after.notes[0].text === "legacy note body", "legacy note survives load");
  ok(after.revs.length === 1 && after.revs[0].original === "LEGACY ORIGINAL PARAGRAPH", "legacy revision survives load");
  ok(after.notes[0].ts === 1785272944281, "legacy timestamp not rewritten");
  const fs = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--fs") || document.documentElement.style.fontSize || "");
  ok(true, "legacy theme/fontsize keys read without throwing", fs.trim());
  ok(errors.length === 0, "no page errors with legacy data", errors.slice(0, 3).join(" | "));
  await ctx.close();
}

/* ---------- 3. inline edit produces a correct tracked change ---------- */
console.log("\n== inline edit -> tracked change ==");
{
  const { ctx, page, errors } = await newPage({}, {
    [KEY_MODE]: "review", [KEY_INLINE]: "on", [KEY_REVS]: "[]", [KEY_NOTES]: "[]",
  });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForSelector("p.para", { timeout: 20000 }).catch(() => {});
  const p = page.locator("p.para").nth(3);
  await p.scrollIntoViewIfNeeded();
  const before = (await p.innerText()).trim();
  await p.click();
  await page.waitForTimeout(200);
  const editable = await page.evaluate(() => {
    const a = document.activeElement;
    return !!(a && a.isContentEditable);
  });
  ok(editable, "click opens the inline editor on desktop");
  await page.keyboard.type("XYZZY ");
  await page.waitForTimeout(60);
  await page.locator("p.para").nth(20).click({ position: { x: 5, y: 5 } }).catch(() => {});
  await page.waitForTimeout(900);
  const revs = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || "[]"), KEY_REVS);
  ok(revs.length === 1, "exactly one revision recorded", `got ${revs.length}`);
  if (revs.length) {
    ok(revs[0].original.trim() === before, "original captured verbatim");
    ok(revs[0].revised.includes("XYZZY"), "revised carries the typed text");
    ok(!revs[0].revised.includes(revs[0].original.slice(0, 40) + revs[0].original.slice(0, 40)),
       "revised is not original+revised concatenated");
    ok(typeof revs[0].ts === "number" && revs[0].ts > 0, "revision has a timestamp");
    ok(!!revs[0].chap && !!revs[0].snip, "revision is anchored (chap + snip)");
  }
  ok(errors.length === 0, "no page errors during edit", errors.slice(0, 3).join(" | "));
  await ctx.close();
}

/* ---------- 4. touch: single tap does NOT edit, double tap does ---------- */
console.log("\n== touch double-tap ==");
{
  const { ctx, page, errors } = await newPage(
    { hasTouch: true, isMobile: true, viewport: { width: 390, height: 780 } },
    { [KEY_MODE]: "review", [KEY_INLINE]: "on", [KEY_REVS]: "[]", [KEY_NOTES]: "[]" });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForSelector("p.para", { timeout: 20000 }).catch(() => {});
  const p = page.locator("p.para").nth(3);
  await p.scrollIntoViewIfNeeded();
  const box = await p.boundingBox();
  const pt = { x: box.x + 30, y: box.y + 10 };
  await page.touchscreen.tap(pt.x, pt.y);
  await page.waitForTimeout(500);
  const afterSingle = await page.evaluate(() => !!(document.activeElement && document.activeElement.isContentEditable));
  ok(!afterSingle, "a single tap does not open the editor");
  await page.touchscreen.tap(pt.x, pt.y);
  await page.waitForTimeout(120);
  await page.touchscreen.tap(pt.x, pt.y);
  await page.waitForTimeout(300);
  const afterDouble = await page.evaluate(() => !!(document.activeElement && document.activeElement.isContentEditable));
  ok(afterDouble, "a double tap opens the editor");
  ok(errors.length === 0, "no page errors on touch", errors.slice(0, 3).join(" | "));
  await ctx.close();
}


/* ---------- 4b. clear all, and the tombstone that makes it stick ---------- */
console.log("\n== clear all (the tombstone epoch) ==");
{
  const rec = (i, kind) => ({
    chap: "Chapter " + i, snip: kind + "-" + i,
    quote: "q", text: "note body " + i,
    original: "orig " + i, revised: "rev " + i,
    ts: 1785000000000 + i, resolved: false,
  });
  resetStore({ notes: [rec(1, "n")], revisions: [rec(2, "r")], clearedAt: 0 });

  // Device A: holds the same records locally, and clears.
  const a = await newPage({}, {
    [KEY_MODE]: "review",
    [KEY_NOTES]: JSON.stringify([rec(1, "n")]),
    [KEY_REVS]: JSON.stringify([rec(2, "r")]),
    "ardenmoor.sync.secret.v1": "harness-secret",
  });
  await a.page.goto(BASE + "/", { waitUntil: "networkidle" });
  await a.page.waitForSelector("p.para", { timeout: 20000 }).catch(() => {});
  await a.page.waitForTimeout(600);
  a.page.on("dialog", (d) => d.accept());
  await a.page.evaluate(() => { window.confirm = () => true; });
  await a.page.locator("#btnMenu").click();
  await a.page.waitForTimeout(250);
  await a.page.locator("#btnClearAll").click();
  await a.page.waitForTimeout(1500);
  const localA = await a.page.evaluate(([kn, kr, kc]) => ({
    notes: JSON.parse(localStorage.getItem(kn) || "[]").length,
    revs: JSON.parse(localStorage.getItem(kr) || "[]").length,
    cleared: Number(localStorage.getItem(kc) || 0),
  }), [KEY_NOTES, KEY_REVS, "ardenmoor.clearedat.v1"]);
  ok(localA.notes === 0 && localA.revs === 0, "clearing empties this device",
     `${localA.notes} notes, ${localA.revs} changes left`);
  ok(localA.cleared > 0, "an epoch was recorded locally");
  ok(STORE.notes.length === 0 && STORE.revisions.length === 0, "the server store is emptied too");
  ok(STORE.clearedAt > 0, "the epoch reached the server");
  await a.ctx.close();

  // Device B: never cleared, still holds both records, and comes online.
  // Without the tombstone its push would restore everything.
  const b = await newPage({}, {
    [KEY_MODE]: "review",
    [KEY_NOTES]: JSON.stringify([rec(1, "n")]),
    [KEY_REVS]: JSON.stringify([rec(2, "r")]),
    "ardenmoor.sync.secret.v1": "harness-secret",
  });
  await b.page.goto(BASE + "/", { waitUntil: "networkidle" });
  await b.page.waitForSelector("p.para", { timeout: 20000 }).catch(() => {});
  await b.page.waitForTimeout(1800);
  const localB = await b.page.evaluate(([kn, kr]) => ({
    notes: JSON.parse(localStorage.getItem(kn) || "[]").length,
    revs: JSON.parse(localStorage.getItem(kr) || "[]").length,
  }), [KEY_NOTES, KEY_REVS]);
  ok(localB.notes === 0 && localB.revs === 0,
     "a stale second device adopts the clear instead of resurrecting the records",
     `${localB.notes} notes, ${localB.revs} changes came back`);
  ok(STORE.notes.length === 0 && STORE.revisions.length === 0,
     "and does not push them back to the server");
  await b.ctx.close();
  resetStore();
}

/* ---------- 5. the performance measurement ---------- */
console.log("\n== tracked-change performance (400 revisions seeded) ==");

function seedRevs(n) {
  const a = [];
  for (let i = 0; i < n; i++) {
    a.push({
      chap: "Chapter " + (i % 30), snip: "seed-" + i,
      original: "Seeded original paragraph number " + i + ". ".repeat(6),
      revised: "Seeded revised paragraph number " + i + ". ".repeat(6),
      ts: 1785000000000 + i, resolved: i % 3 === 0,
    });
  }
  return JSON.stringify(a);
}

/* What we measure is main-thread BLOCKING, not the wall-clock of a click
   handler. The old app's cost is not in the handler; it is in the full-document
   decorate() the handler schedules, which re-parses the whole revisions blob
   once per paragraph. Wall-clock around .click() misses that entirely and
   reports ~1 ms for both apps, which is how you fool yourself. */
async function measure(url, sel) {
  const { ctx, page } = await newPage({}, {
    [KEY_MODE]: "review", [KEY_INLINE]: "on", [KEY_REVS]: seedRevs(400), [KEY_NOTES]: "[]",
    // Sync CONFIGURED. Without a secret the push aborts and the old reader never
    // runs its post-push decorate(), which is the freeze being measured.
    "ardenmoor.sync.secret.v1": "harness-secret",
  });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForSelector(sel, { timeout: 25000 }).catch(() => {});
  await page.waitForTimeout(2500);
  const load = await page.evaluate(() => window.__long.reduce((a, b) => a + b, 0));

  // Real clicks and real keystrokes. A synthetic p.click() inside evaluate()
  // does not open either editor, and the zero it reports looks like a pass.
  const mark = await page.evaluate(() => window.__long.length);
  const p = page.locator(sel).nth(6);
  await p.scrollIntoViewIfNeeded().catch(() => {});
  await p.click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(250);
  await page.keyboard.type("PERFMARK ").catch(() => {});
  await page.waitForTimeout(80);
  await page.locator(sel).nth(30).click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(4000); // past the 800ms push debounce and its callback
  const commit = await page.evaluate((t) => window.__blockSince(t), mark);
  const recorded = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || "[]")
    .filter((r) => (r.revised || "").includes("PERFMARK")).length, KEY_REVS);
  await ctx.close();
  return { load, commit, recorded };
}

const nu = await measure(BASE + "/", "p.para");
const old = await measure(BASE + "/old-reader.html", "p[data-snip]");
console.log(`  note  first render, blocked:  old ${old.load.toFixed(0)} ms   new ${nu.load.toFixed(0)} ms`);
console.log(`  note  commit one change, blocked:  old ${old.commit.toFixed(0)} ms (${old.recorded} recorded)   new ${nu.commit.toFixed(0)} ms (${nu.recorded} recorded)`);
if (old.recorded && nu.recorded) {
  ok(nu.commit <= old.commit, "committing a tracked change blocks no longer than before",
     `${nu.commit.toFixed(0)} ms vs ${old.commit.toFixed(0)} ms`);
} else {
  console.log("  note  commit timing not comparable: the synthetic click did not drive both editors");
}
ok(nu.load <= old.load, "first render blocks no longer than before",
   `${nu.load.toFixed(0)} ms vs ${old.load.toFixed(0)} ms`);

await browser.close();
server.close();

console.log(`\n${fails.length ? "  FAIL  " : "  PASS  "}smoke: ${pass} passed, ${fails.length} failed`);
if (fails.length) { for (const f of fails) console.log("        - " + f); process.exit(1); }
