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
    if (manuscript.presentText.has(r.chap + "|" + normText(r.original))) continue;
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
