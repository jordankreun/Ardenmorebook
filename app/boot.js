import * as store from "./store.js";
import * as manuscript from "./manuscript.js";
import * as render from "./render.js";
import * as position from "./position.js";
import * as panels from "./panels.js";
import * as shell from "./shell.js";
import * as gestures from "./gestures.js";
import { openComposer } from "./composer.js";
import { openEditor } from "./editor.js";
import { SYNC } from "./sync.js";
import { verifyApplied } from "./verify.js";
import { whenIdle } from "./schedule.js";
import { esc } from "./text.js";
import { book } from "./dom.js";
import { KEY_PROGRESS } from "./config.js";

/* Entry point. Nothing imports this file; it only consumes.

   The whole module graph is static — there is no dynamic import() anywhere in
   app/. The service worker calls skipWaiting() and clients.claim(), so a running
   page can be adopted by a newer worker mid-session; a late dynamic import would
   then be served from the NEW cache while the page runs OLD code. A fully static
   graph makes that version skew impossible. */

/* ---------- wiring ---------- */

store.load();
// The only route from a user action to the network. adopt() cannot reach it.
store.setPusher((field) => SYNC.push(field));
render.setDotActions(openComposer, (para) => openEditor(para));

shell.init();
panels.init();
gestures.init();
// Registered after shell's, so the mode pill updates before inline editing is
// re-evaluated — the order the old applyMode() ran them in.
render.onModeChange(gestures.applyInline);

/* Watched by the failure surface in reader.html. Set AFTER the synchronous
   wiring, not before it: an exception thrown inside shell/panels/gestures init
   aborts module evaluation, and a flag set at the top would have vouched for
   code that never ran, leaving a permanently blank app with no message. Placed
   here it still detects a module-graph 404, and it now also catches a boot-time
   throw. */
window.__ardenmoorBooted = true;

/* A record changed: touch exactly the paragraph(s) carrying its key. A bulk
   change (a sync merge) means "reconsider everything", which the renderer's memo
   turns into a comparison pass rather than a re-render — and it waits until the
   author is out of the editor, so the old freeze about a second after every save
   simply does not happen. */
store.subscribe((change) => {
  if (change.type === "bulk") {
    render.deferWhileEditing(() => render.repaintAll());
    return;
  }
  for (const key of change.keys) {
    for (const para of manuscript.parasByKey.get(key) || []) {
      render.renderPara(para, { stable: true });
    }
  }
  /* A spanning revision hides the paragraphs after its anchor, so writing or
     deleting one changes paragraphs that do NOT carry its key and would
     otherwise never be repainted. Reverting from the edit dot left them hidden:
     the record was gone and the text stayed off the page. Repaint whatever the
     recompute says actually changed, which is usually nothing at all. */
  for (const para of render.recomputeAbsorbed()) {
    render.renderPara(para, { force: true });
  }
});

render.setMode(render.getMode());

/* ---------- lifecycle ---------- */

// We restore the reading spot ourselves; stop the browser from also trying to.
if ("scrollRestoration" in history) {
  try {
    history.scrollRestoration = "manual";
  } catch {}
}
window.addEventListener("scroll", position.onScroll, { passive: true });
window.addEventListener("resize", () => {
  position.invalidateTops();
  position.onScroll();
  position.layoutTicks();
});
/* Mobile Safari and installed PWAs often never fire beforeunload, so both the
   reading spot and any debounced record write are flushed the instant the app is
   backgrounded or closed. */
function flushEverything() {
  position.flushSpot();
  store.flushNow();
}
/* Going away: get everything on disk. Coming back: get everything from the
   server. Only the first half of that existed, which is why another device's
   notes never arrived without a relaunch. SYNC.refresh() throttles itself. */
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") flushEverything();
  else SYNC.refresh();
});
window.addEventListener("pagehide", flushEverything);
// The network coming back is an explicit signal, so it bypasses the throttle.
window.addEventListener("online", () => SYNC.refresh(true));

if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
  window.addEventListener("load", () => {
    whenIdle(() => navigator.serviceWorker.register("sw.js").catch(() => {}));
  });
}

/* ---------- the load chain ---------- */

manuscript
  .load()
  .then(() => {
    render.mount();
    // Now that the paragraph model exists, resolve anything already applied
    // upstream. This is O(revisions) and repaints only what changed.
    verifyApplied();
    panels.buildToc();
    position.invalidateTops();
    position.layoutTicks();
    whenIdle(() => panels.updateBookHint());

    // A #ch-N in the address bar wins over the saved position.
    const target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (target) target.scrollIntoView();
    else position.restoreSpot(position.loadPos(KEY_PROGRESS));

    position.onScroll();
    /* AFTER the position is restored, never before: containChapters() measures
       every chapter and pins its true height, and it must measure the layout
       the reader is actually going to see. From here on a forced layout costs
       the chapter in view rather than all thirty-seven, which is what makes the
       inline editor open in a frame instead of half a second. */
    render.containChapters();
    try {
      performance.mark("mounted");
    } catch {}
    SYNC.init();
  })
  .catch((err) => {
    book.innerHTML =
      '<p id="status">Could not load the manuscript.<br><br><small>' +
      esc(String((err && err.message) || err)) +
      "</small><br><br>This reader loads the Markdown live, so open it from a web host (Vercel, GitHub Pages) or a local server, not a <code>file://</code> path.</p>";
  });
