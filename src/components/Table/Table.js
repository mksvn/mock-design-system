import { TableCell } from '../TableCell/TableCell.js';
import { Button } from '../Button/Button.js';

// Figma: Data/Table (18:918) and Data/Table row (18:847), made generic (decision 3).
// 8px radius, Neutral/300 border, header cells on Neutral/100; rows have a Neutral/200 bottom
// border, Neutral/100 on hover and Primary/100 when selected. The empty state is one full-width
// row: centered title, description and a solid Button, 32px padding, 16px apart.

const ROW_CLASSES = {
  default: 'border-b border-neutral-200 last:border-b-0 hover:bg-neutral-100',
  selected: 'border-b border-neutral-200 last:border-b-0 bg-primary-100',
};

function emptyRow(columnCount, { title, description, action }) {
  const content = document.createElement('div');
  content.className = 'flex flex-col items-center gap-400 p-700 text-center font-body text-text-body';
  const heading = document.createElement('p');
  heading.className = 'text-paragraph-md-medium';
  heading.textContent = title ?? '';
  content.append(heading);
  if (description) {
    const text = document.createElement('p');
    text.className = 'text-paragraph-sm';
    text.textContent = description;
    content.append(text);
  }
  if (action) content.append(Button({ label: action.label, onClick: action.onClick }));

  const cell = document.createElement('td');
  cell.colSpan = columnCount;
  cell.append(content);
  const row = document.createElement('tr');
  row.append(cell);
  return row;
}

/**
 * Data table.
 *
 * @param {object} props
 * @param {string} props.caption - What the table shows; visually hidden, read by screen readers.
 * @param {Array<{ key: string, label: string, numeric?: boolean }>} props.columns
 * @param {Array<Object<string, string|Node> & { selected?: boolean }>} props.rows
 * @param {{ title: string, description?: string, action?: { label: string, onClick?: Function } }} [props.emptyState]
 *   Shown when `rows` is empty.
 * @returns {HTMLDivElement} A scroll container around the <table>.
 */
export function Table({ caption, columns = [], rows = [], emptyState } = {}) {
  const table = document.createElement('table');
  table.className = 'w-full border-collapse';

  const captionEl = document.createElement('caption');
  captionEl.className = 'sr-only';
  captionEl.textContent = caption ?? '';

  const head = document.createElement('thead');
  const headRow = document.createElement('tr');
  for (const column of columns) {
    headRow.append(TableCell({ value: column.label, type: 'header', align: column.numeric ? 'right' : 'left' }));
  }
  head.append(headRow);

  const body = document.createElement('tbody');
  if (rows.length === 0 && emptyState) {
    body.append(emptyRow(columns.length, emptyState));
  } else {
    for (const row of rows) {
      const tr = document.createElement('tr');
      tr.className = row.selected ? ROW_CLASSES.selected : ROW_CLASSES.default;
      for (const column of columns) {
        tr.append(TableCell({ value: row[column.key], type: column.numeric ? 'numeric' : 'body' }));
      }
      body.append(tr);
    }
  }

  table.append(captionEl, head, body);

  const wrapper = document.createElement('div');
  wrapper.className = 'w-full overflow-x-auto rounded-lg border border-neutral-300 bg-surface-default';
  wrapper.append(table);
  return wrapper;
}
