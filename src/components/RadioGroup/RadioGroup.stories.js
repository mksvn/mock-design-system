import { fn } from 'storybook/test';
import { RadioGroup } from './RadioGroup.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

const OPTIONS = [
  { value: 'standard', label: 'Standard delivery' },
  { value: 'express', label: 'Express delivery' },
  { value: 'pickup', label: 'Collect in store' },
];

// No Figma design for the group yet; links point at Form/Radio.
export default {
  title: 'Components/RadioGroup',
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'max-w-sm';
    wrapper.append(RadioGroup(args));
    return wrapper;
  },
  args: {
    legend: 'Delivery method',
    options: OPTIONS,
    value: 'standard',
    help: 'Express delivery arrives the next working day.',
    error: '',
    required: true,
    disabled: false,
    onChange: fn(),
  },
  argTypes: {
    legend: { control: 'text' },
    options: { control: 'object', description: '{ value, label, disabled? } for each radio.' },
    value: { control: 'select', options: ['', ...OPTIONS.map((o) => o.value)] },
    name: { control: 'text', description: 'Generated when omitted.' },
    help: { control: 'text' },
    error: { control: 'text', description: 'Replaces the help text; aria-invalid on the radios.' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean', description: 'Disables the whole group.' },
    onChange: { control: false },
  },
  parameters: { design: figma('18-520') },
};

export const Default = {};
export const ErrorState = { name: 'Error', args: { value: '', error: 'Choose a delivery method.' } };
export const Disabled = { args: { disabled: true } };
export const DisabledOption = {
  name: 'Disabled option',
  args: { options: [...OPTIONS.slice(0, 2), { ...OPTIONS[2], disabled: true }] },
};

export const AllStates = {
  name: 'All states',
  argTypes: { error: { table: { disable: true } }, disabled: { table: { disable: true } }, value: { table: { disable: true } } },
  render: (args) => {
    const stack = document.createElement('div');
    stack.className = 'flex max-w-sm flex-col gap-900';
    const states = [
      ['Default', {}],
      ['Error', { value: '', error: 'Choose a delivery method.' }],
      ['Disabled', { disabled: true }],
    ];
    for (const [title, overrides] of states) stack.append(RadioGroup({ ...args, ...overrides, legend: `${args.legend} (${title})` }));
    return stack;
  },
};
