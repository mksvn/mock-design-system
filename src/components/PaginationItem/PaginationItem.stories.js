import { PaginationItem } from './PaginationItem.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

export default {
  title: 'Components/Pagination item',
  render: (args) => PaginationItem(args),
  args: { label: '1', ariaLabel: 'Page 1', href: '#page-1', current: false, disabled: false },
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'select', options: ['none', 'chevron-left', 'chevron-right'], mapping: { none: undefined } },
    ariaLabel: { control: 'text' },
    href: { control: 'text' },
    current: { control: 'boolean', description: 'aria-current="page"' },
    disabled: { control: 'boolean', description: 'No href, aria-disabled="true".' },
    rel: { control: 'text' },
  },
  parameters: { design: figma('18-774') },
};

export const Default = {};
export const Current = { args: { current: true } };
export const Disabled = { args: { disabled: true } };

// Hover is CSS: hover over the first item to see it.
export const AllStates = {
  name: 'All states',
  argTypes: { current: { table: { disable: true } }, disabled: { table: { disable: true } } },
  render: (args) => {
    const row = document.createElement('div');
    row.className = 'flex items-center gap-200';
    row.append(
      PaginationItem({ ...args, label: '1', ariaLabel: 'Page 1', href: '#page-1' }),
      PaginationItem({ ...args, label: '2', ariaLabel: 'Page 2', href: '#page-2', current: true }),
      PaginationItem({ ...args, label: '3', ariaLabel: 'Page 3', disabled: true }),
    );
    return row;
  },
};
