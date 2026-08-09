import * as store from "./store.js";
import { readRaw, writeRaw } from "./storage.js";
import { savePos } from "./position.js";
import { verifyApplied } from "./verify.js";
import { KEY_SECRET, KEY_BOOKMARK, SYNC_URL, SYNC_DEBOUNCE_MS } from "./config.js";

/* Cross-device sync.

   The merge rule below is the SAME rule api/sync.js applies server-side; keep
   the two in step. Key is (chap, snip); the newer ts wins the content;
   `resolved` is sticky, because resolution is a fact about the manuscript and an
   older copy must not be able to un-make it.

   Three deliberate differences from the old client version:
     1. a Map, not a bare object — chap === "__proto__" collided with
        Object.prototype. The server already used a Map.
     2. spread instead of for-in — copies OWN enumerable properties, which is
        what preserves unknown fields like resolvedVia:"applied-2026-07-29".
     3. records are returned BY REFERENCE when nothing changed. The server clones
        unconditionally; the client must not, because the renderer's memo
        compares record identity and cloning every record on every merge would
        repaint the whole book after every sync round trip — the exact freeze
        being removed. */
export function mergeRecords(a, b) {
  const out = new Map();
  const add = (r) => {
    if (!r || typeof r !== "object") return;
    const k = (r.chap || "") + "|" + (r.snip || "");
    const prev = out.get(k);
    if (!prev) {
      out.set(k, r);
      return;
    }
    const rNewer = (r.ts || 0) > (prev.ts || 0);
    let win = rNewer ? r : prev;
    const other = rNewer ? prev : r;
    if (other.resolved && !win.resolved) {
      win = {
        ...win,
        resolved: true,
        resolvedTs: other.resolvedTs || win.resolvedTs,
        resolvedVia: other.resolvedVia || win.resolvedVia,
      };
    }
    out.set(k, win);
  };
  (a || []).forEach(add);
  (b || []).forEach(add);
  return [...out.values()].sort((x, y) => (x.ts || 0) - (y.ts || 0));
}

const stateListeners = [];
const bookmarkListeners = [];
/** Called whenever the connection state or error string changes. */
export function onState(fn) {
  stateListeners.push(fn);
}
/** Called when the server hands back a bookmark that has been adopted. */
export function onBookmark(fn) {
  bookmarkListeners.push(fn);
}
const notifyState = () => stateListeners.forEach((fn) => fn());
const notifyBookmark = () => bookmarkListeners.forEach((fn) => fn());

export const SYNC = {
  secret: readRaw(KEY_SECRET, "") || "",
  on: false,
  err: null,

  _h() {
    return { "Content-Type": "application/json", "x-feedback-secret": SYNC.secret };
  },

  setSecret(s) {
    SYNC.secret = s;
    writeRaw(KEY_SECRET, s);
  },

  /* A failure used to vanish into `.catch(){on=false}`, so a wrong password, a
     missing server variable and a write conflict all looked identical. Name it.
     The server now returns a machine-readable `code`; the prose sniff stays as a
     fallback so an already-deployed older server still reports correctly. */
  _fail(status, msg) {
    SYNC.on = false;
    let code = "";
    try {
      code = JSON.parse(msg || "{}").code || "";
    } catch {}
    SYNC.err =
      status === 401
        ? "wrong password"
        : status === 500
          ? code === "not_configured" || /not configured/i.test(msg || "")
            ? "server not configured"
            : "server error"
          : status === 404
            ? "no sync endpoint (is the site deployed?)"
            : status
              ? "error " + status
              : "offline";
    notifyState();
  },

  _okay() {
    SYNC.on = true;
    SYNC.err = null;
    notifyState();
  },

  async _req(opts) {
    try {
      const r = await fetch(SYNC_URL, opts);
      if (!r.ok) {
        SYNC._fail(r.status, await r.text());
        return null;
      }
      const j = await r.json();
      SYNC._okay();
      return j;
    } catch {
      SYNC._fail(0, "");
      return null;
    }
  },

  pull() {
    if (!SYNC.secret) return Promise.resolve(null);
    return SYNC._req({ headers: SYNC._h(), cache: "no-store" });
  },

  /* Pull, merge, push the union, then adopt whatever the server returns. The
     server merges too, so a lost race cannot destroy anything; this keeps the
     local copy honest and makes the common case a no-op. */
  async _push(field) {
    if (!SYNC.secret) return;
    if (inflight[field]) {
      again[field] = true; // hygiene; the server's own merge is what makes it safe
      return;
    }
    inflight[field] = true;
    try {
      // A crash mid-network must not lose a committed edit.
      store.flushNow();
      const j = await SYNC.pull();
      const merged = mergeRecords(store.listOf(field), (j && j[field]) || []);
      store.adopt(field, merged);
      const body = {};
      body[field] = merged;
      const res = await SYNC._req({
        method: "POST",
        headers: SYNC._h(),
        body: JSON.stringify(body),
      });
      if (res && Array.isArray(res[field])) {
        store.adopt(field, mergeRecords(store.listOf(field), res[field]));
      }
    } catch {
    } finally {
      inflight[field] = false;
      if (again[field]) {
        again[field] = false;
        SYNC._push(field);
      }
    }
  },

  /* Two independent timers, so each POST carries exactly one of notes /
     revisions. Changing this changes the shape of the commits the server makes. */
  push(field) {
    if (!SYNC.secret) return;
    clearTimeout(timers[field]);
    timers[field] = setTimeout(() => SYNC._push(field), SYNC_DEBOUNCE_MS);
  },

  /* Deliberately immediate and undebounced. Every bookmark tap is a commit, but
     the request has to survive the app being backgrounded a moment later, and
     navigator.sendBeacon cannot set the x-feedback-secret header. */
  pushBookmark(bm) {
    if (!SYNC.secret) return;
    SYNC._req({ method: "POST", headers: SYNC._h(), body: JSON.stringify({ bookmark: bm }) });
  },

  async init() {
    const j = await SYNC.pull();
    if (j && j.ok) {
      store.adopt("notes", mergeRecords(store.listOf("notes"), j.notes || []));
      store.adopt("revisions", mergeRecords(store.listOf("revisions"), j.revisions || []));
      verifyApplied();
      // Adopted unconditionally, with no timestamp comparison — as before.
      if (j.bookmark) {
        savePos(KEY_BOOKMARK, j.bookmark);
        notifyBookmark();
      }
    }
    notifyState();
  },
};

const timers = { notes: 0, revisions: 0 };
const inflight = { notes: false, revisions: false };
const again = { notes: false, revisions: false };
