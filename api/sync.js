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
  const cur = await ghGetFile(repo, branch, token, path);
  const body = {
    message,
    content: Buffer.from(content, "utf8").toString("base64"),
    branch,
  };
  if (cur.exists) body.sha = cur.sha;
  const url = `${API}/repos/${repo}/contents/${encodeURIComponent(path)}`;
  const r = await fetch(url, { method: "PUT", headers: ghHeaders(token), body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`PUT ${path} -> ${r.status} ${await r.text()}`);
  return true;
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
    res.status(500).json({ ok: false, error: "Server not configured. Set GH_TOKEN, GH_REPO, and FEEDBACK_SECRET in Vercel." });
    return;
  }
  if ((req.headers["x-feedback-secret"] || "") !== secret) {
    res.status(401).json({ ok: false, error: "unauthorized" });
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

      if (Array.isArray(body.notes)) {
        await ghWriteFile(repo, branch, token, "feedback/notes.json", JSON.stringify(body.notes, null, 2), "reader: sync notes");
        await ghWriteFile(repo, branch, token, "feedback/notes.md", renderNotesMarkdown(body.notes), "reader: render notes");
      }
      if (Array.isArray(body.revisions)) {
        await ghWriteFile(repo, branch, token, "feedback/revisions.json", JSON.stringify(body.revisions, null, 2), "reader: sync tracked changes");
        await ghWriteFile(repo, branch, token, "feedback/revisions.md", renderRevisionsMarkdown(body.revisions), "reader: render tracked changes");
      }
      if (Object.prototype.hasOwnProperty.call(body, "bookmark")) {
        const state = await ghReadJson(repo, branch, token, "feedback/reader-state.json", {});
        state.bookmark = body.bookmark;
        state.updated = new Date().toISOString();
        await ghWriteFile(repo, branch, token, "feedback/reader-state.json", JSON.stringify(state, null, 2), "reader: sync bookmark");
      }
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ ok: false, error: "method not allowed" });
  } catch (e) {
    res.status(500).json({ ok: false, error: String((e && e.message) || e) });
  }
};
