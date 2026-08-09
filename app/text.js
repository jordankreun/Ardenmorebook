/* Text: escaping, book typography, the markdown block parser, and the two
   whitespace normalisations that the stored record keys depend on.

   snip() and normText() are part of the data contract. Their output is compared
   against records the author has been accumulating since the first version of
   this app; changing either by one character orphans every note and revision. */

/** Escapes &, < and > only — the three that matter for text content. */
export function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* Display-only book typography: curly quotes plus en/em dashes. Applied AFTER
   escaping, and never to a stored field or to any export — the manuscript keeps
   its straight quotes. The order of these seven passes is load-bearing. */
export function typo(s) {
  return s
    .replace(/---/g, "—")
    .replace(/--/g, "–")
    .replace(/\.\.\./g, "…")
    .replace(/(^|[\s([{—–"])'/g, "$1‘")
    .replace(/'/g, "’")
    .replace(/(^|[\s([{—–])"/g, "$1“")
    .replace(/"/g, "”");
}

/** Raw markdown block -> display HTML. Single-asterisk emphasis only. */
export function inline(s) {
  return typo(esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>"));
}

/* Memoised inline() for revised text. Bounded by the number of revisions (~69
   today), so there is nothing to evict. Paragraph text is memoised separately,
   on the Para object, because that string never changes. */
const inlineMemo = new Map();
export function inlineCached(s) {
  let html = inlineMemo.get(s);
  if (html === undefined) {
    html = inline(s);
    inlineMemo.set(s, html);
  }
  return html;
}

/* THE RECORD KEY. Computed from RAW markdown, so it can legitimately contain
   *emphasis asterisks* — the live notes.json has a record whose snip is
   "*From one of the later journals*". Snipping the rendered text instead would
   produce different keys and orphan every stored record. */
export function snip(t) {
  return t.replace(/\s+/g, " ").trim().slice(0, 100);
}

/** Whitespace-collapsed text, used to match a revision against the manuscript. */
export function normText(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}

/** Whitespace-split words, the unit the diff works in. */
export function tok(s) {
  return s
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter((x) => x !== "");
}

/* The whole markdown parser. Blocks are separated by blank lines. "---" is a
   scene divider, "### " opens a chapter, "## " and "# " (the front matter each
   chapter file repeats) are discarded, everything else is a paragraph. */
export function parse(md) {
  md = md.replace(/\r\n?/g, "\n");
  const raw = md.split(/\n{2,}/);
  const out = [];
  for (const chunk of raw) {
    const b = chunk.trim();
    if (!b) continue;
    if (b === "---") {
      out.push({ t: "scene" });
      continue;
    }
    if (b.indexOf("### ") === 0) {
      out.push({ t: "chapter", text: b.slice(4).trim() });
      continue;
    }
    if (b.indexOf("## ") === 0 || b.indexOf("# ") === 0) continue;
    out.push({ t: "p", text: b.replace(/\n+/g, " ").trim() });
  }
  return out;
}
