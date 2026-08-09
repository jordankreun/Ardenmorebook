import * as store from "./store.js";
import { readRaw, writeRaw } from "./storage.js";
import { savePos } from "./position.js";
import { verifyApplied } from "./verify.js";
import {
  KEY_SECRET, KEY_BOOKMARK, KEY_CLEARED, SYNC_URL, SYNC_DEBOUNCE_MS, SYNC_REFRESH_MIN_MS,
} from "./config.js";

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
/* The tombstone epoch. Emptying the lists is not enough to clear anything,
   because every other device still holds its own copy and the merge is a union:
   the next push from a tablet that has been asleep for a week puts everything
   back. Records at or before the epoch are dropped instead, on both sides, and
   the epoch only ever moves forward. */
export function clearedAt() {
  return Number(readRaw(KEY_CLEARED, "0")) || 0;
}
/* A value we learned from a GET, or stamped locally by clearAll(): it can only
   move the epoch FORWARD, because a pull may well predate a clear this device
   has made and not yet managed to push. */
function setClearedAt(t) {
  const next = Math.max(clearedAt(), Number(t) || 0);
  writeRaw(KEY_CLEARED, String(next));
  return next;
}

/* A value the server handed back in reply to a POST that CARRIED our epoch:
   that answer is authoritative and is adopted verbatim, even when it is LOWER
   than ours. That is the only way back from a clear stamped by a device whose
   clock had drifted into the future — the server clamps the epoch to its own
   clock, and this is what lets the correction reach the devices. Without it the
   bad epoch is permanent and every note written from then on is dropped at the
   next merge, on every device.
   undefined/null means the response did not carry the field at all (an older
   deployment), so keep what we have. */
function adoptClearedAt(t) {
  if (t === undefined || t === null) return clearedAt();
  const v = Math.max(0, Number(t) || 0);
  writeRaw(KEY_CLEARED, String(v));
  return v;
}

export function mergeRecords(a, b, cutoff) {
  const cut = cutoff === undefined ? clearedAt() : Number(cutoff) || 0;
  const out = new Map();
  const add = (r) => {
    if (!r || typeof r !== "object") return;
    if (cut && (r.ts || 0) <= cut) return;
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
      if (j) setClearedAt(j.clearedAt);
      const merged = mergeRecords(store.listOf(field), (j && j[field]) || []);
      store.adopt(field, merged);
      const body = { clearedAt: clearedAt() };
      body[field] = merged;
      const res = await SYNC._req({
        method: "POST",
        headers: SYNC._h(),
        body: JSON.stringify(body),
      });
      if (res) {
        // The POST carried our epoch, so the reply is authoritative about it.
        adoptClearedAt(res.clearedAt);
        if (Array.isArray(res[field])) {
          store.adopt(field, mergeRecords(store.listOf(field), res[field]));
        }
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

  /* Retire every note and tracked change everywhere, on every device.

     Local first, so the lists empty immediately even with no network; the epoch
     is what makes it stick, and the push carries it to the server and from there
     to every other device on its next pull. */
  async clearAll() {
    const cut = setClearedAt(Date.now());
    store.adopt("notes", []);
    store.adopt("revisions", []);
    store.flushNow();
    if (!SYNC.secret) return { synced: false, reason: "off", cut };
    const res = await SYNC._req({
      method: "POST",
      headers: SYNC._h(),
      body: JSON.stringify({ clearedAt: cut, notes: [], revisions: [] }),
    });
    /* A failed POST is NOT "sync is off": the epoch is now stored on this device
       and nothing else would ever send it (_push only runs when a record is
       mutated, and there are no records left to mutate), so the caller has to be
       able to say which of the two happened. init() retries the push. */
    if (!res) return { synced: false, reason: SYNC.err || "unreachable", cut };
    adoptClearedAt(res.clearedAt);
    store.adopt("notes", mergeRecords([], res.notes || []));
    store.adopt("revisions", mergeRecords([], res.revisions || []));
    return { synced: true, cut: clearedAt() };
  },

  /* A clear that never reached the server. Offline, wrong password, 500: the
     epoch was stored locally and this device emptied itself, but the server and
     every other device still hold everything, and this device silently drops it
     all again on every launch. Nothing else sends the epoch, so without this the
     two halves diverge for good. Retried on every launch until it lands; the
     reply also corrects an epoch the server clamped. */
  async _pushPendingClear(serverCut) {
    if (!SYNC.secret) return false;
    const local = clearedAt();
    if (local <= serverCut) return false;
    store.flushNow();
    const res = await SYNC._req({
      method: "POST",
      headers: SYNC._h(),
      // The live lists, not [] — anything written after the clear must survive.
      body: JSON.stringify({
        clearedAt: local,
        notes: store.listOf("notes"),
        revisions: store.listOf("revisions"),
      }),
    });
    if (!res) return false;
    adoptClearedAt(res.clearedAt);
    if (Array.isArray(res.notes)) store.adopt("notes", mergeRecords([], res.notes));
    if (Array.isArray(res.revisions)) store.adopt("revisions", mergeRecords([], res.revisions));
    return true;
  },

  async init() {
    await SYNC._pullAndAbsorb();
    notifyState();
  },

  /* The pull half of sync used to run EXACTLY ONCE, at boot, and nothing ever
     asked the server for anything again. Push was fine, so a note written on the
     laptop reached the repo immediately — and then sat there. On a phone the
     reader is an installed PWA that stays resident for days, so the note did not
     appear until the app was force-quit and relaunched. From the reading chair
     that is indistinguishable from "cross-device syncing is not working", which
     is exactly how it was reported.

     So: pull again when the app comes back to the foreground, and when the
     network returns. THROTTLED, not polled — a phone fires visibilitychange on
     every glance at the lock screen, and this must not become a request per
     glance. `force` is for the online event and the Settings button, where the
     user's intent is explicit. */
  async refresh(force) {
    if (!SYNC.secret || refreshing) return false;
    if (!force && Date.now() - lastPullAt < SYNC_REFRESH_MIN_MS) return false;
    refreshing = true;
    try {
      return await SYNC._pullAndAbsorb();
    } finally {
      refreshing = false;
      notifyState();
    }
  },

  /* Shared by init() and refresh(). Adopting is a MERGE, never a replace, so a
     record written on this device while it was offline is not lost by a pull. */
  async _pullAndAbsorb() {
    const j = await SYNC.pull();
    if (!j || !j.ok) return false;
    lastPullAt = Date.now();
    // Forward-only: a GET can easily predate a clear made on this device.
    setClearedAt(j.clearedAt);
    store.adopt("notes", mergeRecords(store.listOf("notes"), j.notes || []));
    store.adopt("revisions", mergeRecords(store.listOf("revisions"), j.revisions || []));
    verifyApplied();
    /* Adopted unconditionally, with no timestamp comparison — as before. This
       stores the bookmark and updates the drawer row; it does NOT scroll, so a
       foreground refresh cannot yank the page out from under the reader. */
    if (j.bookmark) {
      savePos(KEY_BOOKMARK, j.bookmark);
      notifyBookmark();
    }
    await SYNC._pushPendingClear(Number(j.clearedAt) || 0);
    return true;
  },
};

let lastPullAt = 0;
let refreshing = false;

const timers = { notes: 0, revisions: 0 };
const inflight = { notes: false, revisions: false };
const again = { notes: false, revisions: false };
