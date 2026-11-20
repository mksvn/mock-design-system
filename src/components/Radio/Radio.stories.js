import { fn } from 'storybook/test';
import { Radio } from './Radio.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

export default {
  title: 'Components/Radio',
  render: (args) => Radio(args),
  args: {
    label: 'Standard delivery',
    name: 'delivery',
    value: 'standard',
    checked: false,
    disabled: false,
    required: false,
    onChange: fn(),
  },
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text', description: 'Radios with the same name form a group.' },
    value: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    onChange: { control: false },
    id: { control: false },
  },
  parameters: { design: figma('18-520') },
};

export const Default = {};

export const Selected = { args: { checked: true } };

export const Disabled = { args: { checked: true, disabled: true } };

// Rows: Off, On. Columns: enabled, disabled. Each radio has its own name so all can show
// their state at once. Focus is CSS: tab to a radio to see it.
export const AllStates = {
  name: 'All states',
  argTypes: {
    checked: { table: { disable: true } },
    disabled: { table: { disable: true } },
    name: { table: { disable: true } },
  },
  render: (args) => {
    const grid = document.createElement('div');
    grid.className = 'grid max-w-2xl grid-cols-2 gap-200';
    for (const [selected, checked] of [['Off', false], ['On', true]]) {
      for (const disabled of [false, true]) {
        const label = `${selected}${disabled ? ', disabled' : ''}`;
        grid.append(Radio({ ...args, name: `delivery-${label}`, checked, disabled, label }));
      }
    }
    return grid;
  },
};
