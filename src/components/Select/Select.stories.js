import { fn } from 'storybook/test';
import { Select } from './Select.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

const COUNTRIES = ['United Kingdom', 'Ireland', 'France', 'Germany', 'Netherlands'];

const frame = (...children) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex max-w-sm flex-col gap-600 pt-1100';
  wrapper.append(...children);
  return wrapper;
};

export default {
  title: 'Components/Select',
  render: (args) => frame(Select(args)),
  args: {
    label: 'Country',
    options: COUNTRIES,
    value: '',
    placeholder: 'Choose a country',
    help: 'Choose your primary location.',
    error: '',
    required: true,
    disabled: false,
    labelHelp: '',
    name: 'country',
    onChange: fn(),
  },
  argTypes: {
    label: { control: 'text' },
    options: { control: 'object', description: 'Strings, or { value, label } objects.' },
    value: { control: 'select', options: ['', ...COUNTRIES] },
    placeholder: { control: 'text' },
    help: { control: 'text' },
    error: { control: 'text', description: 'Replaces the help text; error border and aria-invalid.' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    labelHelp: { control: 'text' },
    name: { control: 'text' },
    onChange: { control: false },
    id: { control: false },
  },
  parameters: { design: figma('18-634') },
};

export const Empty = {};
export const Filled = { args: { value: 'United Kingdom' } };
export const ErrorState = { name: 'Error', args: { value: 'United Kingdom', error: 'This region is not available yet.' } };
export const Disabled = { args: { value: 'United Kingdom', disabled: true } };

// Focus is CSS: click into a select to see it.
export const AllStates = {
  name: 'All states',
  argTypes: { value: { table: { disable: true } }, error: { table: { disable: true } }, disabled: { table: { disable: true } } },
  render: (args) => {
    const states = [
      ['Empty', {}],
      ['Filled', { value: 'United Kingdom' }],
      ['Error', { value: 'United Kingdom', error: 'This region is not available yet.' }],
      ['Disabled', { value: 'United Kingdom', disabled: true }],
    ];
    return frame(...states.map(([title, overrides]) => Select({ ...args, ...overrides, label: `${args.label} (${title})` })));
  },
};
