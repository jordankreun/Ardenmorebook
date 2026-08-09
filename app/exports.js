import * as store from "./store.js";
import * as manuscript from "./manuscript.js";
import * as render from "./render.js";
import { normText } from "./text.js";
import { toast } from "./toast.js";
import { UNKNOWN_CHAPTER_SORT, PRINT_OPEN_MS, PRINT_RESTORE_MS } from "./config.js";

/* Exports: the feedback markdown the author pastes to Claude, the whole book as
   markdown, and Save-as-PDF through the browser's own print dialog. */

/** Records in book order, then by ts. Unknown chapters sort to the end. */
export function bySortedChap(items) {
  const order = manuscript.chapterOrder();
  return items.slice().sort((a, b) => {
    const ai = order.has(a.chap) ? order.get(a.chap) : UNKNOWN_CHAPTER_SORT;
    const bi = order.has(b.chap) ? order.get(b.chap) : UNKNOWN_CHAPTER_SORT;
    return ai !== bi ? ai - bi : (a.ts || 0) - (b.ts || 0);
  });
}

function groupByChapter(records) {
  const byChap = new Map();
  for (const r of bySortedChap(records)) {
    const list = byChap.get(r.chap);
    if (list) list.push(r);
    else byChap.set(r.chap, [r]);
  }
  return byChap;
}

/** Unresolved records only. The format is a contract with the author's habits. */
export function exportMarkdown() {
  const notes = store.allNotes().filter((n) => !n.resolved);
  const revs = store.allRevs().filter((r) => !r.resolved);
  if (!notes.length && !revs.length) return "";

  let out = "# Reader feedback: The Tower of Ardenmoor\n\n";
  out +=
    "Exported " +
    new Date().toISOString().slice(0, 10) +
    ". " +
    notes.length +
    " note" +
    (notes.length === 1 ? "" : "s") +
    ", " +
    revs.length +
    " tracked change" +
    (revs.length === 1 ? "" : "s") +
    ".\n";

  if (notes.length) {
    out += "\n# Notes\n";
    for (const [chap, list] of groupByChapter(notes)) {
      out += "\n## " + chap + "\n\n";
      for (const n of list) {
        if (n.quote) out += "> " + n.quote + "\n\n";
        else out += '> (near: "' + n.snip + '…")\n\n';
        out += n.text + "\n\n";
      }
    }
  }

  if (revs.length) {
    out += "\n# Tracked changes\n";
    out += '\nApply these edits to the manuscript. "Delete this paragraph" means remove it entirely.\n';
    for (const [chap, list] of groupByChapter(revs)) {
      out += "\n## " + chap + "\n\n";
      for (const r of list) {
        out += "ORIGINAL:\n> " + r.original.replace(/\s+/g, " ").trim() + "\n\n";
        if (r.revised && r.revised.trim())
          out += "REVISED:\n> " + r.revised.replace(/\s+/g, " ").trim() + "\n\n";
        else out += "REVISED: (delete this paragraph)\n\n";
      }
    }
  }
  return out.trim() + "\n";
}

export function download(name, text) {
  const blob = new Blob([text], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

/* Every chapter file repeats the same two-line front matter ("# The Tower of
   Ardenmoor" / "## Book One") because each is a standalone document. For a
   single combined file that is noise, so the title is kept once at the top and
   only each chapter's own "###" heading carries through. Nothing else is
   touched: the export is the manuscript verbatim, not the reader's rendering. */
export function bookMarkdown(applyEdits) {
  if (!manuscript.bookMd.length) return "";
  /* Unresolved revisions only. A RESOLVED revision is one already written into
     the manuscript, so its text is in the source and applying it again would
     double it. Read mode uses the same rule. */
  const pending = applyEdits ? store.allRevs().filter((r) => !r.resolved) : [];
  let applied = 0;
  const body = [];

  for (const chapterText of manuscript.bookMd) {
    const lines = String(chapterText).split(/\r?\n/);
    const kept = [];
    let seenHead = false;
    let chapTitle = "";
    for (let j = 0; j < lines.length; j++) {
      const L = lines[j];
      if (!seenHead) {
        if (/^#\s+The Tower of Ardenmoor\s*$/.test(L)) continue;
        if (/^##\s+Book One\s*$/.test(L)) continue;
        if (/^###\s+/.test(L)) {
          seenHead = true;
          chapTitle = L.slice(4).trim();
          kept.push(L);
          continue;
        }
        if (!L.trim()) continue; // blank lines inside the front matter
      }
      /* The chapter title comes from the very "###" line that opens the chapter
         and equals a record's `chap`, so a revision can be matched here with no
         lookup table. Match on `original` (the whole paragraph), never on `snip`
         (a 100-char prefix) — the same authority verifyApplied() uses. */
      if (pending.length && seenHead && L.trim()) {
        const key = normText(L);
        const hit = pending.find((r) => r.chap === chapTitle && normText(r.original) === key);
        if (hit) {
          applied++;
          const rep = String(hit.revised || "").replace(/\s+/g, " ").trim();
          if (!rep) {
            /* Deletion: drop the paragraph AND the blank line after it, or the
               export keeps a paragraph-sized hole. The tidy-up at the end
               collapses 4+ newlines to three, not two, so it cannot fix this. */
            if (j + 1 < lines.length && !lines[j + 1].trim()) j++;
            continue;
          }
          kept.push(rep);
          continue;
        }
      }
      kept.push(L);
    }
    while (kept.length && !kept[kept.length - 1].trim()) kept.pop();
    body.push(kept.join("\n"), "");
  }

  const out = ["# The Tower of Ardenmoor", "", "## Book One", ""];
  if (applied) {
    out.push(
      "*Includes " + applied + " tracked change" + (applied === 1 ? "" : "s") + " not yet in the source manuscript.*",
      ""
    );
  }
  return out.concat(body).join("\n").replace(/\n{4,}/g, "\n\n\n") + "\n";
}

export function bookWordCount() {
  const md = bookMarkdown();
  return md ? (md.replace(/^#{1,6} .*$/gm, "").match(/\S+/g) || []).length : 0;
}

export function copyFeedback() {
  const md = exportMarkdown();
  if (!md) {
    toast("No open feedback to copy");
    return;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(md).then(
      () => toast("Copied. Paste it to Claude"),
      () => fallbackCopy(md)
    );
  } else fallbackCopy(md);
}

/* navigator.clipboard is unavailable on insecure origins, so the old
   execCommand path stays as the fallback. */
function fallbackCopy(md) {
  const ta = document.createElement("textarea");
  ta.value = md;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    toast("Copied. Paste it to Claude");
  } catch {
    toast("Copy failed; use Download");
  }
  document.body.removeChild(ta);
}

export function downloadFeedback() {
  const md = exportMarkdown();
  if (!md) {
    toast("No open feedback to copy");
    return;
  }
  download("ardenmoor-feedback.md", md);
}

export function downloadBook() {
  const md = bookMarkdown(true);
  if (!md) {
    toast("The book is still loading");
    return;
  }
  download("the-tower-of-ardenmoor.md", md);
  toast("Downloaded the whole book");
}

/* PDF without a bundled library: the print stylesheet hides every piece of UI
   and re-sets the book for paper, then the browser's own print dialog writes the
   PDF. Works offline, needs no external script (the CSP blocks those), and the
   reader keeps the browser's page-size and margin controls. */
export function savePdf(closeAll) {
  if (!manuscript.bookMd.length) {
    toast("The book is still loading");
    return;
  }
  closeAll();
  /* Print the READ-MODE rendering whatever mode we are in. In review mode a
     deleted paragraph is still in the DOM as struck-through .diff-del text, and
     the print stylesheet removes the strikethrough — so printing from review
     would set cut words as ordinary prose. */
  const prevMode = render.getMode();
  if (prevMode !== "read") render.setMode("read");
  store.flushNow();
  toast("Choose “Save as PDF” in the print dialog");
  setTimeout(() => {
    window.print();
    setTimeout(() => {
      if (prevMode !== "read") render.setMode(prevMode);
    }, PRINT_RESTORE_MS);
  }, PRINT_OPEN_MS);
}
