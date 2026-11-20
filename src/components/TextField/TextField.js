import { Field } from '../Field/Field.js';
import { Input } from '../Input/Input.js';

// Figma: Form/Text field (18:213). Field + Input.

/**
 * Text field: a labelled text input with help and error text.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.help]
 * @param {string} [props.error]
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.required]
 * @param {string} [props.labelHelp] - Tooltip help next to the label.
 * @param {string} [props.id]
 * @param {string} [props.name]
 * @param {string} [props.type]
 * @param {string} [props.value]
 * @param {string} [props.placeholder]
 * @param {string|null} [props.leadingIcon]
 * @param {string} [props.autocomplete]
 * @param {(event: Event) => void} [props.onInput]
 * @returns {HTMLDivElement} The field; the native input is `field.control`.
 */
export function TextField({ label, help, error, disabled = false, required = false, labelHelp, ...inputProps } = {}) {
  const control = Input({ ...inputProps, invalid: Boolean(error), disabled, required });
  return Field({ label, help, error, disabled, required, labelHelp, control });
}
