import { createIcon } from '../../icons/index.js';

// Figma: Button/Solid (node 15:45).
// Hover, Focus and Active are CSS states, not props. Disabled and Loading are props.

const BUTTON_CLASSES = [
  // Layout: 48px tall, 12/16px padding, 8px gap, 8px radius.
  'group inline-flex h-900 shrink-0 cursor-pointer items-center justify-center gap-200 rounded-lg px-400 py-300',
  // Label: Typography/paragraph md/medium.
  'font-body text-paragraph-md-medium whitespace-nowrap',
  // Default.
  'bg-primary-700 text-text-on-action',
  // Hover and Active, only when the button can actually be used.
  'enabled:not-aria-busy:hover:bg-primary-800',
  'enabled:not-aria-busy:active:bg-primary-900',
  // Focus: 2px ring 4px outside the button; the outline follows the 8px radius (12px ring in Figma).
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-700',
  // Disabled: dedicated tokens, not opacity.
  'disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-text-disabled',
  // Loading.
  'aria-busy:cursor-wait',
].join(' ');

// Icons inherit the label color (currentColor); disabled icons use the icon token.
const ICON_CLASSES = ['size-600', 'shrink-0', 'group-disabled:text-icons-disabled'];

function buttonIcon(name, ...extra) {
  const icon = createIcon(name);
  icon.classList.add(...ICON_CLASSES, ...extra);
  return icon;
}

/**
 * Solid button.
 *
 * @param {object} props
 * @param {string} props.label - Visible text; also the accessible name.
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
  leftIcon = null,
  rightIcon = null,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
} = {}) {
  const button = document.createElement('button');
  button.type = type;
  button.className = BUTTON_CLASSES;
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
    // Loading is 166px like the other states), so the button doesn't change width.
    button.append(loading ? buttonIcon(rightIcon, 'invisible') : buttonIcon(rightIcon));
  }

  if (onClick) button.addEventListener('click', onClick);

  return button;
}
