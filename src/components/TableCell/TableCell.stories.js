import { TableCell, TABLE_CELL_TYPES } from './TableCell.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

// Cells must live in a table, so stories render a one-row table. See Components/Table
// for the full component.
function table(headerCells, bodyCells) {
  const t = document.createElement('table');
  t.className = 'border-collapse';
  const caption = document.createElement('caption');
  caption.className = 'sr-only';
  caption.textContent = 'Table cell example';
  const head = document.createElement('thead');
  const headRow = document.createElement('tr');
  headRow.append(...headerCells);
  head.append(headRow);
  const body = document.createElement('tbody');
  const bodyRow = document.createElement('tr');
  bodyRow.append(...bodyCells);
  body.append(bodyRow);
  t.append(caption, head, body);
  return t;
}

export default {
  title: 'Components/Table cell',
  args: { value: '128', type: 'body' },
  argTypes: {
    value: { control: 'text' },
    type: { control: 'inline-radio', options: TABLE_CELL_TYPES },
    align: { control: 'inline-radio', options: ['left', 'right'], description: 'Defaults to right for numeric.' },
  },
  parameters: { design: figma('18-818') },
  render: (args) =>
    args.type === 'header'
      ? table([TableCell(args)], [TableCell({ value: '—' })])
      : table([TableCell({ value: 'Value', type: 'header', align: args.type === 'numeric' ? 'right' : 'left' })], [TableCell(args)]),
};

export const Body = {};
export const Header = { args: { value: 'Seats', type: 'header' } };
export const Numeric = { args: { type: 'numeric' } };

export const AllStates = {
  name: 'All states',
  argTypes: { type: { table: { disable: true } }, value: { table: { disable: true } } },
  render: () =>
    table(
      [
        TableCell({ value: 'Member', type: 'header' }),
        TableCell({ value: 'Seats', type: 'header', align: 'right' }),
      ],
      [TableCell({ value: 'Alex Morgan', type: 'body' }), TableCell({ value: '4', type: 'numeric' })],
    ),
};
