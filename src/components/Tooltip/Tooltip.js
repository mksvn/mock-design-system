import { uniqueId } from '../../utils/id.js';

// Figma: Overlay/Tooltip (18:921).
// A manual popover (top layer) shown on hover and on keyboard focus of its trigger,
// hidden on Escape, blur and pointer leave. The trigger is described by the tooltip.

const TOOLTIP_CLASSES = [
  // Undo the popover UA styles (inset 0 + margin auto); position is set on show.
  'fixed inset-auto m-0 overflow-visible border-0',
  // 8/12px padding, 4px radius, Neutral/900 background, paragraph sm on-action text.
  'max-w-xs rounded-md bg-neutral-900 px-300 py-200',
  'font-body text-paragraph-sm text-text-on-action',
].join(' ');

// Gap between trigger and tooltip, and the minimum distance from the viewport edge
// (both Scale/200, 8px).
const GAP = 8;

function position(trigger, tip) {
  const anchor = trigger.getBoundingClientRect();
  const { width, height } = tip.getBoundingClientRect();
  const above = anchor.top - GAP - height;
  const top = above >= GAP ? above : anchor.bottom + GAP;
  const centered = anchor.left + anchor.width / 2 - width / 2;
  const left = Math.min(Math.max(centered, GAP), window.innerWidth - width - GAP);
  tip.style.top = `${Math.round(top)}px`;
  tip.style.left = `${Math.round(left)}px`;
}

/**
 * Tooltip attached to a trigger element.
 *
 * @param {object} props
 * @param {string} props.text - Tooltip text; also the trigger's accessible description.
 * @param {HTMLElement} props.trigger - A focusable element (usually a button).
 * @returns {HTMLSpanElement} A wrapper containing the trigger and its tooltip.
 */
export function Tooltip({ text, trigger }) {
  const tip = document.createElement('div');
  tip.id = uniqueId('tooltip');
  tip.setAttribute('role', 'tooltip');
  tip.popover = 'manual';
  tip.className = TOOLTIP_CLASSES;
  tip.textContent = text ?? '';

  const describedBy = trigger.getAttribute('aria-describedby');
  trigger.setAttribute('aria-describedby', describedBy ? `${describedBy} ${tip.id}` : tip.id);

  const onKeydown = (event) => {
    if (event.key === 'Escape') hide();
  };

  function show() {
    if (tip.matches(':popover-open')) return;
    tip.showPopover();
    position(trigger, tip);
    document.addEventListener('keydown', onKeydown);
  }

  function hide() {
    if (!tip.matches(':popover-open')) return;
    tip.hidePopover();
    document.removeEventListener('keydown', onKeydown);
  }

  // Hide after the pointer leaves, unless it moved onto the tooltip (or back to the trigger),
  // so the tooltip text can be hovered (WCAG 1.4.13).
  const hideUnlessHovered = () =>
    setTimeout(() => {
      if (!trigger.matches(':hover') && !tip.matches(':hover') && !trigger.matches(':focus-visible')) hide();
    }, 100);

  trigger.addEventListener('pointerenter', show);
  trigger.addEventListener('pointerleave', hideUnlessHovered);
  tip.addEventListener('pointerleave', hideUnlessHovered);
  trigger.addEventListener('focus', () => {
    if (trigger.matches(':focus-visible')) show();
  });
  trigger.addEventListener('blur', hide);

  const wrapper = document.createElement('span');
  wrapper.className = 'inline-flex';
  wrapper.append(trigger, tip);
  wrapper.show = show;
  wrapper.hide = hide;
  return wrapper;
}
