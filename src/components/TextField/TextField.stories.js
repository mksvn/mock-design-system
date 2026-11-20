import { fn } from 'storybook/test';
import { TextField } from './TextField.js';
import { iconNames } from '../../icons/index.js';

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
  title: 'Components/Text field',
  render: (args) => frame(TextField(args)),
  args: {
    label: 'Email address',
    help: 'We’ll only use this to contact you.',
    error: '',
    required: true,
    disabled: false,
    labelHelp: '',
    type: 'email',
    name: 'email',
    value: '',
    placeholder: 'Enter your email address',
    leadingIcon: 'none',
    autocomplete: 'email',
    onInput: fn(),
  },
  argTypes: {
    label: { control: 'text' },
    help: { control: 'text' },
    error: { control: 'text', description: 'Replaces the help text; error border, indicator and aria-invalid.' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    labelHelp: { control: 'text', description: 'Tooltip help next to the label.' },
    type: { control: 'select', options: ['text', 'email', 'password', 'search', 'tel', 'url', 'number'] },
    name: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    leadingIcon: { control: 'select', options: ['none', ...iconNames], mapping: { none: null } },
    autocomplete: { control: 'text' },
    onInput: { control: false },
    id: { control: false },
  },
  parameters: { design: figma('18-213') },
};

export const Empty = {};
export const Filled = { args: { value: 'alex@example.com' } };
export const ErrorState = { name: 'Error', args: { value: 'alex@example.com', error: 'This email is already registered.' } };
export const Disabled = { args: { value: 'alex@example.com', disabled: true } };

// Hover and focus are CSS: hover over or click into a field to see them.
export const AllStates = {
  name: 'All states',
  argTypes: { value: { table: { disable: true } }, error: { table: { disable: true } }, disabled: { table: { disable: true } } },
  render: (args) => {
    const states = [
      ['Empty', {}],
      ['Filled', { value: 'alex@example.com' }],
      ['Leading icon', { value: 'alex@example.com', leadingIcon: 'mail' }],
      ['Error', { value: 'alex@example.com', error: 'This email is already registered.' }],
      ['Disabled', { value: 'alex@example.com', disabled: true }],
    ];
    return frame(...states.map(([title, overrides]) => TextField({ ...args, ...overrides, label: `${args.label} (${title})` })));
  },
};
