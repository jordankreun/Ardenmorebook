import { parse, snip as snipOf, normText } from "./text.js";
import { MANIFEST_URL, CHAPTER_DIR } from "./config.js";

/* The manuscript model. Parsed exactly once per chapter file, at load, and never
   recomputed — the raw text of a paragraph cannot change while the app is open.

   Chapter = { index, id: "ch-N", title, el, flow: Block[] }
   Block   = { t: "chapter", text } | { t: "scene" } | { t: "p", para }
   Para    = { chap, snip, key, text, norm, html, el }

     chap : the chapter title, verbatim from the "### " line after slice(4).trim().
            "" for a paragraph that precedes the heading in its own file — that
            empty string is a real, live value and must not be normalised away.
     snip : snip(text) from the RAW markdown, so it can contain *asterisks*.
     key  : chap + "|" + snip — identical to store.keyOf(record).
     text : the raw markdown block, \n+ -> " " then trimmed. The `original` field.
     norm : whitespace-collapsed text, precomputed for verify.js.
     html : inline(text), computed on first paint and then cached forever.
     el   : the <p> node, assigned at mount.

   The <p> nodes deliberately no longer carry data-chap / data-snip / data-text.
   Those three attributes duplicated 730 KB of string data into the DOM purely so
   a querySelectorAll could find it again. The model is reached through paraFor
   instead, and the derivations above are byte-identical to the old ones. */

export const chapters = [];
export const paras = [];
/** "chap|snip" -> Para[]. An ARRAY: the manuscript contains two genuinely
    colliding (chap, snip) pairs today, and fixing that would change the record
    key and orphan every stored note and revision. Painting both preserves what
    the old whole-book render did incidentally. */
export const parasByKey = new Map();
/** Replaces chapterLoaded()'s linear scan over chapters[]. */
export const chapterTitles = new Set();
/** chap + "|" + para.norm, for verify.js. Turns an O(revisions x paragraphs)
    scan into O(revisions). */
export const presentText = new Set();
/** The raw chapter markdown, retained for the book export. */
export const bookMd = [];
/** <p> -> Para. */
export const paraFor = new WeakMap();

function bust(u) {
  return u + (u.indexOf("?") < 0 ? "?" : "&") + "v=" + Date.now();
}

async function fetchText(u) {
  const r = await fetch(bust(u), { cache: "no-store" });
  // This exact string is shown to the reader on the failure page.
  if (!r.ok) throw new Error(u + " (" + r.status + ")");
  return r.text();
}

/** Fetches the manifest and every chapter file in parallel, then builds the model. */
export async function load() {
  const files = JSON.parse(await fetchText(MANIFEST_URL));
  const texts = await Promise.all(files.map((f) => fetchText(CHAPTER_DIR + f)));
  build(texts);
  return texts;
}

export function build(texts) {
  chapters.length = 0;
  paras.length = 0;
  bookMd.length = 0;
  parasByKey.clear();
  chapterTitles.clear();
  presentText.clear();
  bookMd.push(...texts);

  texts.forEach((md, index) => {
    const blocks = parse(md);
    const flow = [];
    let title = "";
    for (const b of blocks) {
      if (b.t === "chapter") {
        title = b.text;
        flow.push({ t: "chapter", text: b.text });
        continue;
      }
      if (b.t === "scene") {
        flow.push({ t: "scene" });
        continue;
      }
      const para = {
        chap: title,
        snip: snipOf(b.text),
        key: "",
        text: b.text,
        norm: normText(b.text),
        html: null,
        el: null,
      };
      para.key = para.chap + "|" + para.snip;
      flow.push({ t: "p", para });
      paras.push(para);
      const bucket = parasByKey.get(para.key);
      if (bucket) bucket.push(para);
      else parasByKey.set(para.key, [para]);
      presentText.add(para.chap + "|" + para.norm);
    }
    const chapter = {
      index,
      id: "ch-" + index,
      title: title || "Part " + (index + 1),
      el: null,
      flow,
    };
    chapters.push(chapter);
    chapterTitles.add(chapter.title);
  });
}

/** The first paragraph carrying this record key, in document order. */
export function paraByKey(key) {
  const bucket = parasByKey.get(key);
  return bucket && bucket.length ? bucket[0] : null;
}

/** Chapter index by title, for sorting exported feedback in book order. */
export function chapterOrder() {
  const order = new Map();
  chapters.forEach((c, i) => order.set(c.title, i));
  return order;
}
