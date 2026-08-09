import * as popover from "./popover.js";
import * as render from "./render.js";
import * as store from "./store.js";
import { toast } from "./toast.js";
import { measure, mutate, markSelfScroll } from "./schedule.js";
import { CARET_CONTEXT_CHARS, SETTLE_EARLY_MS, SETTLE_LATE_MS } from "./config.js";

/* The track-changes editor. The paragraph itself becomes the editor: its
   rendered HTML is replaced with the raw markdown, contentEditable is switched
   on, and a small toolbar opens beside it — docked above the soft keyboard on
   touch. Nothing overlays the text and the scroll position is preserved.

   Everything in this file is load-bearing. Each numbered comment records a bug
   that was found the hard way; none of them is noise. */

/* The pointer-capability query lives here because the editor's docking rule
   depends on it (only the double-tap path docks) and gestures.js already imports
   this module — putting it there instead would make the two files circular.
   The split is by INPUT CAPABILITY, not screen size: a phone in landscape is
   ~900 px wide and is the one place a width gate would be worst. */
const MQ_COARSE = window.matchMedia
  ? window.matchMedia("(pointer: coarse)")
  : { matches: false, addEventListener() {} };

export const isTouch = () => !!MQ_COARSE.matches;

/** Fires when a mouse is plugged in, Sidecar starts, an iPad keyboard attaches. */
export function watchPointerKind(fn) {
  /* MediaQueryList.addEventListener shipped in Safari 14. On iOS 13 this throws,
     and because gestures.init() runs at boot.js top level the TypeError aborts
     module evaluation before the manuscript is ever fetched — the app hangs on
     "Gathering the pages…" with no error. The old file carried this fallback;
     it costs two lines and removes a total-failure mode. */
  if (MQ_COARSE.addEventListener) MQ_COARSE.addEventListener("change", fn);
  else if (MQ_COARSE.addListener) MQ_COARSE.addListener(fn);
}

/** session = { para, el, raw, orig, chap, snip, existing, auto, docked, pop, ac, save } */
let session = null;

export const isEditing = () => !!session;
export const editingPara = () => (session ? session.para : null);
export const editingEl = () => (session ? session.el : null);

/* One-shot: the save function is nulled BEFORE it is called, so a re-entrant
   path cannot double-save. */
export function commitEditor() {
  const s = session;
  if (!s || !s.save) return;
  const f = s.save;
  s.save = null;
  f();
}

/**
 * NEVER async, and it contains no await. On iOS the soft keyboard rises only for
 * a focus that happens inside the gesture's own task, so nothing between the tap
 * and p.focus() may be deferred to a timer, a promise, a microtask or a frame.
 * This is the single thing a "modern rebuild" is most likely to break.
 */
export function openEditor(para, seedQuote, opts) {
  opts = opts || {};
  const auto = !!opts.auto;
  popover.closeCurrent();

  const p = para.el;
  if (!p) return;
  const chap = para.chap;
  const snip = para.snip;
  const orig = para.text;
  /* An O(1) Map lookup. Reading the store emits nothing and runs no subscriber,
     which is what keeps this whole path synchronous. */
  const existing = store.openRev(para.key);
  const raw = existing ? existing.revised || "" : orig;

  render.setEditing(p);
  p.classList.remove("hasNote", "hasEdit", "isDeleted");
  p.classList.add("editingP");
  // textContent first: it is what makes p.firstChild a single text node, which
  // placeCaret() requires.
  p.textContent = raw;
  p.contentEditable = "true";
  p.spellcheck = true;

  const bar = document.createElement("div");
  bar.className = "composer edit";
  // The bar lives inside a popover positioned over a contenteditable region;
  // without this it could become part of the edited text.
  bar.contentEditable = "false";
  bar.innerHTML =
    '<div class="row"><button class="primary save">' +
    (auto ? "Done" : "Save revision") +
    '</button><button class="cancel">Cancel</button>' +
    (existing ? '<button class="del">Revert</button>' : "") +
    "</div>" +
    '<p class="hint">' +
    (auto
      ? "Click anywhere else to keep it, Esc to discard. Clear it out to cut the passage."
      : "Edit the paragraph right where it sits; clear it out to cut the passage. Saved as a tracked change.") +
    "</p>";

  // Only the tap-to-edit path docks. Edit from the toolbar or the drawer gets a
  // normal anchored popover.
  const docked = auto && isTouch();
  const pop = popover.openPopover(p, bar, {
    className: "editBar" + (docked ? " docked" : ""),
    dismissOnOutside: false,
  });

  const ac = new AbortController();
  const signal = ac.signal;
  session = { para, el: p, raw, orig, chap, snip, existing, auto, docked, pop, ac, save: null };
  pop.onClose = () => teardown({ repaint: true });

  // Put the caret exactly where the reader was: re-select the phrase they chose,
  // or (auto mode) drop it at the character they clicked.
  if (auto) placeCaret(p, raw, opts.caret);
  else seedSelection(p, raw, seedQuote);

  p.focus(); // LAST. See the note on this function.

  /* One input listener, and it performs no DOM read. The old code had two, each
     synchronously reading offsetWidth/offsetHeight and a rect, plus a scrollBy
     that re-entered through the capture-phase scroll handler — three forced
     layouts per character over a justified, hyphenated 566 KB document. */
  p.addEventListener(
    "input",
    () => {
      popover.repositionNow(pop);
      if (docked) settle();
    },
    { signal }
  );

  p.addEventListener(
    "keydown",
    (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        save();
      } else if (e.key === "Escape") {
        e.preventDefault();
        popover.closeCurrent();
      }
    },
    { signal }
  );

  if (docked) {
    // The keyboard animates in AFTER focus, so one re-anchor is not enough.
    setTimeout(settle, SETTLE_EARLY_MS);
    setTimeout(settle, SETTLE_LATE_MS);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", settle, { signal });
    }
  }

  function settle() {
    const s = session;
    if (!s || s.pop !== pop || pop.closed) return;
    popover.repositionNow(pop);
    measure(settleRead);
  }

  /* Scrolls the SELECTION's own rect — not the paragraph's — into the band
     between the top of the visible viewport and the top of the docked bar. On a
     phone the paragraph is usually taller than that gap, so anchoring on the
     paragraph fails. Range.getBoundingClientRect is not an element read, so a
     keystroke that leaves the caret inside the band costs no element geometry. */
  function settleRead() {
    const s = session;
    if (!s || s.pop !== pop || pop.closed) return;
    const vv = window.visualViewport;
    const oy = vv ? vv.offsetTop : 0;
    const floor = popover.popTop(pop) - 10;
    const ceil = oy + 64;
    let c = null;
    try {
      const sel = window.getSelection();
      if (sel && sel.rangeCount) {
        const b = sel.getRangeAt(0).getBoundingClientRect();
        if (b && (b.top || b.bottom)) c = b;
      }
    } catch {}
    if (!c) c = p.getBoundingClientRect();
    if (c.bottom > floor) queueScroll(c.bottom - floor);
    else if (c.top < ceil) queueScroll(c.top - ceil);
  }

  function queueScroll(dy) {
    mutate(() => {
      markSelfScroll();
      window.scrollBy(0, dy);
    });
  }

  function teardown(o) {
    const s = session;
    if (!s || s.pop !== pop) return;
    session = null;
    s.ac.abort(); // every listener on <p>, document and visualViewport, at once
    // Remove the WHOLE popover shell, not just the button bar inside it;
    // removing only the bar left an empty white pill floating on the page.
    popover.close(pop);
    p.contentEditable = "false";
    p.classList.remove("editingP");
    render.setEditing(null);
    if (!o || o.repaint !== false) render.renderPara(para, { stable: true, force: true });
  }

  function save() {
    const s = session;
    if (!s || s.pop !== pop) return;
    /* innerText, not textContent: it respects white-space:pre-wrap and turns the
       contenteditable's <div>/<br> breaks into \n. Only TRAILING whitespace is
       stripped. */
    const v = p.innerText.replace(/\s+$/, "");
    const untouched = v === raw;
    teardown({ repaint: false });

    // Auto mode commits on a click elsewhere, so "clicked in, clicked straight
    // out" must leave no trace at all: no record, no toast, nothing to undo.
    if (auto && untouched) {
      render.renderPara(para, { stable: true, force: true });
      return;
    }
    if (v.trim() === orig.trim()) {
      if (existing) store.deleteRev(chap, snip);
      else render.renderPara(para, { stable: true, force: true });
      toast("No change from the original");
      return;
    }
    store.upsertRev(chap, snip, orig, v);
    /* Repaint EXPLICITLY, exactly as the old redecorateStable(p) did. teardown
       ran with repaint:false, so the <p> still holds the raw markdown this
       editor put in it, and the change event alone is not enough to get rid of
       it: upsertRev mutates the existing record IN PLACE, so re-saving an
       existing revision without touching the text leaves both the record's
       identity and its `revised` string unmoved and the renderer's memo
       short-circuits. The paragraph would sit there as literal asterisks, with
       no diff and no dots, until a mode toggle or a reload. When the text DID
       change the subscriber has already painted and this second pass is a
       no-op assignment on one paragraph. */
    render.renderPara(para, { stable: true, force: true });
    toast(v.trim() ? "Revision saved" : "Marked for deletion");
  }

  session.save = save;
  bar.querySelector(".save").addEventListener("click", save, { signal });
  bar.querySelector(".cancel").addEventListener("click", () => popover.closeCurrent(), { signal });
  const del = bar.querySelector(".del");
  if (del) {
    del.addEventListener(
      "click",
      () => {
        teardown({ repaint: false });
        store.deleteRev(chap, snip);
        toast("Reverted to original");
      },
      { signal }
    );
  }
}

function seedSelection(p, raw, seedQuote) {
  /* raw is RAW MARKDOWN and seedQuote is RENDERED text with curly quotes, so
     this match frequently fails and falls back to a collapsed caret at offset 0.
     That is the existing behaviour; "improving" it changes where the caret lands
     after tapping Edit on the selection toolbar. */
  try {
    const node = p.firstChild;
    if (!node) return;
    const sel = window.getSelection();
    const r = document.createRange();
    const idx = seedQuote && seedQuote.length > 2 ? raw.indexOf(seedQuote) : -1;
    if (idx >= 0) {
      r.setStart(node, idx);
      r.setEnd(node, idx + seedQuote.length);
    } else {
      r.setStart(node, 0);
      r.collapse(true);
    }
    sel.removeAllRanges();
    sel.addRange(r);
  } catch {}
}

/* ---------- caret transfer: rendered click point -> raw-text offset ----------
   The click lands on RENDERED text (inline() has turned *x* into <em>x</em>, and
   a revised paragraph renders as a diff carrying deleted words). The editor then
   replaces all of that with RAW text, so a plain character offset would drift.
   The click is therefore carried as a short context string plus a positional
   ratio: the context re-finds the spot exactly, and the ratio is the fallback
   when it cannot — and now also disambiguates between repeated matches. */
export function caretContextAt(p, x, y) {
  let node = null;
  let off = null;
  /* caretRangeFromPoint first, caretPositionFromPoint second. The standard call
     is the second one, but the first is the path exercised on the author's
     device today and its edge-case behaviour is the known-good one. Be
     conservative in the editor path. */
  if (document.caretRangeFromPoint) {
    const r = document.caretRangeFromPoint(x, y);
    if (r) {
      node = r.startContainer;
      off = r.startOffset;
    }
  } else if (document.caretPositionFromPoint) {
    const c = document.caretPositionFromPoint(x, y);
    if (c) {
      node = c.offsetNode;
      off = c.offset;
    }
  }
  const full = p.textContent || "";
  if (node == null || off == null || !full) return { before: "", ratio: 0 };

  let acc = 0;
  let found = false;
  (function walk(n) {
    if (found) return;
    if (n === node) {
      if (n.nodeType === 3) acc += off;
      else
        for (let j = 0; j < off && j < n.childNodes.length; j++)
          acc += (n.childNodes[j].textContent || "").length;
      found = true;
      return;
    }
    if (n.nodeType === 3) {
      acc += n.nodeValue.length;
      return;
    }
    for (const child of n.childNodes) {
      walk(child);
      if (found) return;
    }
  })(p);

  if (!found) return { before: "", ratio: 0 };
  return { before: full.slice(Math.max(0, acc - CARET_CONTEXT_CHARS), acc), ratio: acc / full.length };
}

/** The occurrence of `needle` closest to `near`, or -1. */
function nearestIndexOf(hay, needle, near) {
  let best = -1;
  let bestDist = Infinity;
  let from = 0;
  for (;;) {
    const i = hay.indexOf(needle, from);
    if (i < 0) break;
    const d = Math.abs(i - near);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
    from = i + 1;
  }
  return best;
}

export function placeCaret(p, raw, caret) {
  let idx = -1;
  if (caret && caret.before) {
    let probe = caret.before;
    while (probe.length >= 4 && idx < 0) {
      // Nearest, not first: in a paragraph with repeated dialogue the first
      // match is usually the wrong instance.
      idx = nearestIndexOf(raw, probe, Math.round(raw.length * (caret.ratio || 0)));
      if (idx < 0) probe = probe.slice(1);
    }
    if (idx >= 0) idx += probe.length;
  }
  if (idx < 0 && caret && caret.ratio > 0) idx = Math.round(raw.length * caret.ratio);
  idx = Math.max(0, Math.min(raw.length, idx < 0 ? 0 : idx));
  const sel = window.getSelection();
  const r = document.createRange();
  /* raw === "" is the "deleted paragraph" case: p.firstChild is null, and the
     old code returned early, leaving no caret at all — p.focus() on an empty
     contenteditable <p> does not reliably show one on iOS. Anchor to the
     element instead. */
  if (p.firstChild) r.setStart(p.firstChild, idx);
  else r.setStart(p, 0);
  r.collapse(true);
  try {
    sel.removeAllRanges();
    sel.addRange(r);
  } catch {}
}
