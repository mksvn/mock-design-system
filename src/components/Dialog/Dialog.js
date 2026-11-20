import { Button } from '../Button/Button.js';
import { uniqueId } from '../../utils/id.js';

// Figma: Overlay/Dialog (18:956). Native <dialog> opened with showModal(): focus is trapped
// inside, Escape closes it, and focus returns to whatever opened it. 24px padding and gaps,
// 8px radius, Neutral/300 border, h5 title, paragraph md description, actions on the right:
// Cancel (outline) and Confirm (solid; destructive tone for destructive dialogs).

// Fills the width up to max-w-xl, centered; keeps 16px from the screen edges on small screens.
const DIALOG_CLASSES = [
  'm-auto w-auto max-w-xl max-sm:mx-400 rounded-lg border border-neutral-300 bg-surface-default p-600',
  'font-body text-text-body backdrop:bg-neutral-black/50',
].join(' ');

/**
 * Confirmation dialog. Open it with `dialog.showModal()`.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {"default"|"destructive"} [props.intent]
 * @param {string} [props.confirmLabel] - Defaults to "Confirm", or "Delete" when destructive.
 * @param {string} [props.cancelLabel]
 * @param {() => void} [props.onConfirm]
 * @param {() => void} [props.onCancel] - Also called on Escape.
 * @returns {HTMLDialogElement}
 */
export function Dialog({
  title,
  description,
  intent = 'default',
  confirmLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
} = {}) {
  const dialog = document.createElement('dialog');
  dialog.className = DIALOG_CLASSES;

  const titleId = uniqueId('dialog-title');
  const heading = document.createElement('h2');
  heading.id = titleId;
  heading.className = 'text-h5 text-text-body';
  heading.textContent = title ?? '';
  dialog.setAttribute('aria-labelledby', titleId);

  const body = document.createElement('div');
  body.className = 'flex flex-col gap-600';
  body.append(heading);

  if (description) {
    const descriptionId = uniqueId('dialog-description');
    const text = document.createElement('p');
    text.id = descriptionId;
    text.className = 'text-paragraph-md text-text-body';
    text.textContent = description;
    dialog.setAttribute('aria-describedby', descriptionId);
    body.append(text);
  }

  const destructive = intent === 'destructive';
  const actions = document.createElement('div');
  actions.className = 'flex flex-wrap justify-end gap-200';
  actions.append(
    Button({ label: cancelLabel, variant: 'outline', onClick: () => dialog.close('cancel') }),
    Button({
      label: confirmLabel ?? (destructive ? 'Delete' : 'Confirm'),
      tone: destructive ? 'destructive' : 'default',
      onClick: () => dialog.close('confirm'),
    }),
  );
  body.append(actions);
  dialog.append(body);

  // Remember what had focus when the dialog opened, and give it focus back on close.
  let opener = null;
  const nativeShowModal = dialog.showModal.bind(dialog);
  dialog.showModal = () => {
    opener = document.activeElement;
    dialog.returnValue = '';
    nativeShowModal();
  };
  dialog.addEventListener('close', () => {
    if (dialog.returnValue === 'confirm') onConfirm?.();
    else onCancel?.();
    if (opener && opener.isConnected) opener.focus();
    opener = null;
  });

  return dialog;
}
