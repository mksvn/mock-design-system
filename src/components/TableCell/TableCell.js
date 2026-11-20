// Figma: Data/Table cell (18:818). 56px tall, 16px side padding, paragraph sm text.
// Header: Neutral/100 background, medium weight, <th scope="col">. Numeric: right-aligned,
// tabular figures.

const BASE_CLASSES = 'h-1000 px-400 align-middle font-body text-text-body';

const TYPE_CLASSES = {
  header: 'bg-neutral-100 text-paragraph-sm-medium',
  body: 'text-paragraph-sm',
  numeric: 'text-paragraph-sm tabular-nums',
};

const ALIGN_CLASSES = { left: 'text-left', right: 'text-right' };

export const TABLE_CELL_TYPES = Object.keys(TYPE_CLASSES);

/**
 * Table cell.
 *
 * @param {object} props
 * @param {string|Node} props.value - Text, or an element (e.g. a Badge).
 * @param {"header"|"body"|"numeric"} [props.type]
 * @param {"left"|"right"} [props.align] - Defaults to right for numeric, left otherwise.
 * @returns {HTMLTableCellElement}
 */
export function TableCell({ value, type = 'body', align } = {}) {
  if (!TYPE_CLASSES[type]) throw new Error(`Unknown TableCell type "${type}". Use one of: ${TABLE_CELL_TYPES.join(', ')}.`);
  const cell = document.createElement(type === 'header' ? 'th' : 'td');
  if (type === 'header') cell.scope = 'col';
  const alignment = align ?? (type === 'numeric' ? 'right' : 'left');
  cell.className = `${BASE_CLASSES} ${TYPE_CLASSES[type]} ${ALIGN_CLASSES[alignment]}`;
  if (value instanceof Node) cell.append(value);
  else cell.textContent = value ?? '';
  return cell;
}
