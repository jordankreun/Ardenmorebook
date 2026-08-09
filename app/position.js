import { chapters, paras, paraByKey } from "./manuscript.js";
import { progress, ticks, tocNav, miniFill, bookPct } from "./dom.js";
import { readJSON, writeJSON } from "./storage.js";
import { KEY_PROGRESS, SPOT_DEBOUNCE_MS, RESTORE_SETTLE_MS } from "./config.js";
import { debounce } from "./schedule.js";

/* Progress bar, chapter ticks, and the reading spot.

   The reading position is anchored to the PARAGRAPH at the top of the viewport
   (Kindle-style "location"), not to a pixel offset, so it survives a font-size
   change, a layout change, and a chapter being inserted above where you were. */

/* Chapter offsets, cached. The old code read chapters[i].el.offsetTop inside the
   scroll handler AFTER writing progressEl.style.width — a forced relayout of the
   whole document on every scroll frame. Here the offsets are read only when
   marked stale (resize, font size, mode switch, a stable paragraph repaint) and
   the active chapter is a binary search over the cached array. */
let chapterTops = null;

export function invalidateTops() {
  chapterTops = null;
}

function tops() {
  if (chapterTops) return chapterTops;
  chapterTops = chapters.map((c) => (c.el ? c.el.offsetTop : 0));
  return chapterTops;
}

function activeIndexFrom(t, y) {
  if (!t.length) return 0;
  let lo = 0;
  let hi = t.length - 1;
  let best = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (t[mid] <= y) {
      best = mid;
      lo = mid + 1;
    } else hi = mid - 1;
  }
  return best;
}

/* Index of the chapter the reader is currently in.

   `pad` exists because section.chapter carries scroll-margin-top: scrollIntoView
   leaves the reader sitting a little ABOVE the chapter's own offsetTop, so a
   plain scrollY comparison still reports the previous chapter and ArrowRight
   would jump to the same place forever. The TOC highlight wants the strict
   comparison (4 px); chapter navigation passes the scroll margin. */
export function activeChapterIndex(pad = 4) {
  return activeIndexFrom(tops(), window.scrollY + pad);
}

/** The scroll margin scrollIntoView honours, read from the live stylesheet. */
export function chapterScrollMargin() {
  const first = chapters[0] && chapters[0].el;
  if (!first) return 0;
  return parseFloat(getComputedStyle(first).scrollMarginTop) || 0;
}

export function layoutTicks() {
  ticks.textContent = "";
  const full = document.documentElement.scrollHeight;
  if (full <= 0) return;
  // Read all 37 offsets, then build and append once — the old code interleaved
  // appendChild and offsetTop 37 times.
  const t = tops();
  const frag = document.createDocumentFragment();
  for (const top of t) {
    const frac = Math.min(1, Math.max(0, top / full));
    const i = document.createElement("i");
    i.style.left = frac * 100 + "%";
    frag.appendChild(i);
  }
  ticks.appendChild(frag);
}

/* ---------- position objects ---------- */

/* The last paragraph whose absolute top is at or above the fold. Deliberately a
   linear scan with an early break, exactly as before: it is what defines the
   saved spot, it is debounced off the scroll path, and a binary search would
   disagree with it for a paragraph hidden by a tracked deletion (a display:none
   element reports a zero rect). */
export function anchorParagraph() {
  const y = window.scrollY;
  let chosen = null;
  for (const para of paras) {
    const el = para.el;
    if (!el) continue;
    const absTop = el.getBoundingClientRect().top + y;
    if (absTop <= y + 6) chosen = para;
    else break;
  }
  return chosen;
}

export function posOfParagraph(para) {
  if (!para) return currentPos();
  return { chap: para.chap, snip: para.snip, offset: 0 };
}

export function currentPos() {
  const para = anchorParagraph();
  if (!para || !para.el) return { chap: null, snip: null, offset: window.scrollY };
  const absTop = para.el.getBoundingClientRect().top + window.scrollY;
  return { chap: para.chap, snip: para.snip, offset: Math.round(window.scrollY - absTop) };
}

/* Three generations of stored shape, in this order. The legacy {id, offset} form
   is LIVE on the server right now (feedback/reader-state.json holds
   {"bookmark":{"id":"ch-1","offset":3402}}), so dropping it would silently send
   the author to the top of the book. */
export function gotoPos(pos) {
  if (!pos) return;
  if (pos.chap != null && pos.snip != null) {
    const para = paraByKey(pos.chap + "|" + pos.snip);
    if (para && para.el) {
      const t = para.el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, Math.max(0, Math.round(t + (pos.offset || 0))));
      return;
    }
  }
  if (pos.id) {
    const el = document.getElementById(pos.id);
    if (el) {
      window.scrollTo(0, Math.max(0, el.offsetTop + (pos.offset || 0)));
      return;
    }
  }
  if (typeof pos.offset === "number") window.scrollTo(0, Math.max(0, pos.offset));
}

export function savePos(key, pos) {
  writeJSON(key, pos);
}

export function loadPos(key) {
  return readJSON(key, null);
}

/* ---------- the saved reading spot ---------- */

let restoring = false;

function writeSpot() {
  if (restoring) return;
  savePos(KEY_PROGRESS, currentPos());
}

const saveSpot = debounce(writeSpot, SPOT_DEBOUNCE_MS);

/* Mobile Safari and installed PWAs often never fire beforeunload, so a debounced
   save would simply be lost when the app is backgrounded. */
export function flushSpot() {
  saveSpot.flush();
}

/* ---------- the scroll frame ---------- */

let ticking = false;

export function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    // Read everything first...
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const t = tops();
    const pct = h > 0 ? (y / h) * 100 : 0;
    const actId = chapters.length ? chapters[activeIndexFrom(t, y + 4)].id : null;
    // ...then write. No read may follow, or the layout is forced again.
    progress.style.width = pct + "%";
    if (miniFill) miniFill.style.width = pct + "%";
    if (bookPct) bookPct.textContent = Math.round(pct);
    if (tocNav) {
      for (const link of tocNav.querySelectorAll("a[data-id]")) {
        link.classList.toggle("active", link.dataset.id === actId);
      }
    }
    if (!restoring) saveSpot();
  });
}

/* Restore after fonts and layout have settled so the paragraph lands exactly,
   then re-correct once for any late shift. `restoring` suppresses saveSpot for
   the whole window, so the restore cannot overwrite the spot it is restoring. */
export function restoreSpot(saved) {
  if (!saved) return;
  restoring = true;
  const doRestore = () => {
    gotoPos(saved);
    invalidateTops();
    layoutTicks();
  };
  const fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  fonts.then(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        doRestore();
        setTimeout(() => {
          doRestore();
          restoring = false;
          onScroll();
        }, RESTORE_SETTLE_MS);
      });
    });
  });
}
