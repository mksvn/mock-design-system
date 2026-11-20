import { createIcon } from '../../icons/index.js';

// Figma: Button/Solid (15:45), Button/Outline (15:76), Button/Transparent (15:107).
// Hover, Focus and Active are CSS states, not props. Disabled and Loading are props.

const BASE_CLASSES = [
  // Layout: 48px tall, 12/16px padding, 8px gap, 8px radius.
  'group inline-flex h-900 shrink-0 cursor-pointer items-center justify-center gap-200 rounded-lg px-400 py-300',
  // Label: Typography/paragraph md/medium.
  'font-body text-paragraph-md-medium whitespace-nowrap',
  // Focus: 2px ring 4px outside the button; the outline follows the 8px radius (12px ring in Figma).
  'focus-visible:outline-2 focus-visible:outline-offset-4',
  // Disabled: dedicated tokens, not opacity.
  'disabled:cursor-not-allowed disabled:text-text-disabled',
  // Loading.
  'aria-busy:cursor-wait',
].join(' ');

// Colors per variant and tone. Destructive is the default tone with the Primary scale
// swapped for the Error scale (COMPONENTS.md, decision 8). Hover and Active apply only when
// the button can actually be used. Every class is written out in full so Tailwind can find it.
const COLOR_CLASSES = {
  solid: {
    default: [
      'bg-primary-700 text-text-on-action',
      'enabled:not-aria-busy:hover:bg-primary-800',
      'enabled:not-aria-busy:active:bg-primary-900',
      'focus-visible:outline-primary-700',
      'disabled:bg-surface-disabled',
    ].join(' '),
    destructive: [
      'bg-error-700 text-text-on-action',
      'enabled:not-aria-busy:hover:bg-error-800',
      'enabled:not-aria-busy:active:bg-error-900',
      'focus-visible:outline-error-700',
      'disabled:bg-surface-disabled',
    ].join(' '),
  },
  outline: {
    default: [
      'border border-primary-700 text-primary-700',
      'enabled:not-aria-busy:hover:border-primary-800 enabled:not-aria-busy:hover:bg-primary-100 enabled:not-aria-busy:hover:text-primary-800',
      'enabled:not-aria-busy:active:border-primary-900 enabled:not-aria-busy:active:bg-primary-200 enabled:not-aria-busy:active:text-primary-900',
      'focus-visible:outline-primary-700',
      'disabled:border-border-disabled',
    ].join(' '),
    destructive: [
      'border border-error-700 text-error-700',
      'enabled:not-aria-busy:hover:border-error-800 enabled:not-aria-busy:hover:bg-error-100 enabled:not-aria-busy:hover:text-error-800',
      'enabled:not-aria-busy:active:border-error-900 enabled:not-aria-busy:active:bg-error-200 enabled:not-aria-busy:active:text-error-900',
      'focus-visible:outline-error-700',
      'disabled:border-border-disabled',
    ].join(' '),
  },
  transparent: {
    default: [
      'text-primary-700',
      'enabled:not-aria-busy:hover:bg-primary-100 enabled:not-aria-busy:hover:text-primary-800',
      'enabled:not-aria-busy:active:bg-primary-200 enabled:not-aria-busy:active:text-primary-900',
      'focus-visible:outline-primary-700',
    ].join(' '),
    destructive: [
      'text-error-700',
      'enabled:not-aria-busy:hover:bg-error-100 enabled:not-aria-busy:hover:text-error-800',
      'enabled:not-aria-busy:active:bg-error-200 enabled:not-aria-busy:active:text-error-900',
      'focus-visible:outline-error-700',
    ].join(' '),
  },
};

export const BUTTON_VARIANTS = Object.keys(COLOR_CLASSES);
export const BUTTON_TONES = ['default', 'destructive'];

// Icons inherit the label color (currentColor); disabled icons use the icon token.
const ICON_CLASSES = ['size-600', 'shrink-0', 'group-disabled:text-icons-disabled'];

function buttonIcon(name, ...extra) {
  const icon = createIcon(name);
  icon.classList.add(...ICON_CLASSES, ...extra);
  return icon;
}

/**
 * Button.
 *
 * @param {object} props
 * @param {string} props.label - Visible text; also the accessible name.
 * @param {"solid"|"outline"|"transparent"} [props.variant]
 * @param {"default"|"destructive"} [props.tone] - Destructive uses the Error color scale.
 * @param {string|null} [props.leftIcon] - Icon name from src/icons, or null to hide it.
 * @param {string|null} [props.rightIcon] - Icon name from src/icons, or null to hide it.
 * @param {boolean} [props.disabled] - Sets the native disabled attribute.
 * @param {boolean} [props.loading] - Shows a spinner in place of the left icon, hides the
 *   right icon (keeping its space), sets aria-busy="true" and ignores clicks. The button
 *   stays focusable.
 * @param {"button"|"submit"|"reset"} [props.type]
 * @param {(event: MouseEvent) => void} [props.onClick]
 * @returns {HTMLButtonElement}
 */
export function Button({
  label,
  variant = 'solid',
  tone = 'default',
  leftIcon = null,
  rightIcon = null,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
} = {}) {
  const colors = COLOR_CLASSES[variant]?.[tone];
  if (!colors) {
    throw new Error(
      `Unknown Button variant "${variant}" or tone "${tone}". Variants: ${BUTTON_VARIANTS.join(', ')}. Tones: ${BUTTON_TONES.join(', ')}.`,
    );
  }

  const button = document.createElement('button');
  button.type = type;
  button.className = `${BASE_CLASSES} ${colors}`;
  button.disabled = Boolean(disabled);

  if (loading) {
    button.setAttribute('aria-busy', 'true');
    // Capture phase on the button itself runs before any other click listener on it,
    // so this blocks onClick, listeners added later, and form submission.
    button.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
      },
      true,
    );
    button.append(buttonIcon('loader-circle', 'motion-safe:animate-spin'));
  } else if (leftIcon) {
    button.append(buttonIcon(leftIcon));
  }

  const text = document.createElement('span');
  text.textContent = label ?? '';
  button.append(text);

  if (rightIcon) {
    // While loading, the right icon is hidden but keeps its space (as in Figma, where
    // Loading is the same width as the other states), so the button doesn't change width.
    button.append(loading ? buttonIcon(rightIcon, 'invisible') : buttonIcon(rightIcon));
  }

  if (onClick) button.addEventListener('click', onClick);

  return button;
}
