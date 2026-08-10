import { readJSON, writeRaw } from "./storage.js";
import { KEY_NOTES, KEY_REVS, PERSIST_DEBOUNCE_MS } from "./config.js";

/* Notes and revisions, in memory, indexed by "chap|snip".

   This is the change that makes editing fast. The old code held both arrays only
   in localStorage and re-read them per lookup: rendering the book called
   findRev() + findNote() once per paragraph, and each of those was a
   JSON.parse of the whole 133 KB revisions blob. 1,618 paragraphs x 2 = 3,236
   blocking reads and ~777 ms of pure JSON.parse per re-render, measured on
   desktop V8; two to four seconds on the author's iPhone. Here the parse happens
   once, at boot, and every lookup is an O(1) Map hit.

   The ARRAY is canonical, not the Map. Array order is part of the persisted
   shape (mergeRecords sorts by ts ascending, and the committed feedback/*.json
   sees the same order). The index is derived and never serialised.

   Records are LIVE OBJECTS, mutated in place. Nothing here ever rebuilds a
   "clean" record from known fields: the live feedback/notes.json carries
   resolvedVia:"applied-2026-07-29", written out-of-band by a script this
   codebase never wrote, and it has to survive every round trip. */

const state = { notes: [], revs: [], openNotes: 0, openRevs: 0 };
let noteIndex = new Map();
let revIndex = new Map();

const EMPTY = { open: null, all: [] };

export const keyOf = (r) => (r.chap || "") + "|" + (r.snip || "");
export const keyFor = (chap, snip) => (chap || "") + "|" + (snip || "");

/* INDEX — Map<"chap|snip", Entry>, Entry = { open: Record|null, all: Record[] }

     open : the FIRST record with this key whose `resolved` is falsy — exactly
            what the old findRev()/findNote() returned by linear scan. null when
            every record with this key is resolved.
     all  : every record with this key, in array order. all[0] is the one
            upsert*() mutates; delete*() removes all of them. */
function buildIndex(list) {
  const ix = new Map();
  for (const r of list) {
    if (!r || typeof r !== "object") continue;
    const k = keyOf(r);
    let e = ix.get(k);
    if (!e) {
      e = { open: null, all: [] };
      ix.set(k, e);
    }
    e.all.push(r);
    if (!e.open && !r.resolved) e.open = r;
  }
  return ix;
}

/* The index is rebuilt whenever the array's MEMBERSHIP changes, and repaired for
   one key whenever a record's `resolved` flag changes. A full rebuild is O(85)
   today, so "when in doubt, rebuild" is the right instinct: the index is small
   and the paragraph set is large. */
function repair(ix, k) {
  const e = ix.get(k);
  if (!e) return;
  if (!e.all.length) {
    ix.delete(k);
    return;
  }
  e.open = e.all.find((r) => !r.resolved) || null;
}

function recount() {
  state.openNotes = state.notes.reduce((n, r) => n + (r && r.resolved ? 0 : 1), 0);
  state.openRevs = state.revs.reduce((n, r) => n + (r && r.resolved ? 0 : 1), 0);
}

/* ---------- persistence ---------- */

const dirty = { notes: false, revs: false };
let flushTimer = 0;

function markDirty(kind) {
  dirty[kind] = true;
  if (flushTimer) return;
  flushTimer = setTimeout(flushNow, PERSIST_DEBOUNCE_MS);
}

/* Synchronous, whole-array, exactly today's format. localStorage.setItem of
   133 KB is a blocking write in Safari, which is why it is debounced OFF the
   interaction path and never runs while the user is typing — nothing in the
   editor's input path mutates the store, so in practice this fires once, about
   400 ms after a commit. */
export function flushNow() {
  clearTimeout(flushTimer);
  flushTimer = 0;
  if (dirty.notes) {
    writeRaw(KEY_NOTES, JSON.stringify(state.notes));
    dirty.notes = false;
  }
  if (dirty.revs) {
    writeRaw(KEY_REVS, JSON.stringify(state.revs));
    dirty.revs = false;
  }
}

/* ---------- change events ---------- */

const listeners = new Set();

/** change = { type: "revision" | "note" | "bulk", keys: string[] } */
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit(change) {
  for (const fn of listeners) {
    try {
      fn(change);
    } catch {}
  }
}

/* ---------- the outbound push ----------
   Registered by boot.js. Only the mutators below can reach it; adopt() cannot,
   which is what makes the old infinite push loop structurally impossible. */
let pusher = null;
export function setPusher(fn) {
  pusher = fn;
}

function after(kind, type, keys) {
  recount();
  markDirty(kind);
  emit({ type, keys });
  if (pusher) pusher(kind === "revs" ? "revisions" : "notes");
}

/* ---------- load ---------- */

export function load() {
  const notes = readJSON(KEY_NOTES, []);
  const revs = readJSON(KEY_REVS, []);
  state.notes = Array.isArray(notes) ? notes : [];
  state.revs = Array.isArray(revs) ? revs : [];
  noteIndex = buildIndex(state.notes);
  revIndex = buildIndex(state.revs);
  recount();
}

/* ---------- reads ---------- */

export const openRev = (key) => (revIndex.get(key) || EMPTY).open;
export const openNote = (key) => (noteIndex.get(key) || EMPTY).open;
/* Live arrays. The drawer lists and the exports iterate 85 records; copying them
   eight times per drawer open is exactly the waste being removed. Callers that
   need a different order use .slice().sort(...), as they already did. */
export const allNotes = () => state.notes;
export const allRevs = () => state.revs;
export const counts = () => ({ notes: state.openNotes, revs: state.openRevs });

/* ---------- mutators: user actions. Persist, reindex, emit, and push. ---------- */

/* `span` is how many CONSECUTIVE paragraphs this revision replaces, counting the
   anchor. It is omitted entirely when it is 1, which is every record written
   before cross-paragraph editing existed and most written after — so the stored
   shape is unchanged for them, and an older copy of the app reading a spanning
   record simply sees a single-paragraph edit with a long original. The sync
   merge copies own enumerable properties, which is what carries `span` between
   devices without either side knowing about it. */
export function upsertRev(chap, snip, original, revised, span) {
  const n = Math.max(1, Number(span) || 1);
  const k = keyFor(chap, snip);
  const e = revIndex.get(k);
  const existing = e && e.all.length ? e.all[0] : null;
  if (existing) {
    existing.original = original;
    existing.revised = revised;
    existing.ts = Date.now();
    existing.resolved = false;
    existing.resolvedTs = 0;
    existing.resolvedVia = "";
    if (n > 1) existing.span = n;
    else delete existing.span;
  } else {
    /* A brand-new record carries NO resolvedTs and NO resolvedVia. Their absence
       is meaningful and four of the sixty-nine live records have neither. */
    const rec = { chap, snip, original, revised, ts: Date.now(), resolved: false };
    if (n > 1) rec.span = n;
    state.revs.push(rec);
    let entry = revIndex.get(k);
    if (!entry) {
      entry = { open: null, all: [] };
      revIndex.set(k, entry);
    }
    entry.all.push(rec);
  }
  repair(revIndex, k);
  after("revs", "revision", [k]);
}

export function deleteRev(chap, snip) {
  const k = keyFor(chap, snip);
  // Removes EVERY record with this key, resolved or not.
  state.revs = state.revs.filter((r) => keyOf(r) !== k);
  revIndex = buildIndex(state.revs);
  after("revs", "revision", [k]);
}

export function setRevResolved(chap, snip, val, via) {
  const k = keyFor(chap, snip);
  const e = revIndex.get(k);
  if (!e) return;
  for (const r of e.all) {
    r.resolved = !!val;
    r.resolvedTs = val ? Date.now() : 0;
    r.resolvedVia = val ? via || "manual" : "";
    // Yes, this bumps ts. verifyApplied() deliberately does not; see verify.js.
    r.ts = Date.now();
  }
  repair(revIndex, k);
  after("revs", "revision", [k]);
}

export function upsertNote(chap, snip, quote, text) {
  const k = keyFor(chap, snip);
  const e = noteIndex.get(k);
  const existing = e && e.all.length ? e.all[0] : null;
  if (existing) {
    existing.text = text;
    existing.quote = quote || existing.quote;
    existing.ts = Date.now();
    existing.resolved = false;
    existing.resolvedTs = 0;
  } else {
    const rec = { chap, snip, quote: quote || "", text, ts: Date.now(), resolved: false };
    state.notes.push(rec);
    let entry = noteIndex.get(k);
    if (!entry) {
      entry = { open: null, all: [] };
      noteIndex.set(k, entry);
    }
    entry.all.push(rec);
  }
  repair(noteIndex, k);
  after("notes", "note", [k]);
}

export function deleteNote(chap, snip) {
  const k = keyFor(chap, snip);
  state.notes = state.notes.filter((n) => keyOf(n) !== k);
  noteIndex = buildIndex(state.notes);
  after("notes", "note", [k]);
}

export function setNoteResolved(chap, snip, val) {
  const k = keyFor(chap, snip);
  const e = noteIndex.get(k);
  if (!e) return;
  for (const n of e.all) {
    n.resolved = !!val;
    n.resolvedTs = val ? Date.now() : 0;
    n.ts = Date.now();
  }
  repair(noteIndex, k);
  after("notes", "note", [k]);
}

/* Used only by verify.js, which has already mutated the records in place — it
   sets resolvedTs but deliberately leaves ts alone, so this cannot go through
   setRevResolved(). */
export function markAppliedBulk(keys) {
  if (!keys.length) return;
  for (const k of keys) repair(revIndex, k);
  after("revs", "revision", keys);
}

/* ---------- adopt: the sync layer's only way in ----------
   Replaces a whole array, reindexes, persists and emits — and CANNOT push. The
   old bug was that the sync layer stored through the same setter user actions
   used, so every push scheduled another push, forever. It is now impossible to
   write that bug: adopt() has no access to the pusher. */
export function adopt(field, list) {
  const arr = Array.isArray(list) ? list : [];
  if (field === "revisions") {
    state.revs = arr;
    revIndex = buildIndex(state.revs);
    recount();
    markDirty("revs");
  } else {
    state.notes = arr;
    noteIndex = buildIndex(state.notes);
    recount();
    markDirty("notes");
  }
  emit({ type: "bulk", keys: [] });
}

/** The array the sync layer is about to merge from. */
export function listOf(field) {
  return field === "revisions" ? state.revs : state.notes;
}
