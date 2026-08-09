import * as popover from "./popover.js";
import * as store from "./store.js";
import { toast } from "./toast.js";
import { esc } from "./text.js";
import { COMPOSER_REANCHOR_MS } from "./config.js";

/* The note composer: a small card floating beside the passage, anchored to the
   note dot when there is one. The page never reflows, so the reader keeps their
   exact place. */

export function openComposer(para, quote, anchor) {
  popover.closeCurrent();

  const p = para.el;
  const chap = para.chap;
  const snip = para.snip;
  const existing = store.openNote(para.key);
  const q = (existing && existing.quote) || quote || "";

  const box = document.createElement("div");
  box.className = "composer";
  box.innerHTML =
    (q ? '<p class="quote">' + esc(q.length > 220 ? q.slice(0, 220) + "…" : q) + "</p>" : "") +
    '<textarea placeholder="Your note or feedback about this passage…"></textarea>' +
    '<div class="row"><button class="primary save">Save note</button><button class="cancel">Cancel</button>' +
    (existing ? '<button class="del">Delete</button>' : "") +
    "</div>";

  const pop = popover.openPopover(anchor || p, box, { className: "noteCard" });
  const signal = pop.ac.signal;
  const ta = box.querySelector("textarea");
  ta.value = existing ? existing.text : "";
  ta.focus();
  // The soft keyboard resizes the viewport after focus; re-anchor once it has.
  setTimeout(() => {
    if (!pop.closed) {
      popover.remeasure(pop);
      popover.reposition(pop);
    }
  }, COMPOSER_REANCHOR_MS);

  ta.addEventListener(
    "keydown",
    (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        box.querySelector(".save").click();
      } else if (e.key === "Escape") {
        e.preventDefault();
        popover.closeCurrent();
      }
    },
    { signal }
  );

  box.querySelector(".save").addEventListener(
    "click",
    () => {
      const v = ta.value.trim();
      if (!v) {
        toast("Nothing to save");
        return;
      }
      popover.closeCurrent();
      // The store change repaints this paragraph and rebuilds the notes list.
      store.upsertNote(chap, snip, q, v);
      toast("Note saved");
    },
    { signal }
  );

  box.querySelector(".cancel").addEventListener("click", () => popover.closeCurrent(), { signal });

  const del = box.querySelector(".del");
  if (del) {
    del.addEventListener(
      "click",
      () => {
        popover.closeCurrent();
        store.deleteNote(chap, snip);
        toast("Note deleted");
      },
      { signal }
    );
  }
}
