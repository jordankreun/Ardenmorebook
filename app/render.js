import * as manuscript from "./manuscript.js";
import * as store from "./store.js";
import * as position from "./position.js";
import { esc, inline, inlineCached } from "./text.js";
import { diffHTML } from "./diff.js";
import { svg } from "./icons.js";
import { book } from "./dom.js";
import { readRaw, writeRaw } from "./storage.js";
import { KEY_MODE } from "./config.js";

/* The renderer. One paragraph is the unit of work.

   The old decorate() rewrote innerHTML on all 1,618 paragraphs for any change,
   and startup ran it up to four times. Here a committed edit assigns innerHTML
   to exactly one <p> (two on the two colliding keys), performs no JSON.parse and
   no localStorage read, and finishes inside a frame. */

let mode = readRaw(KEY_MODE, "review") === "read" ? "read" : "review";
export const getMode = () => mode;

const modeListeners = [];
export function onModeChange(fn) {
  modeListeners.push(fn);
}

/* Actions the annotation dots trigger. Registered by boot.js so this module does
   not have to import the editor and the composer, which both import it. */
let onNoteDot = () => {};
let onEditDot = () => {};
export function setDotActions(noteFn, editFn) {
  onNoteDot = noteFn;
  onEditDot = editFn;
}

/* ---------- the editing guard ---------- */

let editingEl = null;
const dirtyWhileEditing = new Set();
const deferred = [];

/** Called by editor.js when a paragraph becomes, or stops being, the editor. */
export function setEditing(el) {
  editingEl = el;
  if (el) return;
  const pending = [...dirtyWhileEditing];
  dirtyWhileEditing.clear();
  for (const para of pending) renderPara(para, { force: true });
  const queue = deferred.splice(0);
  for (const fn of queue) fn();
}

/** Runs `fn` now, or once the editor closes. Used for the sync rebuild. */
export function deferWhileEditing(fn) {
  if (editingEl) deferred.push(fn);
  else fn();
}

/* ---------- mount ---------- */

function titlePage() {
  const tp = document.createElement("div");
  tp.className = "titlepage";
  tp.innerHTML = '<h1>The Tower of Ardenmoor</h1><p class="book">Book One</p>';
  return tp;
}

function chapterHeading(text) {
  const h = document.createElement("h2");
  h.className = "chap";
  const parts = text.split(":");
  if (parts.length > 1) {
    h.innerHTML =
      '<span class="kicker">' +
      esc(parts[0].trim()) +
      "</span>" +
      esc(parts.slice(1).join(":").trim());
  } else h.textContent = text;
  return h;
}

function sceneDivider() {
  const d = document.createElement("div");
  d.className = "scene";
  d.innerHTML = "<span>&#10022;</span>";
  return d;
}

/** Builds the whole book. Every paragraph is painted exactly once, ever. */
export function mount() {
  book.textContent = "";
  book.appendChild(titlePage());
  for (const ch of manuscript.chapters) {
    const sec = document.createElement("section");
    sec.className = "chapter";
    sec.id = ch.id;
    let flush = true;
    for (const b of ch.flow) {
      if (b.t === "chapter") {
        sec.appendChild(chapterHeading(b.text));
        flush = true;
        continue;
      }
      if (b.t === "scene") {
        sec.appendChild(sceneDivider());
        flush = true;
        continue;
      }
      const el = document.createElement("p");
      el.className = flush ? "para flush" : "para";
      flush = false;
      b.para.el = el;
      manuscript.paraFor.set(el, b.para);
      const rev = store.openRev(b.para.key);
      const note = mode === "read" ? null : store.openNote(b.para.key);
      paint(el, b.para, rev, note);
      lastPaint.set(el, { mode, rev, revised: rev ? rev.revised : null, note });
      sec.appendChild(el);
    }
    book.appendChild(sec);
    ch.el = sec;
  }
  position.invalidateTops();
}

/* ---------- incremental painting ---------- */

/* Compare identity plus the one mutable field, not a serialised signature:
   records are mutated in place, so `rev` can be the same object carrying new
   text. A sync merge that changed one record therefore costs 1,617 four-field
   comparisons and one repaint. */
const lastPaint = new WeakMap();

export function renderPara(para, opts = {}) {
  const el = para.el;
  if (!el) return;

  /* A repaint over a live contenteditable destroys the caret, and save() then
     reads p.innerText — which is now the RENDERED DIFF, original and revised
     words concatenated — and stores that as `revised`. That is the data-loss
     bug, and in the old code it was reachable by an ordinary sync round-trip
     landing mid-edit. Never remove this branch. The paragraph is repainted the
     moment the editor tears down. */
  if (el === editingEl) {
    dirtyWhileEditing.add(para);
    return;
  }

  const rev = store.openRev(para.key);
  const note = mode === "read" ? null : store.openNote(para.key);

  const prev = lastPaint.get(el);
  if (
    !opts.force &&
    prev &&
    prev.mode === mode &&
    prev.rev === rev &&
    prev.revised === (rev ? rev.revised : null) &&
    prev.note === note
  ) {
    return;
  }
  lastPaint.set(el, { mode, rev, revised: rev ? rev.revised : null, note });

  if (!opts.stable) {
    paint(el, para, rev, note);
    return;
  }
  /* Stable repaint: hold the passage still under the reader's eyes. A review-mode
     diff is taller than clean text, so committing an edit moves everything below
     it; this costs two rect reads instead of the old two whole-document layouts. */
  const before = el.getBoundingClientRect().top;
  paint(el, para, rev, note);
  window.scrollBy(0, el.getBoundingClientRect().top - before);
  position.invalidateTops();
}

function paint(el, para, rev, note) {
  if (mode === "read") {
    /* Read mode shows the book AS EDITED: any tracked change is applied, clean,
       with no diff markup and no marks. store.openRev() already excludes
       resolved revisions, and a resolved revision is one already written into
       the manuscript, so its text is in para.text and must not be applied twice.
       An empty replacement is a deletion: the paragraph leaves the page. */
    el.classList.remove("hasNote", "hasEdit", "isDeleted", "isCut");
    if (rev) {
      const t = (rev.revised || "").trim();
      if (!t) {
        el.classList.add("isCut");
        el.textContent = "";
        return;
      }
      el.innerHTML = inlineCached(t);
      return;
    }
    el.innerHTML = paraHTML(para);
    return;
  }
  if (rev) {
    el.classList.add("hasEdit");
    el.classList.toggle("isDeleted", !(rev.revised && rev.revised.trim()));
    el.innerHTML = diffHTML(para.text, rev.revised, rev);
  } else {
    el.classList.remove("hasEdit", "isDeleted");
    el.innerHTML = paraHTML(para);
  }
  el.classList.toggle("hasNote", !!note);
  if (note) el.appendChild(noteDot(para, note));
  if (rev) el.appendChild(editDot(para));
}

/* inline() is nine regex passes; para.text never changes, so this runs once per
   paragraph for the life of the page instead of once per re-render. */
function paraHTML(para) {
  if (para.html === null) para.html = inline(para.text);
  return para.html;
}

function noteDot(para, note) {
  const nd = document.createElement("span");
  nd.className = "noteDot";
  nd.innerHTML = svg("note");
  nd.title = "View / edit note";
  nd.addEventListener("click", () => onNoteDot(para, note.quote, nd));
  return nd;
}

function editDot(para) {
  const ed = document.createElement("span");
  ed.className = "editDot";
  ed.innerHTML = svg("pen");
  ed.title = "Edit / revert this revision";
  ed.addEventListener("click", () => onEditDot(para));
  return ed;
}

/** Reconsider every paragraph. The memo makes this a comparison pass, not a
    re-render: only paragraphs whose record actually changed are repainted. */
export function repaintAll() {
  for (const para of manuscript.paras) renderPara(para);
}

/* ---------- mode ---------- */

export function setMode(next) {
  mode = next === "read" ? "read" : "review";
  document.documentElement.setAttribute("data-mode", mode);
  writeRaw(KEY_MODE, mode);
  for (const fn of modeListeners) fn(mode);
  /* Synchronous and complete, deliberately. Chunking it would be visible as a
     wipe, and Save-as-PDF depends on the read-mode render being finished before
     window.print() fires. With inline() memoised and no JSON in the loop this is
     tens of milliseconds for the whole book, and it happens on a button press,
     not while typing. The memo's `mode` field has already invalidated every
     paragraph, so no force flag is needed. */
  for (const para of manuscript.paras) renderPara(para);
  position.invalidateTops();
}
