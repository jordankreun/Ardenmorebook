import {
  drawer,
  tocNav,
  bmSet,
  bmGo,
  bookHint,
  btnBookMd,
  btnBookPdf,
  tabNotes,
  tabEdits,
  btnCopy,
  btnDownload,
  btnSync,
  notesList,
  editsList,
} from "./dom.js";
import { svg } from "./icons.js";
import * as store from "./store.js";
import * as manuscript from "./manuscript.js";
import * as render from "./render.js";
import * as position from "./position.js";
import * as shell from "./shell.js";
import { openEditor } from "./editor.js";
import { diffHTML } from "./diff.js";
import { esc } from "./text.js";
import { toast } from "./toast.js";
import { SYNC, onState, onBookmark } from "./sync.js";
import {
  bySortedChap,
  copyFeedback,
  downloadFeedback,
  downloadBook,
  savePdf,
  bookWordCount,
} from "./exports.js";
import {
  KEY_BOOKMARK,
  QUOTE_TRUNC_ACTIVE,
  QUOTE_TRUNC_RESOLVED,
  DRAWER_EDIT_DELAY_MS,
} from "./config.js";

/* Everything inside the drawer: contents, bookmark row, the book panel, the
   notes and track-changes lists, and the sync button. */

/* ---------- contents ---------- */

export function buildToc() {
  tocNav.textContent = "";
  const frag = document.createDocumentFragment();
  for (const c of manuscript.chapters) {
    const a = document.createElement("a");
    a.href = "#" + c.id;
    a.dataset.id = c.id;
    a.textContent = tocLabel(c.title);
    a.addEventListener("click", shell.closeAll);
    frag.appendChild(a);
  }
  tocNav.appendChild(frag);
  buildBookmarkRow();
}

function tocLabel(title) {
  if (/^Prologue/i.test(title)) return title;
  const m = title.match(/^Chapter\s+([^:]*)/i);
  if (!m) return title;
  const rest = title.replace(/^Chapter\s+[^:]*:\s*/i, "");
  return "Ch " + m[1].trim() + (rest ? ": " + rest : "");
}

/* ---------- bookmark ---------- */

export function buildBookmarkRow() {
  if (!bmSet || !bmGo) return;
  bmSet.innerHTML = svg("bookmark") + "<span>Bookmark this spot</span>";
  const bm = position.loadPos(KEY_BOOKMARK);
  bmGo.innerHTML = svg("arrowRight") + "<span>" + (bm ? "Go to your bookmark" : "No bookmark yet") + "</span>";
  bmGo.disabled = !bm;
}

/* ---------- shared list helpers ---------- */

function goToItem(chap, snip) {
  shell.closeAll();
  const para = manuscript.paraByKey(chap + "|" + snip);
  if (para && para.el) {
    para.el.scrollIntoView({ block: "center" });
    return;
  }
  const chapter = manuscript.chapters.find((c) => c.title === chap);
  if (chapter && chapter.el) chapter.el.scrollIntoView({ block: "start" });
}

function actions(spec) {
  return (
    '<div class="acts">' +
    spec.map((s) => '<a class="' + s.cls + '">' + s.label + "</a>").join("") +
    "</div>"
  );
}

/* ---------- notes ---------- */

function noteBody(n, qlen) {
  return (
    '<div class="ch">' +
    esc(n.chap || "") +
    (n.resolved ? ' <span class="doneTag">✓ done</span>' : "") +
    "</div>" +
    (n.quote
      ? '<p class="q">' + esc(n.quote.length > qlen ? n.quote.slice(0, qlen) + "…" : n.quote) + "</p>"
      : "") +
    '<div class="t">' +
    esc(n.text) +
    "</div>"
  );
}

export function buildNotesList() {
  const active = [];
  const resolved = [];
  for (const n of store.allNotes()) (n.resolved ? resolved : active).push(n);
  notesList.textContent = "";
  if (!active.length && !resolved.length) {
    notesList.innerHTML =
      '<div class="empty">No notes yet.<br><br>Select any passage while reading in Review mode and tap <b>Note</b> to leave feedback here. Then use <b>Copy for Claude</b>, or turn on sync.</div>';
    return;
  }
  for (const n of bySortedChap(active)) {
    const div = document.createElement("div");
    div.className = "noteItem";
    div.innerHTML =
      noteBody(n, QUOTE_TRUNC_ACTIVE) +
      actions([
        { cls: "go", label: "Go to" },
        { cls: "res", label: "Resolve" },
        { cls: "del", label: "Delete" },
      ]);
    div.querySelector(".go").addEventListener("click", () => goToItem(n.chap, n.snip));
    div.querySelector(".res").addEventListener("click", () => {
      store.setNoteResolved(n.chap, n.snip, true);
      toast("Note resolved");
    });
    div.querySelector(".del").addEventListener("click", () => store.deleteNote(n.chap, n.snip));
    notesList.appendChild(div);
  }
  if (resolved.length) {
    const h = document.createElement("div");
    h.className = "resHead";
    h.textContent = "Resolved (" + resolved.length + ")";
    notesList.appendChild(h);
    for (const n of bySortedChap(resolved)) {
      const div = document.createElement("div");
      div.className = "noteItem resolved";
      div.innerHTML =
        noteBody(n, QUOTE_TRUNC_RESOLVED) +
        actions([
          { cls: "go", label: "Go to" },
          { cls: "reopen", label: "Reopen" },
          { cls: "del", label: "Delete" },
        ]);
      div.querySelector(".go").addEventListener("click", () => goToItem(n.chap, n.snip));
      div.querySelector(".reopen").addEventListener("click", () => {
        store.setNoteResolved(n.chap, n.snip, false);
        toast("Note reopened");
      });
      div.querySelector(".del").addEventListener("click", () => store.deleteNote(n.chap, n.snip));
      notesList.appendChild(div);
    }
  }
}

/* ---------- track changes ---------- */

/* The resolved section used to render a full word-level diff for every record
   the author had already dealt with — a 2.6 M-cell dynamic program on every
   drawer open. Those rows now render empty and fill themselves when scrolled
   into view. */
let diffObserver = null;
const pendingDiffs = new WeakMap();

function lazyDiff(host, rec) {
  if (!("IntersectionObserver" in window)) {
    host.innerHTML = diffHTML(rec.original, rec.revised, rec);
    return;
  }
  pendingDiffs.set(host, rec);
  diffObserver.observe(host);
}

function resetDiffObserver() {
  if (diffObserver) diffObserver.disconnect();
  if (!("IntersectionObserver" in window)) return;
  diffObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const rec = pendingDiffs.get(e.target);
        if (rec) {
          e.target.innerHTML = diffHTML(rec.original, rec.revised, rec);
          pendingDiffs.delete(e.target);
        }
        diffObserver.unobserve(e.target);
      }
    },
    { root: drawer, rootMargin: "200px" }
  );
}

export function buildEditsList() {
  const active = [];
  const resolved = [];
  for (const r of store.allRevs()) (r.resolved ? resolved : active).push(r);
  resetDiffObserver();
  editsList.textContent = "";
  if (!active.length && !resolved.length) {
    editsList.innerHTML =
      '<div class="empty">No tracked changes yet.<br><br>In Review mode, select any passage, tap <b>Edit</b>, and rewrite it (or clear it to cut the passage). Applied edits are detected against the live manuscript and move to <b>Resolved</b> on their own.</div>';
    return;
  }
  for (const r of bySortedChap(active)) {
    const cut = !(r.revised && r.revised.trim());
    const div = document.createElement("div");
    div.className = "revItem";
    div.innerHTML =
      '<div class="ch">' +
      esc(r.chap || "") +
      "</div>" +
      '<div class="tag' +
      (cut ? " cut" : "") +
      '">' +
      (cut ? "Deletion" : "Revision") +
      "</div>" +
      '<div class="diff"></div>' +
      actions([
        { cls: "go", label: "Go to" },
        { cls: "edit", label: "Edit" },
        { cls: "res", label: "Resolve" },
        { cls: "del", label: "Revert" },
      ]);
    // Open changes are the ones the author is working on: render them eagerly.
    div.querySelector(".diff").innerHTML = diffHTML(r.original, r.revised, r);
    div.querySelector(".go").addEventListener("click", () => goToItem(r.chap, r.snip));
    div.querySelector(".edit").addEventListener("click", () => {
      const para = manuscript.paraByKey(r.chap + "|" + r.snip);
      shell.closeAll();
      if (para && para.el) {
        para.el.scrollIntoView({ block: "center" });
        // Let the scroll land before the caret is placed.
        setTimeout(() => openEditor(para), DRAWER_EDIT_DELAY_MS);
      }
    });
    div.querySelector(".res").addEventListener("click", () => {
      store.setRevResolved(r.chap, r.snip, true, "manual");
      toast("Change resolved");
    });
    div.querySelector(".del").addEventListener("click", () => store.deleteRev(r.chap, r.snip));
    editsList.appendChild(div);
  }
  if (resolved.length) {
    const h = document.createElement("div");
    h.className = "resHead";
    h.textContent = "Resolved (" + resolved.length + ")";
    editsList.appendChild(h);
    for (const r of bySortedChap(resolved)) {
      // An auto-detected applied change cannot be reopened, only deleted.
      const applied = r.resolvedVia === "applied";
      const div = document.createElement("div");
      div.className = "revItem resolved";
      div.innerHTML =
        '<div class="ch">' +
        esc(r.chap || "") +
        ' <span class="doneTag">' +
        (applied ? "✓ applied" : "✓ resolved") +
        "</span></div>" +
        '<div class="diff"></div>' +
        '<div class="acts"><a class="go">Go to</a>' +
        (applied ? "" : '<a class="reopen">Reopen</a>') +
        '<a class="del">Delete</a></div>';
      lazyDiff(div.querySelector(".diff"), r);
      div.querySelector(".go").addEventListener("click", () => goToItem(r.chap, r.snip));
      const ro = div.querySelector(".reopen");
      if (ro) {
        ro.addEventListener("click", () => {
          store.setRevResolved(r.chap, r.snip, false);
          toast("Change reopened");
        });
      }
      div.querySelector(".del").addEventListener("click", () => store.deleteRev(r.chap, r.snip));
      editsList.appendChild(div);
    }
  }
}

/* ---------- sync button ---------- */

export function updateSyncUI() {
  if (!btnSync) return;
  btnSync.textContent = !SYNC.secret
    ? "Turn on cross-device sync"
    : SYNC.on
      ? "Synced across devices ✓"
      : "Sync not working — " + (SYNC.err || "reconnecting");
  btnSync.title = SYNC.err ? "Last sync error: " + SYNC.err : "";
}

/* ---------- the book panel ---------- */

/* The word count is taken from bookMarkdown() WITHOUT edits applied, so it
   depends only on the manuscript and is computed once for the life of the page. */
let cachedWordCount = null;

export function updateBookHint() {
  if (!bookHint || !manuscript.bookMd.length) return;
  if (cachedWordCount === null) cachedWordCount = bookWordCount();
  const words = cachedWordCount;
  const openRevs = store.counts().revs;
  bookHint.textContent =
    manuscript.bookMd.length +
    " chapters, " +
    words.toLocaleString() +
    " words. " +
    (openRevs
      ? "Both exports include your " + openRevs + " tracked change" + (openRevs === 1 ? "" : "s") + "."
      : "Both exports carry any tracked changes you make.");
}

/* ---------- tabs ---------- */

function showPane(which) {
  const isNotes = which === "notes";
  tabNotes.classList.toggle("active", isNotes);
  tabEdits.classList.toggle("active", !isNotes);
  notesList.style.display = isNotes ? "" : "none";
  editsList.style.display = isNotes ? "none" : "";
}

/* ---------- rebuild scheduling ----------
   The lists are rebuilt lazily: a store change marks them stale and they are
   rebuilt when the drawer is next opened, in review mode only. A read-mode
   drawer shows a hidden panel, exactly as before. */

let notesDirty = true;
let editsDirty = true;

function refreshLists() {
  if (render.getMode() !== "review") return;
  if (notesDirty) {
    buildNotesList();
    notesDirty = false;
  }
  if (editsDirty) {
    buildEditsList();
    editsDirty = false;
  }
}

export function init() {
  btnBookMd.innerHTML = svg("download") + "Download .md";
  btnBookPdf.innerHTML = svg("download") + "Save as PDF";
  btnCopy.innerHTML = svg("copy") + "Copy for Claude";
  btnDownload.innerHTML = svg("download") + "Download .md";

  btnBookMd.addEventListener("click", downloadBook);
  btnBookPdf.addEventListener("click", () => savePdf(shell.closeAll));
  btnCopy.addEventListener("click", copyFeedback);
  btnDownload.addEventListener("click", downloadFeedback);

  tabNotes.addEventListener("click", () => showPane("notes"));
  tabEdits.addEventListener("click", () => showPane("edits"));

  bmSet.addEventListener("click", () => {
    const bm = position.currentPos();
    position.savePos(KEY_BOOKMARK, bm);
    SYNC.pushBookmark(bm);
    buildBookmarkRow();
    toast("Bookmarked this spot");
  });
  bmGo.addEventListener("click", () => {
    const bm = position.loadPos(KEY_BOOKMARK);
    if (!bm) return;
    shell.closeAll();
    position.gotoPos(bm);
    toast("Jumped to your bookmark");
  });

  btnSync.addEventListener("click", () => {
    const s = window.prompt(
      "Sync password (the FEEDBACK_SECRET you set in Vercel). Links your notes and bookmark across devices.",
      SYNC.secret || ""
    );
    if (s === null) return;
    SYNC.setSecret(s.trim());
    updateSyncUI();
    SYNC.init().then(() => {
      toast(
        SYNC.on
          ? "Sync connected"
          : "Could not reach sync (check the password and that the site is deployed)"
      );
      updateSyncUI();
      refreshLists();
    });
  });

  store.subscribe((change) => {
    if (change.type === "note" || change.type === "bulk") notesDirty = true;
    if (change.type === "revision" || change.type === "bulk") editsDirty = true;
    if (drawer.classList.contains("open")) refreshLists();
    updateBookHint();
  });

  shell.onDrawerOpen(refreshLists);
  onState(updateSyncUI);
  onBookmark(buildBookmarkRow);
  updateSyncUI();
  buildBookmarkRow();
}
