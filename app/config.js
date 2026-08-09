/* Names and numbers. No logic lives here, and nothing here imports anything.

   The localStorage key strings are the migration contract with every copy of the
   app the author has ever run. Renaming one orphans the work stored under it. */

export const MANIFEST_URL = "manuscript/manifest.json";
export const CHAPTER_DIR = "manuscript/";
export const SYNC_URL = "api/sync"; // relative on purpose: see §8.4 of the rebuild spec

/* ---------- localStorage keys ----------
   The encoding of each key is NOT uniform and must not be made uniform: THEME,
   MODE, INLINE, INLINE_HINT and SECRET are plain strings, the rest are JSON.
   A rebuild that JSON-encodes everything cannot read the author's stored theme. */
export const KEY_PROGRESS = "ardenmoor.progress.v1";
export const KEY_BOOKMARK = "ardenmoor.bookmark.v1";
export const KEY_FS = "ardenmoor.fontsize.v1";
export const KEY_THEME = "ardenmoor.theme.v1";
export const KEY_NOTES = "ardenmoor.comments.v1"; // notes — note the historical name
export const KEY_REVS = "ardenmoor.revisions.v1";
export const KEY_SECRET = "ardenmoor.sync.secret.v1";
export const KEY_MODE = "ardenmoor.mode.v1";
export const KEY_INLINE = "ardenmoor.inlineedit.v1";
export const KEY_INLINE_HINT = "ardenmoor.inlineedit.hint.v1";
/* Tombstone epoch, milliseconds. Records at or before it are dropped on both
   sides of the sync. Absent or "0" on every device that has never cleared. */
export const KEY_CLEARED = "ardenmoor.clearedat.v1";
/* ardenmoor.tts.rate.v1 and ardenmoor.tts.voice.v1 are deliberately absent.
   Read-aloud was removed (rebuild spec §7.2); the author's stored preferences are
   never read, never written and never deleted, so restoring the feature restores
   the settings with it. */

/* ---------- timings ---------- */
export const PERSIST_DEBOUNCE_MS = 400; // store -> localStorage, off the typing path
export const SPOT_DEBOUNCE_MS = 400; // reading position -> localStorage
export const SYNC_DEBOUNCE_MS = 800; // one timer per field; changes the commit shape
export const TOAST_MS = 1700;
export const SELECT_SETTLE_MS = 10; // let the browser finalise a selection first
export const COMPOSER_REANCHOR_MS = 80; // the soft keyboard resizes after focus
export const SETTLE_EARLY_MS = 80; // and it animates in after that, so re-anchor
export const SETTLE_LATE_MS = 340; // twice
export const DRAWER_EDIT_DELAY_MS = 260; // let scrollIntoView land before the caret
export const RESTORE_SETTLE_MS = 260; // second restore pass, for late layout shift
export const PRINT_OPEN_MS = 350;
export const PRINT_RESTORE_MS = 500;

/* ---------- gesture thresholds ---------- */
export const DOUBLE_TAP_MS = 350;
export const DOUBLE_TAP_SLOP_PX = 24;

/* ---------- text size ---------- */
export const FS_MIN = 15;
export const FS_MAX = 28;
export const FS_DEFAULT = 20;
export const FS_STEP = 1;

/* ---------- misc ---------- */
export const QUOTE_TRUNC_ACTIVE = 160;
export const QUOTE_TRUNC_RESOLVED = 120;
export const CARET_CONTEXT_CHARS = 18;
export const SEL_TOOLS_EDGE_PX = 70;
export const UNKNOWN_CHAPTER_SORT = 99;
