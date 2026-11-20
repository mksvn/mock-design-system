import { fn } from 'storybook/test';
import { Table } from './Table.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

// The "Members" table from Figma, as example data.
const MEMBER_COLUMNS = [
  { key: 'member', label: 'Member' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'seats', label: 'Seats', numeric: true },
];

const MEMBER_ROWS = [
  { member: 'Alex Morgan', role: 'Editor', status: 'Active', seats: '4' },
  { member: 'Sam Rivera', role: 'Admin', status: 'Active', seats: '12' },
  { member: 'Jordan Lee', role: 'Viewer', status: 'Invited', seats: '1' },
  { member: 'Taylor Kim', role: 'Editor', status: 'Active', seats: '6' },
];

const EMPTY_STATE = {
  title: 'No members yet',
  description: 'Invite your first teammate to get started.',
  action: { label: 'Invite member', onClick: fn() },
};

export default {
  title: 'Components/Table',
  render: (args) => Table(args),
  args: {
    caption: 'Workspace members',
    columns: MEMBER_COLUMNS,
    rows: MEMBER_ROWS,
    emptyState: EMPTY_STATE,
  },
  argTypes: {
    caption: { control: 'text', description: 'Visually hidden; read by screen readers.' },
    columns: { control: 'object', description: '{ key, label, numeric? } for each column.' },
    rows: { control: 'object', description: 'One object per row, keyed by column; `selected: true` highlights it.' },
    emptyState: { control: 'object', description: '{ title, description, action: { label, onClick } }, shown when rows is empty.' },
  },
  parameters: { design: figma('18-918') },
};

export const Members = {};

export const SelectedRow = {
  name: 'Selected row',
  args: { rows: MEMBER_ROWS.map((row, i) => (i === 1 ? { ...row, selected: true } : row)) },
  parameters: { design: figma('18-847') },
};

export const Empty = { args: { rows: [] } };

// Row hover is CSS: hover over a row to see it.
export const AllStates = {
  name: 'All states',
  argTypes: { rows: { table: { disable: true } } },
  render: (args) => {
    const stack = document.createElement('div');
    stack.className = 'flex flex-col gap-900';
    stack.append(
      Table({ ...args, caption: 'Members, populated, second row selected', rows: MEMBER_ROWS.map((row, i) => (i === 1 ? { ...row, selected: true } : row)) }),
      Table({ ...args, caption: 'Members, empty', rows: [] }),
    );
    return stack;
  },
};
