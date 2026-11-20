// Figma: Feedback/Badge (18:720). 24px tall, 4/8px padding, 4px radius,
// paragraph sm/medium text in the tone's 700 shade on its 100 tint.

const BASE_CLASSES = 'inline-flex items-center gap-100 rounded-md px-200 py-100 font-body text-paragraph-sm-medium';

const TONE_CLASSES = {
  neutral: 'bg-neutral-100 text-neutral-700',
  success: 'bg-success-100 text-success-700',
  warning: 'bg-warning-100 text-warning-700',
  error: 'bg-error-100 text-error-700',
  information: 'bg-information-100 text-information-700',
};

export const BADGE_TONES = Object.keys(TONE_CLASSES);

/**
 * Badge: a short status label.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {"neutral"|"success"|"warning"|"error"|"information"} [props.tone]
 * @returns {HTMLSpanElement}
 */
export function Badge({ label, tone = 'neutral' } = {}) {
  const colors = TONE_CLASSES[tone];
  if (!colors) throw new Error(`Unknown Badge tone "${tone}". Use one of: ${BADGE_TONES.join(', ')}.`);
  const badge = document.createElement('span');
  badge.className = `${BASE_CLASSES} ${colors}`;
  badge.textContent = label ?? '';
  return badge;
}
