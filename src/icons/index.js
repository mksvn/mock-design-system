// Inline SVG strings for the Lucide icons this design system uses.
// Source: lucide-static v1.76.0 (https://lucide.dev), ISC License,
// Copyright (c) Lucide Contributors. Add icons here only when a component needs them.
//
// Every icon is 24x24, stroke-width 2, stroke="currentColor" (so it takes the
// surrounding text color) and aria-hidden="true" (decorative).

const svg = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;

export const icons = {
  'badge-plus': svg(
    '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/>',
  ),
  'arrow-big-right': svg(
    '<path d="M13.207 19.793a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707z"/>',
  ),
  'loader-circle': svg('<path d="M21 12a9 9 0 1 1-6.219-8.56"/>'),
  'circle-alert': svg('<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>'),
  'mail': svg('<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>'),
  'check': svg('<path d="M20 6 9 17l-5-5"/>'),
  'minus': svg('<path d="M5 12h14"/>'),
  'circle-check': svg('<circle cx="12" cy="12" r="10"/><path d="m16 9-5.5 5.5L8 12"/>'),
  'triangle-alert': svg('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>'),
  'info': svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'),
  'chevron-down': svg('<path d="m6 9 6 6 6-6"/>'),
  'chevron-left': svg('<path d="m15 18-6-6 6-6"/>'),
  'chevron-right': svg('<path d="m9 18 6-6-6-6"/>'),
  'circle-help': svg('<circle cx="12" cy="12" r="10"/><path d="M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5"/><path d="M12 17h.01"/>'),
};

export const iconNames = Object.keys(icons);

/** Parse an icon into an <svg> element. Throws for unknown names so typos fail loudly. */
export function createIcon(name) {
  const markup = icons[name];
  if (!markup) {
    throw new Error(`Unknown icon "${name}". Available icons: ${iconNames.join(', ')}.`);
  }
  const template = document.createElement('template');
  template.innerHTML = markup;
  return template.content.firstElementChild;
}
