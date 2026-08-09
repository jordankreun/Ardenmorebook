// Vercel serverless function: syncs reader notes + bookmark to the GitHub repo.
//
// Notes land in the repo as feedback/notes.json (source of truth) and feedback/notes.md
// (human-readable, what Claude reads). The reading bookmark lands in
// feedback/reader-state.json so your spot follows you across devices.
//
// Required environment variables (set in the Vercel project settings):
//   GH_TOKEN         a fine-grained GitHub token with Contents: Read and write on this repo
//   GH_REPO          "owner/repo", e.g. "jordankreun/Ardenmorebook"
//   FEEDBACK_SECRET  a password you choose; the reader must send it to read or write
// Optional:
//   GH_BRANCH        branch to commit to (default "main")
//
// The reader sends the secret in the "x-feedback-secret" header. Requests without the
// correct secret are rejected, so a public deployment cannot be written to by strangers.

const API = "https://api.github.com";

function ghHeaders(token) {
  return {
    Authorization: "Bearer " + token,
    Accept: "application/vnd.github+json",
    "User-Agent": "ardenmoor-reader",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function ghGetFile(repo, branch, token, path) {
  const url = `${API}/repos/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
  const r = await fetch(url, { headers: ghHeaders(token) });
  if (r.status === 404) return { exists: false, sha: null, text: null };
  if (!r.ok) throw new Error(`GET ${path} -> ${r.status} ${await r.text()}`);
  const j = await r.json();
  const text = Buffer.from(j.content || "", "base64").toString("utf8");
  return { exists: true, sha: j.sha, text };
}

async function ghReadJson(repo, branch, token, path, fallback) {
  const f = await ghGetFile(repo, branch, token, path);
  if (!f.exists || !f.text) return fallback;
  try { return JSON.parse(f.text); } catch (e) { return fallback; }
}

async function ghWriteFile(repo, branch, token, path, content, message) {
  // Retry on 409: the sha is read then written, so two overlapping saves collide.
  // Re-read the sha each attempt rather than reusing a stale one.
  let lastErr = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    const cur = await ghGetFile(repo, branch, token, path);
    const body = {
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch,
    };
    if (cur.exists) body.sha = cur.sha;
    const url = `${API}/repos/${repo}/contents/${encodeURIComponent(path)}`;
    const r = await fetch(url, { method: "PUT", headers: ghHeaders(token), body: JSON.stringify(body) });
    if (r.ok) return true;
    const txt = await r.text();
    lastErr = new Error(`PUT ${path} -> ${r.status} ${txt}`);
    if (r.status !== 409 && r.status !== 422) throw lastErr;
    await sleep(180 * (attempt + 1));
  }
  throw lastErr;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- one commit for several files (Git Data API) ----------
   The Contents API writes one file per call, so .json and .md were written as two
   separate commits and a failure between them left the human-readable file stale
   while the JSON moved on. That is the bug that made notes look missing. Blobs ->
   tree -> commit -> ref writes them together or not at all. Any failure here falls
   back to the old sequential path, so the worst case is the previous behaviour. */
async function ghCommitFiles(repo, branch, token, files, message) {
  const H = ghHeaders(token);
  const gh = async (path, init) => {
    const r = await fetch(`${API}/repos/${repo}${path}`, { headers: H, ...(init || {}) });
    if (!r.ok) throw new Error(`${path} -> ${r.status} ${await r.text()}`);
    return r.json();
  };
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const ref = await gh(`/git/ref/heads/${encodeURIComponent(branch)}`);
      const baseSha = ref.object.sha;
      const baseCommit = await gh(`/git/commits/${baseSha}`);
      const blobs = [];
      for (const f of files) {
        const b = await gh(`/git/blobs`, {
          method: "POST",
          body: JSON.stringify({ content: Buffer.from(f.content, "utf8").toString("base64"), encoding: "base64" }),
        });
        blobs.push({ path: f.path, mode: "100644", type: "blob", sha: b.sha });
      }
      const tree = await gh(`/git/trees`, {
        method: "POST",
        body: JSON.stringify({ base_tree: baseCommit.tree.sha, tree: blobs }),
      });
      const commit = await gh(`/git/commits`, {
        method: "POST",
        body: JSON.stringify({ message, tree: tree.sha, parents: [baseSha] }),
      });
      const r = await fetch(`${API}/repos/${repo}/git/refs/heads/${encodeURIComponent(branch)}`, {
        method: "PATCH", headers: H, body: JSON.stringify({ sha: commit.sha, force: false }),
      });
      if (r.ok) return true;
      if (r.status !== 422 && r.status !== 409) throw new Error(`PATCH ref -> ${r.status} ${await r.text()}`);
      await sleep(200 * (attempt + 1));   // someone else moved the branch; rebuild on the new head
    } catch (e) {
      if (attempt === 2) throw e;
      await sleep(200 * (attempt + 1));
    }
  }
  throw new Error("commit failed after retries");
}

async function writeFiles(repo, branch, token, files, message) {
  try {
    await ghCommitFiles(repo, branch, token, files, message);
    return "commit";
  } catch (e) {
    for (const f of files) await ghWriteFile(repo, branch, token, f.path, f.content, message);
    return "sequential";
  }
}

/* ---------- merge ----------
   The client used to push its whole array and this file wrote it wholesale, so a
   device with stale state erased whatever another device had added. Merging here
   makes that impossible however stale the pusher is. Key and tiebreak match the
   client's exactly; keep the two in step.

   `resolved` is STICKY. Resolution is a fact about the manuscript (the original text
   is no longer there), not an opinion, so an older client must not be able to
   un-resolve a record by pushing a copy that predates the resolve. */
function mergeRecords(stored, incoming) {
  const key = (r) => (r.chap || "") + "|" + (r.snip || "");
  const out = new Map();
  const add = (r) => {
    if (!r || typeof r !== "object") return;
    const k = key(r), prev = out.get(k);
    if (!prev) { out.set(k, { ...r }); return; }
    const winner = (r.ts || 0) > (prev.ts || 0) ? { ...r } : { ...prev };
    const other = (r.ts || 0) > (prev.ts || 0) ? prev : r;
    if (other.resolved && !winner.resolved) {
      winner.resolved = true;
      winner.resolvedTs = other.resolvedTs || winner.resolvedTs;
      winner.resolvedVia = other.resolvedVia || winner.resolvedVia;
    }
    out.set(k, winner);
  };
  (Array.isArray(stored) ? stored : []).forEach(add);
  (Array.isArray(incoming) ? incoming : []).forEach(add);
  return [...out.values()].sort((a, b) => (a.ts || 0) - (b.ts || 0));
}

function renderRevisionsMarkdown(allRevs) {
  const revs = allRevs.filter((r) => !r.resolved);
  let out = "# Tracked changes: The Tower of Ardenmoor\n\n";
  out += `${revs.length} open tracked change${revs.length === 1 ? "" : "s"}. Synced from the reader.\n\n`;
  out += `Apply these edits to the manuscript. "REVISED: (delete this paragraph)" means remove it entirely. `;
  out += `(Resolved/applied changes are omitted here; full history is in revisions.json.)\n`;
  const byChap = {};
  const order = [];
  revs.forEach((r) => {
    const c = r.chap || "(unplaced)";
    if (!byChap[c]) { byChap[c] = []; order.push(c); }
    byChap[c].push(r);
  });
  const clean = (s) => (s || "").replace(/\s+/g, " ").trim();
  order.forEach((c) => {
    out += `\n## ${c}\n\n`;
    byChap[c].forEach((r) => {
      out += `ORIGINAL:\n> ${clean(r.original)}\n\n`;
      if (r.revised && r.revised.trim()) out += `REVISED:\n> ${clean(r.revised)}\n\n`;
      else out += `REVISED: (delete this paragraph)\n\n`;
    });
  });
  return out.trim() + "\n";
}

function renderNotesMarkdown(allNotes) {
  const notes = allNotes.filter((n) => !n.resolved);
  let out = "# Reader notes: The Tower of Ardenmoor\n\n";
  out += `${notes.length} open note${notes.length === 1 ? "" : "s"}. Synced from the reader. `;
  out += `(Resolved notes are omitted here; full history is in notes.json.)\n`;
  const byChap = {};
  const order = [];
  notes.forEach((n) => {
    const c = n.chap || "(unplaced)";
    if (!byChap[c]) { byChap[c] = []; order.push(c); }
    byChap[c].push(n);
  });
  order.forEach((c) => {
    out += `\n## ${c}\n\n`;
    byChap[c].forEach((n) => {
      if (n.quote) out += `> ${n.quote}\n\n`;
      else if (n.snip) out += `> (near: "${n.snip}...")\n\n`;
      out += `${(n.text || "").trim()}\n\n`;
    });
  });
  return out.trim() + "\n";
}

module.exports = async (req, res) => {
  const secret = process.env.FEEDBACK_SECRET;
  const token = process.env.GH_TOKEN;
  const repo = process.env.GH_REPO;
  const branch = process.env.GH_BRANCH || "main";

  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") { res.status(204).end(); return; }
  if (!secret || !token || !repo) {
    // `code` is machine-readable; the prose stays for humans and for older
    // clients, which sniff the message text. The reader reads `code` first.
    res.status(500).json({ ok: false, code: "not_configured", error: "Server not configured. Set GH_TOKEN, GH_REPO, and FEEDBACK_SECRET in Vercel." });
    return;
  }
  if ((req.headers["x-feedback-secret"] || "") !== secret) {
    res.status(401).json({ ok: false, code: "unauthorized", error: "unauthorized" });
    return;
  }

  try {
    if (req.method === "GET") {
      const notes = await ghReadJson(repo, branch, token, "feedback/notes.json", []);
      const revisions = await ghReadJson(repo, branch, token, "feedback/revisions.json", []);
      const state = await ghReadJson(repo, branch, token, "feedback/reader-state.json", {});
      res.status(200).json({ ok: true, notes, revisions, bookmark: state.bookmark || null });
      return;
    }

    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
      body = body || {};

      // Merge into what is stored rather than replacing it, and write the JSON and
      // its rendered Markdown in ONE commit so they can never disagree.
      const files = [];
      let mergedNotes = null, mergedRevs = null;

      if (Array.isArray(body.notes)) {
        const stored = await ghReadJson(repo, branch, token, "feedback/notes.json", []);
        mergedNotes = mergeRecords(stored, body.notes);
        files.push({ path: "feedback/notes.json", content: JSON.stringify(mergedNotes, null, 2) });
        files.push({ path: "feedback/notes.md", content: renderNotesMarkdown(mergedNotes) });
      }
      if (Array.isArray(body.revisions)) {
        const stored = await ghReadJson(repo, branch, token, "feedback/revisions.json", []);
        mergedRevs = mergeRecords(stored, body.revisions);
        files.push({ path: "feedback/revisions.json", content: JSON.stringify(mergedRevs, null, 2) });
        files.push({ path: "feedback/revisions.md", content: renderRevisionsMarkdown(mergedRevs) });
      }
      if (Object.prototype.hasOwnProperty.call(body, "bookmark")) {
        const state = await ghReadJson(repo, branch, token, "feedback/reader-state.json", {});
        state.bookmark = body.bookmark;
        state.updated = new Date().toISOString();
        files.push({ path: "feedback/reader-state.json", content: JSON.stringify(state, null, 2) });
      }

      let via = "none";
      if (files.length) {
        const what = [mergedNotes && "notes", mergedRevs && "tracked changes",
                      Object.prototype.hasOwnProperty.call(body, "bookmark") && "bookmark"]
                      .filter(Boolean).join(" + ");
        via = await writeFiles(repo, branch, token, files, "reader: sync " + (what || "state"));
      }
      // Hand the authoritative state back so the client can adopt it instead of
      // continuing from its own possibly-stale copy.
      res.status(200).json({ ok: true, via, notes: mergedNotes, revisions: mergedRevs });
      return;
    }

    res.status(405).json({ ok: false, error: "method not allowed" });
  } catch (e) {
    res.status(500).json({ ok: false, error: String((e && e.message) || e) });
  }
};
