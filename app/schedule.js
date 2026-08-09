/* Frame scheduling and idle work.

   Everything geometric in the app goes through measure()/mutate(). The old code
   read offsetWidth, wrote a style, then read a rect again inside the same task —
   three forced synchronous layouts per keystroke, over a 566 KB justified,
   hyphenated document. This module makes that shape impossible to write. */

let frame = 0;
let running = false;
const reads = new Set();
const writes = [];

/* One frame = every queued read, then every queued write. A read issued during
   the read phase joins the same phase; a read issued during the WRITE phase is
   pushed to the next frame, because running it here is the forced layout we are
   removing. */
function run() {
  frame = 0;
  running = true;
  const r = [...reads];
  reads.clear();
  for (const fn of r) {
    try {
      fn();
    } catch {}
  }
  const w = writes.splice(0);
  for (const fn of w) {
    try {
      fn();
    } catch {}
  }
  running = false;
  if (reads.size || writes.length) schedule();
}

function schedule() {
  if (frame || running) return;
  frame = requestAnimationFrame(run);
}

/** Queue a layout-reading callback. Deduplicated by function identity. */
export function measure(fn) {
  reads.add(fn);
  schedule();
}

/** Queue a layout-writing callback. Runs after every read queued this frame. */
export function mutate(fn) {
  writes.push(fn);
  schedule();
}

/* window.scrollBy from inside the editor fires a scroll event, which used to
   re-enter the popover's capture-phase reflow synchronously — the third forced
   layout per character. The writer marks its own scroll; the scroll listener
   consumes the mark and ignores that one event. */
let selfScroll = false;
export function markSelfScroll() {
  selfScroll = true;
}
export function consumeSelfScroll() {
  const was = selfScroll;
  selfScroll = false;
  return was;
}

/* requestIdleCallback has never shipped in WebKit. Nothing correctness-critical
   is scheduled here — only the book word count and the service-worker
   registration — so a plain timer is an honest fallback. */
export const whenIdle = window.requestIdleCallback
  ? (fn) => window.requestIdleCallback(fn, { timeout: 500 })
  : (fn) => setTimeout(() => fn({ timeRemaining: () => 8, didTimeout: true }), 120);

/** Trailing-edge debounce with a synchronous flush(), for save-on-hide paths. */
export function debounce(fn, ms) {
  let t = 0;
  const wrapped = (...args) => {
    clearTimeout(t);
    t = setTimeout(() => {
      t = 0;
      fn(...args);
    }, ms);
  };
  wrapped.flush = (...args) => {
    if (!t) return;
    clearTimeout(t);
    t = 0;
    fn(...args);
  };
  wrapped.cancel = () => {
    clearTimeout(t);
    t = 0;
  };
  return wrapped;
}
