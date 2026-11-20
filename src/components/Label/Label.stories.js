import { Label } from './Label.js';
import { Input } from '../Input/Input.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

// A label needs a control to point at; stories add an Input below it (disabled with the label).
function withControl(label, id, disabled = false) {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex max-w-sm flex-col gap-200 pt-1100';
  wrapper.append(label, Input({ id, disabled }));
  return wrapper;
}

export default {
  title: 'Components/Label',
  render: (args) => withControl(Label({ ...args, htmlFor: 'label-demo' }), 'label-demo', args.disabled),
  args: {
    text: 'Email address',
    required: false,
    help: '',
    disabled: false,
  },
  argTypes: {
    text: { control: 'text' },
    required: { control: 'boolean', description: 'Shows "*"; set `required` on the control too.' },
    help: { control: 'text', description: 'Tooltip text behind a "More info" button. Empty = no icon.' },
    disabled: { control: 'boolean' },
    htmlFor: { control: false, description: 'id of the control.' },
    id: { control: false },
  },
  parameters: { design: figma('18-103') },
};

export const Default = {};
export const Required = { args: { required: true } };
export const WithHelp = {
  name: 'With help',
  args: { required: true, help: 'We’ll only use this to contact you about your account.' },
};

export const AllStates = {
  name: 'All states',
  argTypes: { required: { table: { disable: true } }, help: { table: { disable: true } }, disabled: { table: { disable: true } } },
  render: (args) => {
    const stack = document.createElement('div');
    stack.className = 'flex flex-col gap-600';
    const states = [
      ['Optional', {}],
      ['Required', { required: true }],
      ['Required with help', { required: true, help: 'We’ll only use this to contact you.' }],
      ['Disabled', { required: true, help: 'We’ll only use this to contact you.', disabled: true }],
    ];
    states.forEach(([title, overrides], i) => {
      const id = `label-state-${i}`;
      stack.append(withControl(Label({ ...args, ...overrides, text: `${args.text} (${title})`, htmlFor: id }), id, overrides.disabled));
    });
    return stack;
  },
};
