import { Field } from '../Field/Field.js';
import { controlBoxClasses, CONTROL_CLASSES } from '../Input/Input.js';
import { uniqueId } from '../../utils/id.js';

// Figma: Form/Textarea (18:697). Field + a native <textarea> in the shared control box
// (top-aligned). Height comes from `rows` (4 rows ≈ Figma's 112px box).

/**
 * Textarea: a labelled multi-line text input with help and error text.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.value]
 * @param {string} [props.placeholder]
 * @param {number} [props.rows]
 * @param {string} [props.help]
 * @param {string} [props.error]
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.required]
 * @param {string} [props.labelHelp]
 * @param {string} [props.id]
 * @param {string} [props.name]
 * @param {(event: Event) => void} [props.onInput]
 * @returns {HTMLDivElement} The field; the native textarea is `field.control`.
 */
export function Textarea({
  label,
  value,
  placeholder,
  rows = 4,
  help,
  error,
  disabled = false,
  required = false,
  labelHelp,
  id = uniqueId('textarea'),
  name,
  onInput,
} = {}) {
  const textarea = document.createElement('textarea');
  textarea.id = id;
  textarea.rows = rows;
  textarea.className = `${CONTROL_CLASSES} resize-y`;
  if (name) textarea.name = name;
  if (value != null) textarea.value = value;
  if (placeholder) textarea.placeholder = placeholder;
  if (onInput) textarea.addEventListener('input', onInput);

  const box = document.createElement('div');
  box.className = controlBoxClasses({ invalid: Boolean(error), disabled, multiline: true });
  box.append(textarea);

  return Field({ label, help, error, disabled, required, labelHelp, control: box });
}
