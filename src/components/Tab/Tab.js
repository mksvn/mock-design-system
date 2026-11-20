// Figma: Navigation/Tab (18:763). 48px tall, paragraph md/medium Neutral/700 text on white;
// hover Primary/100; selected has Primary/700 text and a 2px Primary/700 bottom border.
// A Tab only makes sense inside a tablist: use Tabs, which manages selection and keyboard.

const TAB_CLASSES = [
  'inline-flex h-900 shrink-0 cursor-pointer items-center justify-center px-600',
  'border-b-2 border-transparent bg-neutral-white font-body text-paragraph-md-medium text-neutral-700 whitespace-nowrap',
  'not-aria-disabled:not-aria-selected:hover:bg-primary-100',
  'aria-selected:border-primary-700 aria-selected:text-primary-700',
  'aria-disabled:cursor-not-allowed aria-disabled:text-text-disabled',
  // Inside the tab (tabs sit edge to edge), 2px Primary/700.
  'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-700',
].join(' ');

/**
 * A single tab.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {boolean} [props.selected]
 * @param {boolean} [props.disabled] - aria-disabled, so the tab stays discoverable.
 * @param {string} [props.id]
 * @param {string} [props.controls] - id of the tab panel.
 * @returns {HTMLButtonElement}
 */
export function Tab({ label, selected = false, disabled = false, id, controls } = {}) {
  const tab = document.createElement('button');
  tab.type = 'button';
  tab.setAttribute('role', 'tab');
  tab.className = TAB_CLASSES;
  tab.textContent = label ?? '';
  tab.setAttribute('aria-selected', String(Boolean(selected)));
  tab.tabIndex = selected ? 0 : -1;
  if (disabled) tab.setAttribute('aria-disabled', 'true');
  if (id) tab.id = id;
  if (controls) tab.setAttribute('aria-controls', controls);
  return tab;
}
