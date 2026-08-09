import { toastEl } from "./dom.js";
import { TOAST_MS } from "./config.js";

let timer = 0;

/** One shared element, one timer; every call resets it. */
export function toast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(() => toastEl.classList.remove("show"), TOAST_MS);
}
