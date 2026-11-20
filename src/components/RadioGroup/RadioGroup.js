import { Radio } from '../Radio/Radio.js';
import { LABEL_TEXT_CLASSES, LABEL_COLOR, requiredMark } from '../Label/Label.js';
import { supportingText } from '../Field/Field.js';
import { uniqueId } from '../../utils/id.js';

// Not in Figma yet (see COMPONENTS.md, Figma fixes). Built from Form/Radio with the same
// label and help/error pattern as Field: legend styled like Label, radios, then help or error.

/**
 * Radio group: one choice from a short list.
 *
 * @param {object} props
 * @param {string} props.legend - The question; rendered as the <legend>.
 * @param {Array<{ value: string, label: string, disabled?: boolean }>} props.options
 * @param {string} [props.value] - The selected value.
 * @param {string} [props.name] - Generated when omitted.
 * @param {string} [props.help]
 * @param {string} [props.error] - Replaces the help text; sets aria-invalid on the radios.
 * @param {boolean} [props.required]
 * @param {boolean} [props.disabled] - Disables the whole group (native fieldset).
 * @param {(event: Event) => void} [props.onChange]
 * @returns {HTMLFieldSetElement}
 */
export function RadioGroup({
  legend,
  options = [],
  value,
  name = uniqueId('radio-group'),
  help,
  error,
  required = false,
  disabled = false,
  onChange,
} = {}) {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'flex min-w-0 flex-col gap-200';
  fieldset.disabled = Boolean(disabled);

  const legendEl = document.createElement('legend');
  legendEl.className = `mb-200 ${LABEL_TEXT_CLASSES} ${disabled ? LABEL_COLOR.disabled : LABEL_COLOR.enabled}`;
  legendEl.append(legend ?? '');
  if (required) legendEl.append(requiredMark());

  // The radio rows have 8px side padding for their focus fill; pull them out so the
  // radio circles line up with the legend.
  const list = document.createElement('div');
  list.className = '-mx-200 flex flex-col';
  for (const option of options) {
    const row = Radio({
      label: option.label,
      name,
      value: option.value,
      checked: option.value === value,
      disabled: option.disabled,
      required,
      onChange,
    });
    if (error) row.input.setAttribute('aria-invalid', 'true');
    list.append(row);
  }

  fieldset.append(legendEl, list);

  const describedBy = uniqueId(error ? 'radio-group-error' : 'radio-group-help');
  if (error) {
    fieldset.append(supportingText({ id: describedBy, text: error, kind: 'error' }));
    fieldset.setAttribute('aria-describedby', describedBy);
  } else if (help) {
    fieldset.append(supportingText({ id: describedBy, text: help, kind: 'help' }));
    fieldset.setAttribute('aria-describedby', describedBy);
  }

  return fieldset;
}
