import { createIcon } from '../../icons/index.js';

// Figma: Navigation/Accordion (18:804). Native <details>/<summary>, no JS.
// 16px padding, 8px radius, Neutral/300 border; question paragraph md/medium, answer paragraph sm,
// 16px between them. The chevron rotates when open instead of swapping icons.

/**
 * Accordion: one question that expands to show its answer.
 *
 * @param {object} props
 * @param {string} props.question
 * @param {string} props.answer
 * @param {boolean} [props.open]
 * @param {string} [props.name] - Accordions sharing a name open one at a time (native).
 * @returns {HTMLDetailsElement}
 */
export function Accordion({ question, answer, open = false, name } = {}) {
  const details = document.createElement('details');
  details.className = 'group rounded-lg border border-neutral-300 bg-surface-default p-400 font-body';
  details.open = Boolean(open);
  if (name) details.name = name;

  const summary = document.createElement('summary');
  summary.className = [
    'flex cursor-pointer list-none items-center gap-200 rounded-md text-paragraph-md-medium text-text-body',
    'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-700',
  ].join(' ');
  const text = document.createElement('span');
  text.className = 'min-w-0 flex-1';
  text.textContent = question ?? '';
  const chevron = createIcon('chevron-down');
  chevron.setAttribute('class', 'size-500 shrink-0 text-icons-default group-open:rotate-180 motion-safe:transition-transform');
  summary.append(text, chevron);

  const body = document.createElement('div');
  body.className = 'mt-400 text-paragraph-sm text-text-body';
  body.textContent = answer ?? '';

  details.append(summary, body);
  return details;
}
