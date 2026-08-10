import {
  btnMenu,
  btnMode,
  buildInfo,
  btnSettings,
  btnSmaller,
  btnBigger,
  drawer,
  settings,
  scrim,
  selTools,
  noteCount,
} from "./dom.js";
import { svg } from "./icons.js";
import * as popover from "./popover.js";
import * as render from "./render.js";
import * as position from "./position.js";
import * as store from "./store.js";
import { chapters } from "./manuscript.js";
import { readRaw, writeRaw, writeJSON } from "./storage.js";
import { toast } from "./toast.js";
import { KEY_FS, KEY_THEME, FS_MIN, FS_MAX, FS_DEFAULT, FS_STEP, APP_VERSION } from "./config.js";

/* The app shell: the top bar, the drawer, the settings popover, text size,
   theme, and the global keyboard handler. */

const drawerOpenListeners = [];
/** panels.js registers here rather than being imported, which would be a cycle. */
export function onDrawerOpen(fn) {
  drawerOpenListeners.push(fn);
}

export function openDrawer() {
  closeAll();
  for (const fn of drawerOpenListeners) fn();
  drawer.classList.add("open");
  drawer.removeAttribute("inert");
  drawer.setAttribute("aria-hidden", "false");
  btnMenu.setAttribute("aria-expanded", "true");
  scrim.classList.add("open");
}

export function openSettings() {
  closeAll();
  settings.classList.add("open");
  btnSettings.setAttribute("aria-expanded", "true");
  scrim.classList.add("open");
}

export function closeAll() {
  drawer.classList.remove("open");
  drawer.setAttribute("inert", "");
  drawer.setAttribute("aria-hidden", "true");
  settings.classList.remove("open");
  scrim.classList.remove("open");
  btnMenu.setAttribute("aria-expanded", "false");
  btnSettings.setAttribute("aria-expanded", "false");
  popover.closeCurrent();
  selTools.classList.remove("show");
}

function gotoChapter(i) {
  if (i < 0 || i >= chapters.length) return;
  closeAll();
  chapters[i].el.scrollIntoView({ block: "start" });
}

/* ---------- text size ---------- */

/* Written JSON-encoded, read with parseInt. The asymmetry is real: the value on
   disk is `20`, and parseInt("20") and parseInt('"20"') are not the same thing.
   Making this uniform would fail to read the author's stored size. */
let fs = parseInt(readRaw(KEY_FS) || 0, 10) || FS_DEFAULT;

function applyFs() {
  document.body.style.setProperty("--fs", fs + "px");
}

function stepFs(delta) {
  fs = Math.max(FS_MIN, Math.min(FS_MAX, fs + delta));
  applyFs();
  writeJSON(KEY_FS, fs);
  position.invalidateTops();
  position.layoutTicks();
}

/* ---------- theme ---------- */

let theme = readRaw(KEY_THEME, "auto") || "auto";

function applyTheme() {
  if (theme === "auto") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", theme);
  for (const b of document.querySelectorAll("[data-theme-set]")) {
    b.classList.toggle("active", b.getAttribute("data-theme-set") === theme);
  }
  /* The two theme-color metas are media-switched on prefers-color-scheme, so a
     light-forced reader on a dark system used to keep a dark status bar. Point
     the forced theme's colour at both. */
  const light = document.querySelector('meta[name="theme-color"][media*="light"]');
  const dark = document.querySelector('meta[name="theme-color"][media*="dark"]');
  if (light && dark) {
    if (theme === "light") dark.setAttribute("content", "#efe9dc");
    else if (theme === "dark") light.setAttribute("content", "#15120d");
    else {
      light.setAttribute("content", "#efe9dc");
      dark.setAttribute("content", "#15120d");
    }
  }
}

/* ---------- badge ---------- */

function updateCount() {
  const c = store.counts();
  const n = c.notes + c.revs;
  noteCount.textContent = n;
  noteCount.classList.toggle("show", n > 0);
}

/* ---------- wiring ---------- */

export function init() {
  btnMenu.innerHTML = svg("menu");
  btnMenu.appendChild(noteCount);
  btnSettings.innerHTML = svg("settings");
  btnMenu.addEventListener("click", () =>
    drawer.classList.contains("open") ? closeAll() : openDrawer()
  );
  btnSettings.addEventListener("click", () =>
    settings.classList.contains("open") ? closeAll() : openSettings()
  );
  scrim.addEventListener("click", closeAll);

  btnMode.addEventListener("click", () => {
    render.setMode(render.getMode() === "read" ? "review" : "read");
    toast(
      render.getMode() === "read"
        ? "Reading — the book as edited. Tap the pill to make changes."
        : "Reviewing — tap a paragraph twice to edit it."
    );
  });

  /* The pill shows the mode you are IN, and the participle is doing real work
     there: a button reading "Read" is indistinguishable from a button that
     PERFORMS reading, so a reader in Read mode saw "Read" and reasonably
     concluded that editing was simply broken. "Reading" can only be a state. */
  render.onModeChange((mode) => {
    if (mode === "read") {
      btnMode.innerHTML = svg("book") + "<span>Reading</span>";
      btnMode.setAttribute("aria-label", "Reading mode. Switch to review mode to edit.");
      btnMode.title = "Reading mode — switch to Review to make changes";
      popover.closeCurrent();
      selTools.classList.remove("show");
    } else {
      btnMode.innerHTML = svg("pen") + "<span>Reviewing</span>";
      btnMode.setAttribute("aria-label", "Review mode. Switch to reading mode.");
      btnMode.title = "Review mode — tap a paragraph twice to edit it";
    }
  });

  applyFs();
  showBuild();
  btnSmaller.innerHTML = svg("aDown");
  btnBigger.innerHTML = svg("aUp");
  btnBigger.addEventListener("click", () => stepFs(FS_STEP));
  btnSmaller.addEventListener("click", () => stepFs(-FS_STEP));

  document.querySelector('[data-theme-set="light"]').innerHTML = svg("sun", "sm");
  document.querySelector('[data-theme-set="dark"]').innerHTML = svg("moon", "sm");
  for (const b of document.querySelectorAll("[data-theme-set]")) {
    b.addEventListener("click", () => {
      theme = b.getAttribute("data-theme-set");
      writeRaw(KEY_THEME, theme);
      applyTheme();
    });
  }
  applyTheme();

  store.subscribe(updateCount);
  updateCount();

  document.addEventListener("keydown", (e) => {
    const t = e.target;
    // An open editor or composer owns Escape: it discards.
    if (e.key === "Escape" && popover.current()) {
      popover.closeCurrent();
      return;
    }
    if (t && (t.tagName === "TEXTAREA" || t.tagName === "INPUT" || t.isContentEditable)) {
      if (e.key === "Escape") t.blur();
      return;
    }
    if (e.key === "Escape") {
      closeAll();
      return;
    }
    /* Chapter navigation. This used to be inert: currentChapterIndex() compared
       chapters[i].id against a position object that never carried an `id`, so it
       always returned 0 — ArrowRight always jumped to chapter one and ArrowLeft
       did nothing. It now uses the same binary search the TOC highlight uses. */
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const here = position.activeChapterIndex(position.chapterScrollMargin() + 4);
    gotoChapter(e.key === "ArrowRight" ? here + 1 : here - 1);
  });
}

/* ---------- the build stamp ----------
   Three days of this session were spent on "is the fix live yet?", and the
   honest answer was never available from inside the app: a service worker
   serves modules cache-first, so a page can be running yesterday's code with
   today's file sitting on the server. Printing our own constant alone would not
   have helped — that constant IS the old code when the old code is what is
   running. So ask the worker which cache it is actually serving from, and when
   the two disagree, say so plainly and say what to do about it. */
function showBuild() {
  if (!buildInfo) return;
  buildInfo.textContent = "Reader " + APP_VERSION.replace(/^ardenmoor-/, "");
  const nav = navigator.serviceWorker;
  if (!nav || !nav.controller) return;
  let done = false;
  const settle = (v) => {
    if (done) return;
    done = true;
    if (!v || v === APP_VERSION) return;
    buildInfo.textContent =
      "Reader " + APP_VERSION.replace(/^ardenmoor-/, "") +
      " — serving " + String(v).replace(/^ardenmoor-/, "") + ". Close the app fully and reopen to update.";
  };
  try {
    const ch = new MessageChannel();
    const t = setTimeout(() => settle(null), 1500);
    ch.port1.onmessage = (e) => {
      clearTimeout(t);
      settle(e.data && e.data.version);
    };
    nav.controller.postMessage({ q: "version" }, [ch.port2]);
  } catch {}
}
