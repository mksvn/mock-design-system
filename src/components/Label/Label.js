import { createIcon } from '../../icons/index.js';
import { Tooltip } from '../Tooltip/Tooltip.js';

// Figma: Form/Label (18:103). Paragraph md/medium Text/headings, Error/700 "*" when required,
// 4px gap. The optional help is a focusable 16px circle-help button with a Tooltip.

/** Label text classes, shared with RadioGroup's <legend>. */
export const LABEL_TEXT_CLASSES = 'font-body text-paragraph-md-medium';
export const LABEL_COLOR = { enabled: 'text-text-headings', disabled: 'text-text-disabled' };

/** The required "*". Hidden from screen readers: the control's `required` is announced instead. */
export function requiredMark() {
  const mark = document.createElement('span');
  mark.className = 'ml-100 text-error-700';
  mark.setAttribute('aria-hidden', 'true');
  mark.textContent = '*';
  return mark;
}

function helpButton(text, disabled) {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', 'More info');
  // 24px hit area around the 16px icon; the negative margin keeps the 16px layout from Figma.
  button.className = [
    '-m-100 inline-flex size-600 shrink-0 cursor-pointer items-center justify-center rounded-full',
    disabled ? 'text-icons-disabled' : 'text-icons-default',
    'focus-visible:outline-2 focus-visible:outline-primary-700',
  ].join(' ');
  const icon = createIcon('circle-help');
  icon.setAttribute('class', 'size-400');
  button.append(icon);
  return Tooltip({ text, trigger: button });
}

/**
 * Form label.
 *
 * @param {object} props
 * @param {string} props.text
 * @param {string} props.htmlFor - id of the control.
 * @param {boolean} [props.required] - Shows "*" (the control itself carries `required`).
 * @param {string} [props.help] - Extra help in a tooltip behind a "More info" button. No icon when omitted.
 * @param {boolean} [props.disabled]
 * @param {string} [props.id]
 * @returns {HTMLDivElement} A row containing the <label> (and the help button).
 */
export function Label({ text, htmlFor, required = false, help, disabled = false, id } = {}) {
  const label = document.createElement('label');
  label.className = `${LABEL_TEXT_CLASSES} ${disabled ? LABEL_COLOR.disabled : LABEL_COLOR.enabled}`;
  if (htmlFor) label.htmlFor = htmlFor;
  if (id) label.id = id;
  label.append(text ?? '');
  if (required) label.append(requiredMark());

  const row = document.createElement('div');
  row.className = 'flex items-center gap-100';
  row.append(label);
  if (help) row.append(helpButton(help, disabled));
  return row;
}
