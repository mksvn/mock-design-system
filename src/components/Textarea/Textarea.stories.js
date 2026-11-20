import { fn } from 'storybook/test';
import { Textarea } from './Textarea.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

const frame = (...children) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex max-w-sm flex-col gap-600 pt-1100';
  wrapper.append(...children);
  return wrapper;
};

export default {
  title: 'Components/Textarea',
  render: (args) => frame(Textarea(args)),
  args: {
    label: 'Message',
    value: '',
    placeholder: 'Write your message…',
    rows: 4,
    help: 'Tell us how we can help.',
    error: '',
    required: true,
    disabled: false,
    labelHelp: '',
    name: 'message',
    onInput: fn(),
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: { type: 'number', min: 2, max: 12 } },
    help: { control: 'text' },
    error: { control: 'text', description: 'Replaces the help text; error border and aria-invalid.' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    labelHelp: { control: 'text' },
    name: { control: 'text' },
    onInput: { control: false },
    id: { control: false },
  },
  parameters: { design: figma('18-697') },
};

const VALUE = 'I’d like to learn more about your services.';

export const Empty = {};
export const Filled = { args: { value: VALUE } };
export const ErrorState = { name: 'Error', args: { value: VALUE, error: 'Please add more detail to your message.' } };
export const Disabled = { args: { value: VALUE, disabled: true } };

// Focus is CSS: click into a textarea to see it.
export const AllStates = {
  name: 'All states',
  argTypes: { value: { table: { disable: true } }, error: { table: { disable: true } }, disabled: { table: { disable: true } } },
  render: (args) => {
    const states = [
      ['Empty', {}],
      ['Filled', { value: VALUE }],
      ['Error', { value: VALUE, error: 'Please add more detail to your message.' }],
      ['Disabled', { value: VALUE, disabled: true }],
    ];
    return frame(...states.map(([title, overrides]) => Textarea({ ...args, ...overrides, label: `${args.label} (${title})` })));
  },
};
