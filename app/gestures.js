import { selTools, btnAddNote, btnAddEdit, btnAddBookmark, inlineHint } from "./dom.js";
import { svg } from "./icons.js";
import * as editor from "./editor.js";
import { openComposer } from "./composer.js";
import * as render from "./render.js";
import * as position from "./position.js";
import { buildBookmarkRow } from "./panels.js";
import { paraFor } from "./manuscript.js";
import { SYNC } from "./sync.js";
import { readRaw, writeRaw } from "./storage.js";
import { toast } from "./toast.js";
import {
  KEY_INLINE,
  KEY_INLINE_HINT,
  KEY_BOOKMARK,
  DOUBLE_TAP_MS,
  DOUBLE_TAP_SLOP_PX,
  SELECT_SETTLE_MS,
  SEL_TOOLS_EDGE_PX,
} from "./config.js";

/* Two gestures over the same text, told apart by whether the selection is
   collapsed.

   A DRAG-SELECT raises the Note / Edit / Mark toolbar. A plain click (mouse) or
   double-tap (touch) opens the paragraph for editing in place. Long-press is
   deliberately not used: the browser owns it for text selection, which is what
   feeds the toolbar. */

/* ---------- inline editing preference ---------- */

// "off" means off; anything else, including a missing key, means on.
let inlinePref = readRaw(KEY_INLINE) === "off" ? "off" : "on";

export const inlineActive = () => inlinePref === "on" && render.getMode() === "review";
const gestureName = () => (editor.isTouch() ? "Double-tap" : "Click");

export function applyInline() {
  /* Inline editing can switch off under an open editor (mode flipped to Read, or
     the toggle turned off). Committing beats discarding: the author typed those
     words on purpose. */
  if (editor.isEditing() && !inlineActive()) editor.commitEditor();
  document.documentElement.setAttribute("data-inline", inlineActive() ? "on" : "off");
  for (const b of document.querySelectorAll("[data-inline-set]")) {
    b.classList.toggle("active", b.getAttribute("data-inline-set") === inlinePref);
  }
  if (inlineHint) {
    inlineHint.textContent =
      gestureName() + " any paragraph to edit it where it sits. Saved as a tracked change.";
  }
  if (inlineActive() && !readRaw(KEY_INLINE_HINT)) {
    writeRaw(KEY_INLINE_HINT, "1");
    setTimeout(
      () => toast(gestureName() + " any paragraph to edit it — changes are tracked"),
      1200
    );
  }
}

/* ---------- selection -> floating toolbar (review mode only) ---------- */

let pendingSel = null;

function paragraphOfSelection() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null;
  const node = sel.getRangeAt(0).commonAncestorContainer;
  const el = node.nodeType === 1 ? node : node.parentElement;
  const p = el && el.closest ? el.closest("#book p.para") : null;
  // Selecting inside the live editor used to pop Note/Edit/Mark on top of it.
  if (!p || p === editor.editingEl()) return null;
  return p;
}

function onSelect() {
  if (render.getMode() !== "review") {
    selTools.classList.remove("show");
    pendingSel = null;
    return;
  }
  const p = paragraphOfSelection();
  if (!p) {
    selTools.classList.remove("show");
    pendingSel = null;
    return;
  }
  const sel = window.getSelection();
  const rect = sel.getRangeAt(0).getBoundingClientRect();
  // The quote is the RENDERED text, so it carries curly quotes and em dashes.
  pendingSel = { para: paraFor.get(p), quote: sel.toString().replace(/\s+/g, " ").trim() };
  // #selTools is position:absolute, so it is placed in PAGE coordinates —
  // unlike every popover, which is fixed and placed in viewport coordinates.
  let x = window.scrollX + rect.left + rect.width / 2;
  x = Math.max(
    window.scrollX + SEL_TOOLS_EDGE_PX,
    Math.min(x, window.scrollX + window.innerWidth - SEL_TOOLS_EDGE_PX)
  );
  selTools.style.left = x + "px";
  selTools.style.top = window.scrollY + rect.top + "px";
  selTools.classList.add("show");
}

function consumeSel() {
  const para = pendingSel ? pendingSel.para : null;
  const quote = pendingSel ? pendingSel.quote : "";
  selTools.classList.remove("show");
  if (window.getSelection) window.getSelection().removeAllRanges();
  return { para, quote };
}

/* ---------- the tap / click layer ---------- */

let pendingInline = null;
let lastTap = { t: 0, x: 0, y: 0, el: null };

export function init() {
  btnAddNote.innerHTML = svg("note") + "<span>Note</span>";
  btnAddEdit.innerHTML = svg("pen") + "<span>Edit</span>";
  btnAddBookmark.innerHTML = svg("bookmark") + "<span>Mark</span>";

  // The 10 ms deferral lets the browser finalise the selection first.
  document.addEventListener("mouseup", () => setTimeout(onSelect, SELECT_SETTLE_MS));
  document.addEventListener("touchend", () => setTimeout(onSelect, SELECT_SETTLE_MS));
  // Without this the selection collapses before the button's click handler runs
  // and consumeSel() returns nothing.
  selTools.addEventListener("mousedown", (e) => e.preventDefault());

  btnAddNote.addEventListener("click", () => {
    const c = consumeSel();
    if (c.para) openComposer(c.para, c.quote);
  });
  btnAddEdit.addEventListener("click", () => {
    const c = consumeSel();
    if (c.para) editor.openEditor(c.para, c.quote);
  });
  btnAddBookmark.addEventListener("click", () => {
    const c = consumeSel();
    if (!c.para) return;
    const pos = position.posOfParagraph(c.para);
    position.savePos(KEY_BOOKMARK, pos);
    SYNC.pushBookmark(pos);
    buildBookmarkRow();
    toast("Bookmarked this passage");
  });

  for (const b of document.querySelectorAll("[data-inline-set]")) {
    b.addEventListener("click", () => {
      inlinePref = b.getAttribute("data-inline-set") === "off" ? "off" : "on";
      writeRaw(KEY_INLINE, inlinePref);
      applyInline();
      toast(inlinePref === "on" ? "Inline editing on" : "Inline editing off");
    });
  }

  /* Covers a mouse being plugged in, Sidecar, an iPad keyboard case. */
  editor.watchPointerKind(applyInline);

  /* Capture phase, registered here at boot so it runs BEFORE any popover's own
     outside-click handler. The ordering has to be deterministic: commit the open
     editor first, then open the new one. Registering it lazily would let the
     open editor's popover eat the click and the new editor would never open. */
  document.addEventListener(
    "pointerdown",
    (e) => {
      if (!inlineActive()) return;
      const t = e.target;
      // The editor's own bar must reach its buttons — Cancel has to still discard.
      if (t && t.closest && (t.closest(".popover") || t.closest("#selTools"))) return;

      /* e.target is fine when no editor is open: nothing is being re-rendered.
         When an editor IS open, committing it repaints that paragraph's innards,
         so resolve by coordinates instead — the original reason this call
         exists. Keeping it conditional removes a forced layout from every tap in
         the document. */
      const hit = editor.isEditing() ? document.elementFromPoint(e.clientX, e.clientY) : t;
      const el = hit && hit.closest ? hit.closest("#book p.para") : null;
      let para = el ? paraFor.get(el) : null;
      // The dots own their clicks.
      if (para && t && t.closest && (t.closest(".noteDot") || t.closest(".editDot"))) para = null;

      const editingNow = editor.editingEl();
      // Read the caret BEFORE committing anything: committing reflows the page.
      const caret = para && el !== editingNow ? editor.caretContextAt(el, e.clientX, e.clientY) : null;
      if (editingNow && el !== editingNow) editor.commitEditor();
      pendingInline = para && el !== editingNow ? { para, el, caret } : null;
    },
    true
  );

  document.addEventListener("click", (e) => {
    const q = pendingInline;
    pendingInline = null;
    if (!q || !inlineActive() || editor.editingEl() === q.el || !q.el.isConnected) return;
    const sel = window.getSelection();
    if (sel && sel.rangeCount && !sel.isCollapsed) return; // drag-select belongs to the toolbar
    if (!editor.isTouch()) {
      editor.openEditor(q.para, "", { auto: true, caret: q.caret });
      return;
    }
    /* Touch: the FIRST tap only remembers where and when. The second tap does
       the work, and it must call openEditor -> p.focus() SYNCHRONOUSLY, because
       iOS raises the soft keyboard only for a focus that happens inside the
       gesture's own handler. Nothing here may be deferred to a timer. */
    const now = Date.now();
    const near =
      lastTap.el === q.el &&
      Math.abs(e.clientX - lastTap.x) <= DOUBLE_TAP_SLOP_PX &&
      Math.abs(e.clientY - lastTap.y) <= DOUBLE_TAP_SLOP_PX;
    if (near && now - lastTap.t <= DOUBLE_TAP_MS) {
      // Reset, so a third tap does not re-fire.
      lastTap = { t: 0, x: 0, y: 0, el: null };
      editor.openEditor(q.para, "", { auto: true, caret: q.caret });
      return;
    }
    lastTap = { t: now, x: e.clientX, y: e.clientY, el: q.el };
  });

  /* ---------- the gated edit attempt ----------
     Editing is only live in Review mode, and the gate used to be SILENT: in Read
     mode the handler above returns on its first line, so a double-tap on a
     paragraph produced no editor, no toast and no hint whatever. That does not
     read as "you are in the other mode", it reads as a broken app — which is
     exactly how it was reported.

     Nobody double-taps a paragraph of prose by accident, so the gesture is taken
     as what it plainly is: switch to Review, open the editor, and say so. The
     whole thing stays inside the gesture's own task — setMode() is synchronous
     by design — so iOS still raises the keyboard.

     An explicit "inline editing off" preference is a different matter. The
     author set that deliberately, so it is explained rather than overridden.

     Kept in its own listeners so the live editing path above pays nothing for
     any of it. */
  function gatedEdit(el, x, y) {
    const para = paraFor.get(el);
    if (!para) return;
    if (inlinePref === "off") {
      toast("Inline editing is off — switch it on in Settings");
      return;
    }
    render.setMode("review");
    toast("Review mode — edit away");
    editor.openEditor(para, "", { auto: true, caret: editor.caretContextAt(el, x, y) });
  }

  const gatedTarget = (e) => {
    if (inlineActive()) return null; // the live path already handled it
    const t = e.target;
    if (!t || !t.closest || t.closest(".popover") || t.closest("#selTools")) return null;
    return t.closest("#book p.para");
  };

  // Desktop: the native event. Not the manual tracker below — a desktop
  // double-click also selects a word, and a selection check would swallow it.
  document.addEventListener("dblclick", (e) => {
    const el = gatedTarget(e);
    if (el && !editor.isTouch()) gatedEdit(el, e.clientX, e.clientY);
  });

  // Touch: the same double-tap contract as the live path, so the gesture that
  // works in Review is the gesture that gets you there from Read.
  let gatedTap = { t: 0, x: 0, y: 0, el: null };
  document.addEventListener("click", (e) => {
    const el = gatedTarget(e);
    if (!el || !editor.isTouch()) return;
    const sel = window.getSelection();
    if (sel && sel.rangeCount && !sel.isCollapsed) return; // drag-select belongs to the toolbar
    const now = Date.now();
    const near =
      gatedTap.el === el &&
      Math.abs(e.clientX - gatedTap.x) <= DOUBLE_TAP_SLOP_PX &&
      Math.abs(e.clientY - gatedTap.y) <= DOUBLE_TAP_SLOP_PX;
    if (near && now - gatedTap.t <= DOUBLE_TAP_MS) {
      gatedTap = { t: 0, x: 0, y: 0, el: null };
      gatedEdit(el, e.clientX, e.clientY);
      return;
    }
    gatedTap = { t: now, x: e.clientX, y: e.clientY, el };
  });
}
