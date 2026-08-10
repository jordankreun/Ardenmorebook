/* Exercises the REAL serverless handler in api/sync.js.
 *
 * This file exists because of a gap that cost the author real time. test/smoke.mjs
 * drives the browser against test/serve.mjs, a MOCK of this endpoint — so every
 * sync assertion in the suite passed while api/sync.js itself had never once been
 * executed by anything. When the author reported "server error" in the reader,
 * there was no test that could have caught it either way.
 *
 * GitHub is stubbed through global.fetch. Run: node test/api-sync.cjs
 */
process.env.FEEDBACK_SECRET = "s";
process.env.GH_TOKEN = "t";
process.env.GH_REPO = "o/r";
process.env.GH_BRANCH = "main";

let pass = 0;
const fails = [];
const ok = (cond, name, detail) => {
  if (cond) { pass++; console.log("  ok    " + name); }
  else { fails.push(name); console.log("  FAIL  " + name + (detail ? " — " + detail : "")); }
};

const enc = (s) => Buffer.from(s, "utf8").toString("base64");

/* A GitHub good enough to commit against. `failWith` makes every call return one
   status, which is how the classification paths are reached. */
function stubGitHub({ files, failWith } = {}) {
  const store = Object.assign({
    "feedback/notes.json": "[]",
    "feedback/revisions.json": "[]",
    "feedback/reader-state.json": JSON.stringify({ bookmark: null, clearedAt: 0 }),
  }, files || {});
  global.fetch = async (url, init = {}) => {
    if (failWith) {
      return { ok: false, status: failWith, json: async () => ({}), text: async () => "stubbed " + failWith };
    }
    const u = String(url);
    const m = (init.method || "GET").toUpperCase();
    const good = (o) => ({ ok: true, status: 200, json: async () => o, text: async () => JSON.stringify(o) });
    if (u.includes("/contents/") && m === "GET") {
      const p = decodeURIComponent(u.split("/contents/")[1].split("?")[0]);
      if (!(p in store)) return { ok: false, status: 404, json: async () => ({}), text: async () => "nf" };
      return good({ sha: "sha", content: enc(store[p]) });
    }
    if (u.includes("/git/ref/heads/")) return good({ object: { sha: "HEAD" } });
    if (u.includes("/git/commits/")) return good({ tree: { sha: "TREE" } });
    if (u.includes("/git/blobs")) return good({ sha: "BLOB" });
    if (u.includes("/git/trees")) return good({ sha: "TREE2" });
    if (u.includes("/git/commits")) return good({ sha: "C2" });
    if (u.includes("/git/refs/heads/")) return good({});
    return good({});
  };
  return store;
}

function mkRes() {
  const r = { code: 200, body: null, headers: {} };
  r.setHeader = (k, v) => { r.headers[k] = v; };
  r.status = (c) => { r.code = c; return r; };
  r.json = (o) => { r.body = o; return r; };
  r.end = () => r;
  return r;
}

const handler = require("../api/sync.js");
const call = async (req) => {
  const res = mkRes();
  try { await handler(req, res); } catch (e) { res.threw = e; }
  return res;
};
const auth = { "x-feedback-secret": "s" };

(async () => {
  console.log("\n== api/sync.js, the real handler ==");

  stubGitHub();
  let r = await call({ method: "GET", headers: auth });
  ok(!r.threw, "GET does not throw", r.threw && r.threw.message);
  ok(r.code === 200 && r.body && r.body.ok, "GET returns 200", "got " + r.code);

  r = await call({ method: "POST", headers: auth, body: { clearedAt: 0, notes: [{ chap: "Chapter One", snip: "a", text: "n", ts: 2 }] } });
  ok(r.code === 200 && r.body.ok, "POST notes returns 200", JSON.stringify(r.body));
  ok(Array.isArray(r.body.notes) && r.body.notes.length === 1, "and hands the merged notes back");

  r = await call({ method: "POST", headers: auth, body: { bookmark: { id: "ch-2", offset: 5 } } });
  ok(r.code === 200 && r.body.ok, "POST bookmark returns 200");

  // Auth
  r = await call({ method: "GET", headers: { "x-feedback-secret": "wrong" } });
  ok(r.code === 401 && r.body.code === "unauthorized", "a wrong secret is 401, not 500");

  /* The classification. Each of these is a real production failure with its own
     fix, and each used to arrive at the reader as the single word "server error". */
  for (const [status, code] of [[401, "gh_unauthorized"], [403, "gh_forbidden"], [404, "gh_not_found"]]) {
    stubGitHub({ failWith: status });
    r = await call({ method: "GET", headers: auth });
    ok(r.code === 500 && r.body.code === code,
       `GitHub ${status} is reported as ${code}, not a bare server error`,
       JSON.stringify(r.body));
    ok(r.body.error && r.body.error.length > 20 && !/^Sync failed/.test(r.body.error),
       `and ${status} carries a message naming the fix`, r.body && r.body.error);
  }

  /* A missing FILE on a reachable repo is the normal first run and must still
     succeed — the 404 disambiguation must not break a fresh deployment. */
  stubGitHub({ files: {} });
  const realFetch = global.fetch;
  global.fetch = async (url, init) => {
    const u = String(url);
    if (u.includes("/contents/")) return { ok: false, status: 404, json: async () => ({}), text: async () => "nf" };
    if (u.includes("/branches/")) return { ok: true, status: 200, json: async () => ({ name: "main" }), text: async () => "{}" };
    return realFetch(url, init);
  };
  r = await call({ method: "GET", headers: auth });
  ok(r.code === 200 && r.body.ok && r.body.notes.length === 0,
     "a first run with no feedback files yet still returns 200", JSON.stringify(r.body));

  // Config
  const savedToken = process.env.GH_TOKEN;
  delete process.env.GH_TOKEN;
  r = await call({ method: "GET", headers: auth });
  ok(r.code === 500 && r.body.code === "not_configured", "a missing GH_TOKEN says not_configured");
  process.env.GH_TOKEN = savedToken;

  console.log(`\n${fails.length ? "  FAIL  " : "  PASS  "}api-sync: ${pass} passed, ${fails.length} failed`);
  if (fails.length) { for (const f of fails) console.log("        - " + f); process.exit(1); }
})();
