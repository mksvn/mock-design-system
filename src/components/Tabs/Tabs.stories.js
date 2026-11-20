import { fn } from 'storybook/test';
import { Tabs } from './Tabs.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

const TABS = [
  { label: 'Overview', content: 'A summary of your account and recent activity.' },
  { label: 'Members', content: 'Everyone who can access this workspace.' },
  { label: 'Billing', content: 'Invoices, payment method and plan.' },
  { label: 'Archived', content: 'Archived projects.', disabled: true },
];

// No Figma design for the tab set yet; links point at Navigation/Tab.
export default {
  title: 'Components/Tabs',
  render: (args) => Tabs(args),
  args: { label: 'Account sections', tabs: TABS, selected: 0, onChange: fn() },
  argTypes: {
    label: { control: 'text', description: 'Accessible name of the tablist.' },
    tabs: { control: 'object', description: '{ label, content, disabled? } for each tab.' },
    selected: { control: { type: 'number', min: 0, max: TABS.length - 1 } },
    onChange: { control: false },
  },
  parameters: { design: figma('18-763') },
};

/** Click a tab, or focus the tablist and use the arrow keys, Home and End. */
export const Default = {};

export const SecondSelected = { name: 'Second tab selected', args: { selected: 1 } };

// The tab states (default, hover, selected, disabled) are on Components/Tab › All states.
export const AllStates = {
  name: 'All states',
  args: { selected: 1 },
};
