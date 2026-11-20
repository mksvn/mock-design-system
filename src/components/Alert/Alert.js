import { createIcon } from '../../icons/index.js';

// Figma: Feedback/Alert (18:749). 16px padding, 12px gap, 8px radius, tone 100 tint background,
// 20px status icon and paragraph md/medium title in the tone's 700 shade, paragraph sm body text.
// Success and information are polite status messages; warning and error are alerts.

const TONES = {
  success: { icon: 'circle-check', role: 'status', bg: 'bg-success-100', ink: 'text-success-700' },
  warning: { icon: 'triangle-alert', role: 'alert', bg: 'bg-warning-100', ink: 'text-warning-700' },
  error: { icon: 'circle-alert', role: 'alert', bg: 'bg-error-100', ink: 'text-error-700' },
  information: { icon: 'info', role: 'status', bg: 'bg-information-100', ink: 'text-information-700' },
};

export const ALERT_TONES = Object.keys(TONES);

/**
 * Alert: an inline message about the current page or task.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {"success"|"warning"|"error"|"information"} [props.tone]
 * @returns {HTMLDivElement}
 */
export function Alert({ title, description, tone = 'information' } = {}) {
  const t = TONES[tone];
  if (!t) throw new Error(`Unknown Alert tone "${tone}". Use one of: ${ALERT_TONES.join(', ')}.`);

  const alert = document.createElement('div');
  alert.setAttribute('role', t.role);
  alert.className = `flex gap-300 rounded-lg p-400 font-body ${t.bg}`;

  const icon = createIcon(t.icon);
  icon.setAttribute('class', `size-500 shrink-0 ${t.ink}`);

  const copy = document.createElement('div');
  copy.className = 'flex min-w-0 flex-col gap-100';
  const heading = document.createElement('p');
  heading.className = `text-paragraph-md-medium ${t.ink}`;
  heading.textContent = title ?? '';
  copy.append(heading);
  if (description) {
    const body = document.createElement('p');
    body.className = 'text-paragraph-sm text-text-body';
    body.textContent = description;
    copy.append(body);
  }

  alert.append(icon, copy);
  return alert;
}
