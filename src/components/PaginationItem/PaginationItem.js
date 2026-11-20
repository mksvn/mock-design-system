import { createIcon } from '../../icons/index.js';

// Figma: Navigation/Pagination item (18:774). 48px square link, 8px radius, paragraph md/medium.
// Default Neutral/700 on white, hover Primary/100, current white on Primary/700, disabled text
// Text/disabled. Also used for Pagination's previous/next links (with an icon).

const BASE_CLASSES = [
  'inline-flex size-900 items-center justify-center rounded-lg font-body text-paragraph-md-medium',
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-700',
].join(' ');

const STATE_CLASSES = {
  default: 'bg-neutral-white text-neutral-700 hover:bg-primary-100',
  current: 'bg-primary-700 text-neutral-white',
  disabled: 'cursor-not-allowed bg-neutral-white text-text-disabled',
};

/**
 * One page link.
 *
 * @param {object} props
 * @param {string} [props.label] - Visible text (page number). Omit when using `icon`.
 * @param {string} [props.icon] - Icon name instead of a label (previous/next).
 * @param {string} [props.ariaLabel] - Accessible name, e.g. "Page 3" or "Previous page".
 * @param {string} [props.href]
 * @param {boolean} [props.current] - Sets aria-current="page".
 * @param {boolean} [props.disabled] - No href, aria-disabled="true".
 * @param {string} [props.rel] - e.g. "prev" / "next".
 * @returns {HTMLAnchorElement}
 */
export function PaginationItem({ label, icon, ariaLabel, href, current = false, disabled = false, rel } = {}) {
  const state = disabled ? 'disabled' : current ? 'current' : 'default';
  const link = document.createElement('a');
  link.className = `${BASE_CLASSES} ${STATE_CLASSES[state]}`;

  if (disabled) {
    // An <a> without href is not a link; keep the link role and mark it disabled.
    link.setAttribute('role', 'link');
    link.setAttribute('aria-disabled', 'true');
  } else if (href != null) {
    link.href = href;
  }
  if (current) link.setAttribute('aria-current', 'page');
  if (ariaLabel) link.setAttribute('aria-label', ariaLabel);
  if (rel && !disabled) link.rel = rel;

  if (icon) {
    const svg = createIcon(icon);
    svg.setAttribute('class', `size-500 ${disabled ? 'text-icons-disabled' : 'text-icons-default'}`);
    link.append(svg);
  } else {
    link.textContent = label ?? '';
  }
  return link;
}
