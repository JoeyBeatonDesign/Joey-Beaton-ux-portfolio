// Shared behaviour for the live Library app screens.

/** Toggle buttons (aria-pressed), e.g. genre chips. */
export function toggles(root: HTMLElement, selector: string, onChange?: () => void) {
  root.querySelectorAll<HTMLButtonElement>(selector).forEach((b) =>
    b.addEventListener('click', () => {
      b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
      onChange?.();
    }),
  );
}

/** A two-option radio group: click, or arrow keys to move between options. */
export function radioGroup(root: HTMLElement, selector: string) {
  const opts = [...root.querySelectorAll<HTMLButtonElement>(selector)];
  const checked = opts.findIndex((o) => o.getAttribute('aria-checked') === 'true');
  const choose = (i: number) => opts.forEach((o, j) => {
    o.setAttribute('aria-checked', String(i === j));
    o.tabIndex = i === j ? 0 : -1;
  });
  opts.forEach((o, i) => {
    o.tabIndex = i === Math.max(checked, 0) ? 0 : -1;
    o.addEventListener('click', () => choose(i));
    o.addEventListener('keydown', (e) => {
      if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) return;
      e.preventDefault();
      const next = (i + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length;
      choose(next);
      opts[next].focus();
    });
  });
}

/** Buttons that lead elsewhere in the real app: show a short note instead (announced politely). */
export function notes(root: HTMLElement) {
  const note = root.querySelector<HTMLElement>('[data-note]');
  root.querySelectorAll<HTMLButtonElement>('[data-note-text]').forEach((b) =>
    b.addEventListener('click', () => { if (note) note.textContent = b.dataset.noteText ?? ''; }),
  );
}
