import { choiceRow, applyChoiceProps, CHOICE_INPUT_CLASSES, CHOICE_MARK_CLASSES } from '../../utils/choiceRow.js';

// Figma: Form/Switch (18:560). 40x24 pill track (Neutral/Default off, Primary/700 on) with a
// 20px white thumb 2px from the edge; the thumb moves 16px when on.

const TRACK_CLASSES = [
  CHOICE_INPUT_CLASSES,
  'h-600 w-800 rounded-full border border-transparent bg-neutral-default',
  'checked:border-primary-700 checked:bg-primary-700',
  'disabled:border-border-disabled disabled:bg-surface-disabled',
].join(' ');

const THUMB_CLASSES = [
  CHOICE_MARK_CLASSES,
  'ml-50 size-500 justify-self-start rounded-full bg-text-on-action',
  'peer-checked:translate-x-400 peer-disabled:bg-neutral-400 motion-safe:transition-transform',
].join(' ');

/**
 * Switch: an on/off setting that applies immediately.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.id]
 * @param {string} [props.name]
 * @param {string} [props.value]
 * @param {boolean} [props.checked] - On.
 * @param {boolean} [props.disabled]
 * @param {(event: Event) => void} [props.onChange]
 * @returns {HTMLLabelElement} The row; the native input is `row.input`.
 */
export function Switch({ label, ...props } = {}) {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.setAttribute('role', 'switch');
  input.className = TRACK_CLASSES;
  applyChoiceProps(input, props);

  const thumb = document.createElement('span');
  thumb.className = THUMB_CLASSES;

  return choiceRow({ input, marks: [thumb], label });
}
