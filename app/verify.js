import * as manuscript from "./manuscript.js";
import * as store from "./store.js";
import { normText } from "./text.js";

/* Auto-resolve revisions the author has already written into the manuscript.

   The old version re-ran book.querySelectorAll("p[data-snip]") — all 1,618 nodes
   — and a fresh regex per comparison, for EVERY unresolved revision: 27 ms at
   today's four open revisions, 835 ms if all sixty-nine were open. It degraded
   exactly as the author edited. manuscript.presentText is a Set of
   "chap|normalised text" built in the same single pass that builds the
   paragraphs, so this is now O(revisions). */

export function verifyApplied() {
  if (!manuscript.chapters.length) return false;
  const changed = [];
  for (const r of store.allRevs()) {
    if (!r || r.resolved) continue;
    if (!manuscript.chapterTitles.has(r.chap)) continue;
    /* ⚠️ A SPANNING record's `original` is several paragraphs joined by blank
       lines, and presentText holds them SINGLY — so the joined string can never
       be found there, and the naive lookup below marked every cross-paragraph
       revision "applied" the first time sync ran and dropped it from the open
       list. Silent loss of the author's work, on the one edit shape that is
       most laborious to redo. Check the parts instead, and err toward keeping
       the record open: while ANY of the original paragraphs is still in the
       manuscript the change has not been written in yet. */
    const parts =
      Number(r.span) > 1 ? String(r.original || "").split(/\n\s*\n/) : [r.original];
    if (parts.some((t) => manuscript.presentText.has(r.chap + "|" + normText(t)))) continue;
    /* The original text is gone from the manuscript, so the author applied this
       change upstream. Mark it resolved — and do NOT touch r.ts. `ts` is the
       creation time and the merge tiebreaker; moving it to "now" on resolve made
       a resolved record outrank a genuinely newer edit from another device,
       which then vanished at the next merge. resolvedTs records the resolve.
       This is a fixed regression; do not "tidy" it back. */
    r.resolved = true;
    r.resolvedTs = Date.now();
    r.resolvedVia = "applied";
    changed.push(store.keyOf(r));
  }
  if (changed.length) store.markAppliedBulk(changed);
  return changed.length > 0;
}
