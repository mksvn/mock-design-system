import { Tab } from './Tab.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

// A tab must live in a tablist, so stories wrap it in one. For a working tab set
// (selection, arrow keys, panels) see Components/Tabs.
const tablist = (...tabs) => {
  const list = document.createElement('div');
  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-label', 'Example tabs');
  list.className = 'flex';
  list.append(...tabs);
  return list;
};

export default {
  title: 'Components/Tab',
  render: (args) => tablist(Tab(args)),
  args: { label: 'Overview', selected: false, disabled: false },
  argTypes: {
    label: { control: 'text' },
    selected: { control: 'boolean', description: 'aria-selected; the selected tab is the one in the tab order.' },
    disabled: { control: 'boolean', description: 'aria-disabled (stays discoverable).' },
    id: { control: false },
    controls: { control: false, description: 'id of the tab panel (set by Tabs).' },
  },
  parameters: { design: figma('18-763') },
};

export const Default = {};
export const Selected = { args: { selected: true } };
export const Disabled = { args: { disabled: true } };

// Hover is CSS: hover over the first tab to see it.
export const AllStates = {
  name: 'All states',
  argTypes: { selected: { table: { disable: true } }, disabled: { table: { disable: true } } },
  render: (args) =>
    tablist(
      Tab({ ...args, label: 'Default' }),
      Tab({ ...args, label: 'Selected', selected: true }),
      Tab({ ...args, label: 'Disabled', disabled: true }),
    ),
};
