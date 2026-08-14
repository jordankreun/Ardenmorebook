import { measure, mutate, consumeSelfScroll } from "./schedule.js";

/* The popover host: a position:fixed card anchored beside its passage.

   Nothing is inserted into document flow, so the page never reflows and the
   reader's scroll position is untouched. The card prefers to sit just below the
   passage, flips above when there is no room, and pins itself inside the visible
   viewport (above the on-screen keyboard) as a last resort.

   On touch the editor's bar DOCKS instead: it sits on the top edge of the soft
   keyboard, using visualViewport geometry. Positioning a docked bar needs no DOM
   read at all — only the viewport metrics and the height cached at open — which
   is what makes typing cost nothing in layout. */

const MARGIN = 8;

let currentInst = null;
export const current = () => currentInst;

/* The one keyboard-height formula worth keeping from the deleted bottom sheet:
   innerHeight - visualViewport.height - visualViewport.offsetTop. Any future
   docked surface needs it. */

function viewport() {
  const vv = window.visualViewport;
  return {
    w: vv ? vv.width : window.innerWidth,
    h: vv ? vv.height : window.innerHeight,
    x: vv ? vv.offsetLeft : 0,
    y: vv ? vv.offsetTop : 0,
  };
}

/**
 * @param {Element} anchor
 * @param {Element} inner
 * @param {{className?: string, dismissOnOutside?: boolean}} [opts]
 */
export function openPopover(anchor, inner, opts = {}) {
  const el = document.createElement("div");
  el.className = "popover" + (opts.className ? " " + opts.className : "");
  const caret = document.createElement("div");
  caret.className = "caret";
  el.appendChild(caret);
  el.appendChild(inner);
  document.body.appendChild(el);

  const inst = {
    el,
    anchor,
    caret,
    ac: new AbortController(),
    docked: el.classList.contains("docked"),
    dismissOnOutside: opts.dismissOnOutside !== false,
    w: 0,
    h: 0,
    onClose: null,
    closed: false,
  };
  currentInst = inst;

  // One read of the card's own box, at open. Its content is static for its whole
  // lifetime; only a viewport resize can change it.
  remeasure(inst);
  applyPosition(inst, inst.docked ? null : anchor.getBoundingClientRect());

  const signal = inst.ac.signal;
  const onScroll = () => {
    // A scroll this app caused itself (the editor pulling the caret into view)
    // must not bounce back through here in the same task.
    if (consumeSelfScroll()) return;
    reposition(inst);
  };
  window.addEventListener("scroll", onScroll, { capture: true, passive: true, signal });
  window.addEventListener("resize", () => reposition(inst), { signal });
  if (window.visualViewport) {
    window.visualViewport.addEventListener(
      "resize",
      () => {
        remeasure(inst);
        reposition(inst);
      },
      { signal }
    );
    window.visualViewport.addEventListener("scroll", () => reposition(inst), { signal });
  }

  document.addEventListener("pointerdown", (e) => outside(inst, e), { capture: true, signal });
  return inst;
}

function outside(inst, e) {
  if (inst.closed || currentInst !== inst) return;
  if (inst.el.contains(e.target)) return;
  // The editor dismisses only via Save, Cancel, Escape, or another paragraph.
  if (!inst.dismissOnOutside) return;
  const ta = inst.el.querySelector("textarea");
  if (ta && ta.value.trim()) return; // a note with unsaved text stays put
  close(inst);
}

export function remeasure(inst) {
  inst.w = inst.el.offsetWidth;
  inst.h = inst.el.offsetHeight;
}

/** Re-anchor on the next frame: reads in the read phase, writes in the write phase. */
export function reposition(inst) {
  if (inst.closed || currentInst !== inst) return;
  if (inst.docked) {
    mutate(() => {
      if (!inst.closed) applyPosition(inst, null);
    });
    return;
  }
  /* Bound ONCE per instance and cached, for the same reason as the editor's
     settle read: measure() dedupes by function identity, and a fresh arrow here
     meant every reposition in a frame forced its own anchor rect. */
  if (!inst._read) {
    inst._read = () => {
      if (inst.closed) return;
      const r = inst.anchor.getBoundingClientRect();
      mutate(() => {
        if (!inst.closed) applyPosition(inst, r);
      });
    };
  }
  measure(inst._read);
}

/* Immediate re-anchor. For a DOCKED card this is pure write — viewport metrics
   and the cached height, no DOM read — which is why the editor can call it on
   every keystroke for free. An anchored card still defers to the frame. */
export function repositionNow(inst) {
  if (inst.closed || currentInst !== inst) return;
  if (inst.docked) {
    applyPosition(inst, null);
    return;
  }
  reposition(inst);
}

function applyPosition(inst, rect) {
  const vp = viewport();
  const el = inst.el;

  if (inst.docked) {
    // top, not bottom: the bar rides on the top edge of the soft keyboard.
    const left = Math.round(vp.x);
    const width = Math.round(vp.w);
    const top = Math.round(vp.y + vp.h - inst.h);
    /* Writing a style dirties layout even when the value is identical, and this
       ran on every keystroke while none of these three numbers can change from
       typing — they come from the visual viewport. Compare first, and a normal
       keystroke performs no style write at all. */
    if (inst._l !== left || inst._w !== width || inst._t !== top) {
      el.style.left = left + "px";
      el.style.width = width + "px";
      el.style.maxHeight = "";
      el.style.top = top + "px";
      inst._l = left;
      inst._w = width;
      inst._t = top;
    }
    inst.top = vp.y + vp.h - inst.h;
    return;
  }

  const r = rect || inst.anchor.getBoundingClientRect();
  const pw = inst.w;
  const ph = inst.h;
  let left = r.left;
  if (left + pw > vp.x + vp.w - MARGIN) left = vp.x + vp.w - pw - MARGIN;
  if (left < vp.x + MARGIN) left = vp.x + MARGIN;

  let below = true;
  let top = r.bottom + MARGIN;
  if (top + ph > vp.y + vp.h - MARGIN) {
    const above = r.top - MARGIN - ph;
    if (above >= vp.y + MARGIN) {
      top = above;
      below = false;
    } else {
      top = vp.y + vp.h - ph - MARGIN; // pin inside the viewport (keyboard-safe)
    }
  }
  if (top < vp.y + MARGIN) top = vp.y + MARGIN;

  el.style.left = Math.round(left) + "px";
  el.style.top = Math.round(top) + "px";
  el.style.maxHeight = Math.round(vp.h - 2 * MARGIN) + "px";
  el.classList.toggle("below", below);
  el.classList.toggle("above", !below);
  inst.top = top;
  const cx = Math.min(Math.max(r.left + r.width / 2 - left, 14), pw - 14);
  inst.caret.style.left = Math.round(cx) + "px";
}

/** The viewport-relative top edge of the card, without reading the DOM. */
export function popTop(inst) {
  return inst && typeof inst.top === "number" ? inst.top : 0;
}

export function close(inst) {
  if (!inst || inst.closed) return;
  inst.closed = true;
  if (currentInst === inst) currentInst = null;
  // Every listener this card registered — window, document and visualViewport —
  // goes with one abort. The old code removed some of them and leaked the rest.
  inst.ac.abort();
  if (inst.el.parentNode) inst.el.parentNode.removeChild(inst.el);
  sweepStrays();
  const cb = inst.onClose;
  inst.onClose = null;
  if (cb) cb();
}

export function closeCurrent() {
  close(currentInst);
}

/* Self-heal: sweep any orphaned popover shells a past code path left behind.
   With a single owned instance this should never fire, and it is cheap enough to
   keep as an assertion that it does not. */
function sweepStrays() {
  for (const stray of document.querySelectorAll("body > .popover")) {
    if (stray.parentNode) stray.parentNode.removeChild(stray);
  }
}
