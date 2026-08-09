/* The one place that touches localStorage.

   Every access is guarded because Safari in private browsing throws on both read
   and write. The old file had ~30 inline try/catch blocks doing this; these five
   functions replace all of them.

   Raw vs JSON is a real distinction, not an oversight: some keys hold plain
   strings on disk today (theme, mode, inline preference, the sync secret) and
   some hold JSON. See config.js. */

export function readRaw(key, fallback = null) {
  try {
    const v = localStorage.getItem(key);
    return v == null ? fallback : v;
  } catch {
    return fallback;
  }
}

export function writeRaw(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function readJSON(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function removeKey(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
}
