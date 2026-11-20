import { PaginationItem, PAGINATION_CELL_CLASSES } from '../PaginationItem/PaginationItem.js';

// Figma: Navigation/Pagination (18:776), with previous/next as real links (decision 6).
// Items 8px apart. Up to 7 pages are all shown; beyond that, first, last and the pages around
// the current one, with "…" for the gaps.

/**
 * Which pages to show: numbers and "ellipsis" markers.
 * @param {number} current
 * @param {number} total
 * @returns {Array<number|"ellipsis">}
 */
export function pageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, 'ellipsis', total];
  if (current >= total - 3) return [1, 'ellipsis', total - 4, total - 3, total - 2, total - 1, total];
  return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total];
}

/**
 * Pagination.
 *
 * @param {object} props
 * @param {number} props.current - 1-based.
 * @param {number} props.total
 * @param {(page: number) => string} [props.href] - Link for a page.
 * @param {string} [props.label] - Accessible name of the nav.
 * @returns {HTMLElement}
 */
export function Pagination({ current = 1, total = 1, href = (page) => `?page=${page}`, label = 'Pagination' } = {}) {
  const page = Math.min(Math.max(1, current), Math.max(1, total));

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', label);
  const list = document.createElement('ul');
  list.className = 'flex flex-wrap items-center gap-200';

  const item = (child) => {
    const li = document.createElement('li');
    li.append(child);
    list.append(li);
  };

  item(PaginationItem({ icon: 'chevron-left', ariaLabel: 'Previous page', href: href(page - 1), disabled: page <= 1, rel: 'prev' }));
  for (const entry of pageRange(page, total)) {
    if (entry === 'ellipsis') {
      const gap = document.createElement('span');
      gap.className = `${PAGINATION_CELL_CLASSES} text-neutral-700`;
      gap.setAttribute('aria-hidden', 'true');
      gap.textContent = '…';
      item(gap);
    } else {
      item(PaginationItem({ label: String(entry), ariaLabel: `Page ${entry}`, href: href(entry), current: entry === page }));
    }
  }
  item(PaginationItem({ icon: 'chevron-right', ariaLabel: 'Next page', href: href(page + 1), disabled: page >= total, rel: 'next' }));

  nav.append(list);
  return nav;
}
