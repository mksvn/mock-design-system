import { Label } from '../Label/Label.js';
import { uniqueId } from '../../utils/id.js';

// Figma: the structure shared by Form/Text field (18:213), Select (18:634) and Textarea (18:697):
// label, control, supporting text, 8px apart. The supporting text is the help text, or the
// error message (Error/700) in its place when there is an error.

// Help text stays Text/body even when the field is disabled: Figma's Text/disabled (#949494)
// is 3.0:1 on white, below the 4.5:1 that help text needs (OPEN-QUESTIONS.md #22).
const SUPPORTING_CLASSES = {
  help: 'font-body text-paragraph-sm text-text-body',
  error: 'font-body text-paragraph-sm text-error-700',
};

/**
 * Help or error text below a control (shared with RadioGroup).
 * @param {{ id: string, text: string, kind: "help"|"error" }} props
 */
export function supportingText({ id, text, kind }) {
  const p = document.createElement('p');
  p.id = id;
  p.className = SUPPORTING_CLASSES[kind];
  p.textContent = text;
  return p;
}

/** Finds the native control inside a control element (Input returns a box around its <input>). */
function nativeControl(control) {
  return control.matches('input, select, textarea') ? control : control.querySelector('input, select, textarea');
}

/**
 * Field: label + control + help text + error text, with the ARIA wiring.
 * Text field, Select and Textarea are built on it.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {HTMLElement} props.control - An Input, a select box or a textarea box.
 * @param {string} [props.help] - Help text below the control (aria-describedby).
 * @param {string} [props.error] - Error message; replaces the help text, sets aria-invalid.
 * @param {boolean} [props.required]
 * @param {boolean} [props.disabled]
 * @param {string} [props.labelHelp] - Tooltip help next to the label (Label's `help`).
 * @returns {HTMLDivElement}
 */
export function Field({ label, control, help, error, required = false, disabled = false, labelHelp } = {}) {
  const native = nativeControl(control);
  if (!native) throw new Error('Field: control must be or contain an <input>, <select> or <textarea>.');
  if (!native.id) native.id = uniqueId('field');

  native.required = Boolean(required);
  native.disabled = Boolean(disabled);

  const field = document.createElement('div');
  field.className = 'flex w-full flex-col gap-200';
  field.append(Label({ text: label, htmlFor: native.id, required, help: labelHelp, disabled }), control);

  if (error) {
    const id = `${native.id}-error`;
    native.setAttribute('aria-invalid', 'true');
    native.setAttribute('aria-describedby', id);
    field.append(supportingText({ id, text: error, kind: 'error' }));
  } else if (help) {
    const id = `${native.id}-help`;
    native.setAttribute('aria-describedby', id);
    field.append(supportingText({ id, text: help, kind: 'help' }));
  }

  field.control = native;
  return field;
}
