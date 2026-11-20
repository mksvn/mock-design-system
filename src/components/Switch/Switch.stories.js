import { fn } from 'storybook/test';
import { Switch } from './Switch.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

export default {
  title: 'Components/Switch',
  render: (args) => Switch(args),
  args: {
    label: 'Email notifications',
    name: 'notifications',
    checked: false,
    disabled: false,
    onChange: fn(),
  },
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    checked: { control: 'boolean', description: 'On.' },
    disabled: { control: 'boolean' },
    onChange: { control: false },
    id: { control: false },
  },
  parameters: { design: figma('18-560') },
};

export const Off = {};

export const On = { args: { checked: true } };

export const Disabled = { args: { checked: true, disabled: true } };

// Rows: Off, On. Columns: enabled, disabled. Focus is CSS: tab to a switch to see it.
export const AllStates = {
  name: 'All states',
  argTypes: {
    checked: { table: { disable: true } },
    disabled: { table: { disable: true } },
  },
  render: (args) => {
    const grid = document.createElement('div');
    grid.className = 'grid max-w-2xl grid-cols-2 gap-200';
    for (const [selected, checked] of [['Off', false], ['On', true]]) {
      for (const disabled of [false, true]) {
        grid.append(Switch({ ...args, checked, disabled, label: `${selected}${disabled ? ', disabled' : ''}` }));
      }
    }
    return grid;
  },
};
