import { esc, tok } from "./text.js";

/* Word-level diff. The rendered output of every stored revision depends on this
   file, so the algorithm is unchanged from the version the author has been
   reading: a longest-common-subsequence dynamic program, backtracked forwards.

   Only the storage changed. The old code allocated an (n+1)x(m+1) array of JS
   arrays — 12,019 nested arrays and 2.6 M cells across the 69 live revisions.
   One flat Uint16Array does the same work in one allocation. Cell values are
   LCS lengths, bounded by the shorter word count (504 in the longest paragraph
   in the book), so 16 bits is ample. */
export function diffWords(a, b) {
  const A = tok(a);
  const B = tok(b);
  const n = A.length;
  const m = B.length;
  const W = m + 1;
  const dp = new Uint16Array((n + 1) * W);

  for (let i = n - 1; i >= 0; i--) {
    const row = i * W;
    const next = row + W;
    for (let j = m - 1; j >= 0; j--) {
      dp[row + j] =
        A[i] === B[j] ? dp[next + j + 1] + 1 : Math.max(dp[next + j], dp[row + j + 1]);
    }
  }

  const out = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (A[i] === B[j]) {
      out.push({ t: "eq", s: A[i] });
      i++;
      j++;
    } else if (dp[(i + 1) * W + j] >= dp[i * W + (j + 1)]) {
      /* >= not > : the tie-break is what makes a diff read "old new" rather than
         "new old", by emitting the deletion first. Flipping it changes the
         rendered output of every revision in the book. */
      out.push({ t: "del", s: A[i] });
      i++;
    } else {
      out.push({ t: "ins", s: B[j] });
      j++;
    }
  }
  while (i < n) out.push({ t: "del", s: A[i++] });
  while (j < m) out.push({ t: "ins", s: B[j++] });
  return out;
}

/* Memo keyed on the record object itself. Records are mutated in place, so the
   cached `original`/`revised` are re-checked before the cached HTML is reused.
   A WeakMap self-evicts when a record is dropped by a merge. This is what stops
   the drawer, the renderer and every resolve from re-running the same DP. */
const memo = new WeakMap();

/**
 * @param {string} orig    the manuscript paragraph
 * @param {string} revised the author's replacement ("" means: cut the paragraph)
 * @param {object} [rec]   the revision record, used only as a memo key
 */
export function diffHTML(orig, revised, rec) {
  if (rec) {
    const hit = memo.get(rec);
    if (hit && hit.original === orig && hit.revised === revised) return hit.html;
  }
  const html = build(orig, revised);
  if (rec) memo.set(rec, { original: orig, revised, html });
  return html;
}

function build(orig, revised) {
  // An empty replacement is the deletion sentinel: strike the whole paragraph.
  if (!revised || !revised.trim()) {
    return '<span class="diff-del">' + esc(orig.replace(/\s+/g, " ").trim()) + "</span>";
  }
  const parts = diffWords(orig, revised);
  let html = "";
  for (let k = 0; k < parts.length; k++) {
    // Every part after the first is prefixed with one space, so the diff view
    // normalises all original whitespace to single spaces.
    const pre = k > 0 ? " " : "";
    const p = parts[k];
    if (p.t === "eq") html += pre + esc(p.s);
    else if (p.t === "del") html += pre + '<span class="diff-del">' + esc(p.s) + "</span>";
    else html += pre + '<span class="diff-ins">' + esc(p.s) + "</span>";
  }
  return html;
}
