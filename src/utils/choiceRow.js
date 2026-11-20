// Shared row for Checkbox, Radio and Switch (Figma 18:480, 18:520, 18:560):
// a 48px label row with the control and its text. Clicking anywhere on the row toggles the
// control. Focus is drawn on the whole row (Primary/100 fill + 2px Primary/700 inside border),
// so the native input hides its own outline.

const ROW_CLASSES = [
  'flex min-h-900 cursor-pointer items-center gap-200 rounded-lg px-200',
  'font-body text-paragraph-md text-text-body',
  'has-focus-visible:bg-primary-100 has-focus-visible:outline-2 has-focus-visible:-outline-offset-2 has-focus-visible:outline-primary-700',
  'has-disabled:cursor-not-allowed has-disabled:text-text-disabled',
].join(' ');

/** Classes every choice input shares: stacked in the indicator grid, no native outline. */
export const CHOICE_INPUT_CLASSES =
  'peer col-start-1 row-start-1 appearance-none outline-hidden cursor-pointer disabled:cursor-not-allowed';

/** Classes for marks drawn over the input (check, dot, thumb). */
export const CHOICE_MARK_CLASSES = 'pointer-events-none col-start-1 row-start-1';

/**
 * @param {object} parts
 * @param {HTMLInputElement} parts.input
 * @param {Element[]} [parts.marks] - Elements drawn over the input.
 * @param {string} parts.label
 * @returns {HTMLLabelElement} The row; the native input is `row.input`.
 */
export function choiceRow({ input, marks = [], label }) {
  const indicator = document.createElement('span');
  indicator.className = 'grid shrink-0 place-items-center';
  indicator.append(input, ...marks);

  const text = document.createElement('span');
  text.textContent = label ?? '';

  const row = document.createElement('label');
  row.className = ROW_CLASSES;
  row.append(indicator, text);
  row.input = input;
  return row;
}

/** Applies the common native attributes to a choice input. */
export function applyChoiceProps(input, { id, name, value, checked, disabled, required, onChange }) {
  if (id) input.id = id;
  if (name) input.name = name;
  if (value != null) input.value = value;
  input.checked = Boolean(checked);
  input.disabled = Boolean(disabled);
  input.required = Boolean(required);
  if (onChange) input.addEventListener('change', onChange);
}
