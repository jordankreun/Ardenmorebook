/* The element-handle registry: one getElementById per id, and no logic at all.
   Every module imports the handles it needs from here rather than querying the
   document itself, so there is exactly one place to look when the markup moves. */

const $ = (id) => document.getElementById(id);

export const book = $("book");
export const bar = $("bar");
export const btnMenu = $("btnMenu");
export const btnMode = $("btnMode");
export const btnSettings = $("btnSettings");
export const scrim = $("scrim");
export const drawer = $("drawer");
export const settings = $("settings");
export const tocNav = $("tocNav");
export const bookPct = $("bookPct");
export const miniFill = $("miniFill");
export const bmSet = $("bmSet");
export const bmGo = $("bmGo");
export const bookHint = $("bookHint");
export const btnBookMd = $("btnBookMd");
export const btnBookPdf = $("btnBookPdf");
export const tabNotes = $("tabNotes");
export const tabEdits = $("tabEdits");
export const btnCopy = $("btnCopy");
export const btnDownload = $("btnDownload");
export const btnSync = $("btnSync");
export const btnClearAll = $("btnClearAll");
export const notesList = $("notesList");
export const editsList = $("editsList");
export const btnSmaller = $("btnSmaller");
export const btnBigger = $("btnBigger");
export const inlineHint = $("inlineHint");
export const buildInfo = $("buildInfo");
export const selTools = $("selTools");
export const btnAddNote = $("btnAddNote");
export const btnAddEdit = $("btnAddEdit");
export const btnAddBookmark = $("btnAddBookmark");
export const progress = $("progress");
export const ticks = $("ticks");
export const toastEl = $("toast");

/* The unread badge is created here rather than in the markup, as it always has
   been: it is positioned absolutely inside #btnMenu, which is otherwise empty
   until the icon is written into it. */
export const noteCount = document.createElement("span");
noteCount.id = "noteCount";
