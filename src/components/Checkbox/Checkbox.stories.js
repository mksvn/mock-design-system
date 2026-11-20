import { fn } from 'storybook/test';
import { Checkbox } from './Checkbox.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

export default {
  title: 'Components/Checkbox',
  render: (args) => Checkbox(args),
  args: {
    label: 'Email updates',
    name: 'updates',
    value: 'email',
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
    onChange: fn(),
  },
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean', description: 'Mixed state, set via JS (no HTML attribute).' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    onChange: { control: false },
    id: { control: false },
  },
  parameters: { design: figma('18-480') },
};

export const Default = {};

export const Checked = { args: { checked: true } };

export const Mixed = { args: { indeterminate: true } };

export const Disabled = { args: { checked: true, disabled: true } };

// Rows: Off, On, Mixed. Columns: enabled, disabled. Focus is CSS: tab to a checkbox to see it.
export const AllStates = {
  name: 'All states',
  argTypes: {
    checked: { table: { disable: true } },
    indeterminate: { table: { disable: true } },
    disabled: { table: { disable: true } },
  },
  render: (args) => {
    const grid = document.createElement('div');
    grid.className = 'grid max-w-2xl grid-cols-2 gap-200';
    const selections = [
      ['Off', {}],
      ['On', { checked: true }],
      ['Mixed', { indeterminate: true }],
    ];
    for (const [selected, state] of selections) {
      for (const disabled of [false, true]) {
        grid.append(Checkbox({ ...args, ...state, disabled, label: `${selected}${disabled ? ', disabled' : ''}` }));
      }
    }
    return grid;
  },
};
