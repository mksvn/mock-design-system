import { createIcon } from '../../icons/index.js';
import { choiceRow, applyChoiceProps, CHOICE_INPUT_CLASSES, CHOICE_MARK_CLASSES } from '../../utils/choiceRow.js';

// Figma: Form/Checkbox (18:480). Selected: Off, On, Mixed (indeterminate).
// 20px box, 4px radius, Neutral/600 border; checked/mixed fill Primary/700 with a white mark.

const BOX_CLASSES = [
  CHOICE_INPUT_CLASSES,
  'size-500 rounded-md border border-neutral-600 bg-neutral-white',
  'checked:border-primary-700 checked:bg-primary-700',
  'indeterminate:border-primary-700 indeterminate:bg-primary-700',
  'disabled:border-border-disabled disabled:bg-surface-disabled',
].join(' ');

const MARK_CLASSES = `${CHOICE_MARK_CLASSES} size-400 text-neutral-white peer-disabled:text-icons-disabled`;

/**
 * Checkbox with label.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.id]
 * @param {string} [props.name]
 * @param {string} [props.value]
 * @param {boolean} [props.checked]
 * @param {boolean} [props.indeterminate] - "Mixed"; set as a property (there is no HTML attribute).
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.required]
 * @param {(event: Event) => void} [props.onChange]
 * @returns {HTMLLabelElement} The row; the native input is `row.input`.
 */
export function Checkbox({ label, indeterminate = false, ...props } = {}) {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.className = BOX_CLASSES;
  applyChoiceProps(input, props);
  input.indeterminate = Boolean(indeterminate);

  const check = createIcon('check');
  check.setAttribute('class', `${MARK_CLASSES} invisible peer-checked:visible peer-indeterminate:invisible`);
  const mixed = createIcon('minus');
  mixed.setAttribute('class', `${MARK_CLASSES} invisible peer-indeterminate:visible`);

  return choiceRow({ input, marks: [check, mixed], label });
}
