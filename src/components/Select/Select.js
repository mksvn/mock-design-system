import { Field } from '../Field/Field.js';
import { controlBoxClasses, CONTROL_CLASSES, boxIcon } from '../Input/Input.js';
import { uniqueId } from '../../utils/id.js';

// Figma: Form/Select (18:634). Field + a native <select> in the shared control box, with a
// 20px chevron-down at the end. The select and chevron share one grid cell so clicks on the
// chevron reach the select.

// Right padding leaves room for the chevron (20px icon + 8px gap; nearest token 32px).
const SELECT_CLASSES = `${CONTROL_CLASSES} col-start-1 row-start-1 w-full cursor-pointer appearance-none pr-700`;

function selectBox({ id, name, options, value, placeholder, disabled, invalid, required, onChange }) {
  const select = document.createElement('select');
  select.id = id;
  select.className = SELECT_CLASSES;
  if (name) select.name = name;
  select.disabled = Boolean(disabled);
  select.required = Boolean(required);
  if (invalid) select.setAttribute('aria-invalid', 'true');

  if (placeholder) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = placeholder;
    option.disabled = true;
    select.append(option);
  }
  for (const item of options) {
    const { value: optionValue, label } = typeof item === 'string' ? { value: item, label: item } : item;
    const option = document.createElement('option');
    option.value = optionValue;
    option.textContent = label;
    select.append(option);
  }
  select.value = value ?? '';

  // While the placeholder is showing, use the placeholder color (Neutral/600).
  const syncPlaceholder = () => select.classList.toggle('text-neutral-600', select.value === '' && !select.disabled);
  syncPlaceholder();
  select.addEventListener('change', syncPlaceholder);
  if (onChange) select.addEventListener('change', onChange);

  const chevron = boxIcon('chevron-down', disabled ? 'text-icons-disabled' : 'text-icons-default');
  chevron.classList.add('pointer-events-none', 'col-start-1', 'row-start-1', 'justify-self-end');

  const stack = document.createElement('div');
  stack.className = 'grid flex-1 items-center';
  stack.append(select, chevron);

  const box = document.createElement('div');
  box.className = controlBoxClasses({ invalid, disabled });
  box.append(stack);
  return box;
}

/**
 * Select: a labelled native dropdown with help and error text.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {Array<string|{ value: string, label: string }>} props.options
 * @param {string} [props.value]
 * @param {string} [props.placeholder] - Shown until a value is chosen.
 * @param {string} [props.help]
 * @param {string} [props.error]
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.required]
 * @param {string} [props.labelHelp]
 * @param {string} [props.id]
 * @param {string} [props.name]
 * @param {(event: Event) => void} [props.onChange]
 * @returns {HTMLDivElement} The field; the native select is `field.control`.
 */
export function Select({
  label,
  options = [],
  value,
  placeholder,
  help,
  error,
  disabled = false,
  required = false,
  labelHelp,
  id = uniqueId('select'),
  name,
  onChange,
} = {}) {
  const control = selectBox({ id, name, options, value, placeholder, disabled, invalid: Boolean(error), required, onChange });
  return Field({ label, help, error, disabled, required, labelHelp, control });
}
