import { Field } from './Field.js';
import { Input } from '../Input/Input.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

// Field wraps any control. These stories use Input; Text field, Select and Textarea are the
// ready-made combinations.
export default {
  title: 'Components/Field',
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'max-w-sm pt-1100';
    wrapper.append(
      Field({ ...args, control: Input({ placeholder: 'Enter your email address', type: 'email', invalid: Boolean(args.error), disabled: args.disabled }) }),
    );
    return wrapper;
  },
  args: {
    label: 'Email address',
    help: 'We’ll only use this to contact you.',
    error: '',
    required: true,
    disabled: false,
    labelHelp: '',
  },
  argTypes: {
    label: { control: 'text' },
    help: { control: 'text', description: 'Help text below the control (aria-describedby).' },
    error: { control: 'text', description: 'Replaces the help text; sets aria-invalid and aria-describedby.' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    labelHelp: { control: 'text', description: 'Tooltip help next to the label.' },
    control: { control: false, description: 'The control element (Input, select box, textarea box).' },
  },
  parameters: { design: figma('18-213') },
};

export const Default = {};
export const WithError = { name: 'With error', args: { error: 'This email is already registered.' } };
export const Disabled = { args: { disabled: true } };

export const AllStates = {
  name: 'All states',
  argTypes: { error: { table: { disable: true } }, disabled: { table: { disable: true } } },
  render: (args) => {
    const stack = document.createElement('div');
    stack.className = 'flex max-w-sm flex-col gap-600 pt-1100';
    const states = [
      ['Help', {}],
      ['Error', { error: 'This email is already registered.' }],
      ['Disabled', { disabled: true }],
    ];
    for (const [title, overrides] of states) {
      const props = { ...args, ...overrides, label: `${args.label} (${title})` };
      stack.append(Field({ ...props, control: Input({ type: 'email', invalid: Boolean(props.error), disabled: props.disabled }) }));
    }
    return stack;
  },
};
