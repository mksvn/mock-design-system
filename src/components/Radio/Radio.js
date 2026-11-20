import { choiceRow, applyChoiceProps, CHOICE_INPUT_CLASSES, CHOICE_MARK_CLASSES } from '../../utils/choiceRow.js';

// Figma: Form/Radio (18:520). 20px circle, Neutral/600 border; selected has a Primary/700
// border and an 8px Primary/700 dot. Group radios with RadioGroup (or the same `name`).

const CIRCLE_CLASSES = [
  CHOICE_INPUT_CLASSES,
  'size-500 rounded-full border border-neutral-600 bg-neutral-white',
  'checked:border-primary-700',
  'disabled:border-border-disabled disabled:bg-surface-disabled disabled:checked:bg-neutral-white',
].join(' ');

const DOT_CLASSES = `${CHOICE_MARK_CLASSES} size-200 rounded-full bg-primary-700 invisible peer-checked:visible peer-disabled:bg-icons-disabled`;

/**
 * Radio button with label.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.name - Radios with the same name form a group.
 * @param {string} props.value
 * @param {string} [props.id]
 * @param {boolean} [props.checked]
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.required]
 * @param {(event: Event) => void} [props.onChange]
 * @returns {HTMLLabelElement} The row; the native input is `row.input`.
 */
export function Radio({ label, ...props } = {}) {
  const input = document.createElement('input');
  input.type = 'radio';
  input.className = CIRCLE_CLASSES;
  applyChoiceProps(input, props);

  const dot = document.createElement('span');
  dot.className = DOT_CLASSES;

  return choiceRow({ input, marks: [dot], label });
}
