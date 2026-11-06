// Keeps keyboard focus inside an open modal dialog.
// Browsers let Tab leave a modal <dialog> for the address bar once it passes the last control,
// and Esc then no longer reaches the page. This makes Tab wrap from the last control back to the
// first (the Close button), Shift+Tab wrap the other way, and Esc close from any control inside.
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function trapFocus(dialog: HTMLDialogElement) {
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      dialog.close();
      return;
    }
    if (e.key !== 'Tab') return;
    const items = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (el) => el.offsetParent !== null || el === document.activeElement,
    );
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || !dialog.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || !dialog.contains(active))) {
      e.preventDefault();
      first.focus();
    }
  });
}
