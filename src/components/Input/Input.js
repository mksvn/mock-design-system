import { createIcon } from '../../icons/index.js';
import { uniqueId } from '../../utils/id.js';

// Figma: the "Input control" inside Form/Text field (18:213); Select (18:634) and
// Textarea (18:697) use the same box. The box is styled, the native control inside is bare.
// Hover and focus are CSS; invalid and disabled are props.

const BOX_BASE = 'flex w-full gap-200 rounded-lg border px-400 py-300 font-body text-paragraph-md';

// Focus: Figma draws a 2px Primary/700 border inside the box. A 1px border plus a 1px
// inset ring gives 2px without shifting the content.
const BOX_STATE = {
  default: [
    'border-neutral-400 bg-surface-default text-text-body',
    'not-focus-within:hover:border-neutral-600',
    'focus-within:border-primary-700 focus-within:ring-1 focus-within:ring-inset focus-within:ring-primary-700',
  ].join(' '),
  invalid: [
    'border-error-700 bg-surface-default text-text-body',
    'focus-within:ring-1 focus-within:ring-inset focus-within:ring-error-700',
  ].join(' '),
  disabled: 'cursor-not-allowed border-border-disabled bg-surface-disabled text-text-disabled',
};

/**
 * Classes for a form control box (shared by Input, Select and Textarea).
 * @param {{ invalid?: boolean, disabled?: boolean, multiline?: boolean }} state
 */
export function controlBoxClasses({ invalid = false, disabled = false, multiline = false } = {}) {
  const state = disabled ? BOX_STATE.disabled : invalid ? BOX_STATE.invalid : BOX_STATE.default;
  return `${BOX_BASE} ${multiline ? 'items-start' : 'h-900 items-center'} ${state}`;
}

/** Classes for the bare native control inside the box. */
export const CONTROL_CLASSES =
  'min-w-0 flex-1 bg-transparent outline-hidden placeholder:text-neutral-600 disabled:cursor-not-allowed disabled:placeholder:text-text-disabled';

/** A 20px icon inside a control box. */
export function boxIcon(name, colorClass) {
  const icon = createIcon(name);
  icon.classList.add('size-500', 'shrink-0', colorClass);
  return icon;
}

/** Error indicator shown at the end of an invalid control (Figma: circle-alert, Error/700). */
export function errorIndicator() {
  return boxIcon('circle-alert', 'text-error-700');
}

/**
 * Text input.
 *
 * @param {object} props
 * @param {string} [props.id] - Generated when omitted.
 * @param {string} [props.name]
 * @param {string} [props.type] - Any text-like input type (text, email, password, search…).
 * @param {string} [props.value]
 * @param {string} [props.placeholder]
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.invalid] - Sets aria-invalid="true", the error border and indicator.
 * @param {boolean} [props.required]
 * @param {string|null} [props.leadingIcon] - Icon name from src/icons.
 * @param {string} [props.autocomplete]
 * @param {string} [props.ariaLabel] - Accessible name when the input has no visible label.
 *   Inside a Field, the Field's label is used instead.
 * @param {(event: Event) => void} [props.onInput]
 * @returns {HTMLDivElement} The control box; the native input is `box.input`.
 */
export function Input({
  id = uniqueId('input'),
  name,
  type = 'text',
  value,
  placeholder,
  disabled = false,
  invalid = false,
  required = false,
  leadingIcon = null,
  autocomplete,
  ariaLabel,
  onInput,
} = {}) {
  const input = document.createElement('input');
  input.id = id;
  input.type = type;
  input.className = CONTROL_CLASSES;
  if (name) input.name = name;
  if (value != null) input.value = value;
  if (placeholder) input.placeholder = placeholder;
  if (autocomplete) input.autocomplete = autocomplete;
  if (ariaLabel) input.setAttribute('aria-label', ariaLabel);
  input.disabled = Boolean(disabled);
  input.required = Boolean(required);
  if (invalid) input.setAttribute('aria-invalid', 'true');
  if (onInput) input.addEventListener('input', onInput);

  const box = document.createElement('div');
  box.className = controlBoxClasses({ invalid, disabled });
  if (leadingIcon) box.append(boxIcon(leadingIcon, disabled ? 'text-icons-disabled' : 'text-icons-default'));
  box.append(input);
  if (invalid && !disabled) box.append(errorIndicator());

  // Clicking the padding or an icon focuses the input, as if the whole box were the field.
  box.addEventListener('mousedown', (event) => {
    if (event.target !== input && !input.disabled) {
      event.preventDefault();
      input.focus();
    }
  });

  box.input = input;
  return box;
}
