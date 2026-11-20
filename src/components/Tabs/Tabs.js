import { Tab } from '../Tab/Tab.js';
import { uniqueId } from '../../utils/id.js';

// Not in Figma yet as a set (see COMPONENTS.md, Figma fixes). Built from Navigation/Tab.
// WAI-ARIA tabs pattern with automatic activation: arrow keys (and Home/End) move focus and
// select; only the selected tab is in the tab order (roving tabindex); disabled tabs are skipped.

const PANEL_CLASSES = [
  'pt-400 font-body text-paragraph-md text-text-body',
  'rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-700',
].join(' ');

/**
 * Tabs.
 *
 * @param {object} props
 * @param {string} props.label - Accessible name of the tablist.
 * @param {Array<{ label: string, content: string|Node, disabled?: boolean }>} props.tabs
 * @param {number} [props.selected] - Index of the selected tab.
 * @param {(index: number) => void} [props.onChange]
 * @returns {HTMLDivElement}
 */
export function Tabs({ label, tabs = [], selected = 0, onChange } = {}) {
  const base = uniqueId('tabs');

  const list = document.createElement('div');
  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-label', label ?? '');
  list.className = 'flex overflow-x-auto border-b border-neutral-200';

  const tabEls = [];
  const panels = [];
  tabs.forEach((item, i) => {
    const tabId = `${base}-tab-${i}`;
    const panelId = `${base}-panel-${i}`;
    const tab = Tab({ label: item.label, selected: i === selected, disabled: item.disabled, id: tabId, controls: panelId });
    tabEls.push(tab);

    const panel = document.createElement('div');
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
    panel.tabIndex = 0;
    panel.className = PANEL_CLASSES;
    panel.hidden = i !== selected;
    if (item.content instanceof Node) panel.append(item.content);
    else panel.textContent = item.content ?? '';
    panels.push(panel);
  });
  list.append(...tabEls);

  const isDisabled = (i) => tabEls[i].getAttribute('aria-disabled') === 'true';

  function select(index, { focus = false } = {}) {
    tabEls.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      panels[i].hidden = !on;
    });
    if (focus) tabEls[index].focus();
    onChange?.(index);
  }

  // Next enabled tab from `from` in direction `step`, wrapping around.
  function nextEnabled(from, step) {
    for (let n = 1; n <= tabEls.length; n++) {
      const i = (from + step * n + tabEls.length) % tabEls.length;
      if (!isDisabled(i)) return i;
    }
    return from;
  }

  list.addEventListener('click', (event) => {
    const i = tabEls.indexOf(event.target.closest('[role="tab"]'));
    if (i >= 0 && !isDisabled(i)) select(i);
  });

  list.addEventListener('keydown', (event) => {
    const current = tabEls.indexOf(document.activeElement);
    if (current < 0) return;
    let target = null;
    if (event.key === 'ArrowRight') target = nextEnabled(current, 1);
    else if (event.key === 'ArrowLeft') target = nextEnabled(current, -1);
    else if (event.key === 'Home') target = nextEnabled(-1, 1);
    else if (event.key === 'End') target = nextEnabled(tabEls.length, -1);
    if (target === null) return;
    event.preventDefault();
    select(target, { focus: true });
  });

  const root = document.createElement('div');
  root.className = 'flex flex-col';
  root.append(list, ...panels);
  root.select = select;
  return root;
}
