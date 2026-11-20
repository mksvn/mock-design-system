import { Accordion } from './Accordion.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

export default {
  title: 'Components/Accordion',
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'max-w-xl';
    wrapper.append(Accordion(args));
    return wrapper;
  },
  args: {
    question: 'How do I update my account?',
    answer: 'Open account settings to update your profile, preferences and contact details.',
    open: false,
  },
  argTypes: {
    question: { control: 'text' },
    answer: { control: 'text' },
    open: { control: 'boolean' },
    name: { control: 'text', description: 'Accordions sharing a name open one at a time.' },
  },
  parameters: { design: figma('18-804') },
};

export const Closed = {};
export const Open = { args: { open: true } };

export const AllStates = {
  name: 'All states',
  argTypes: { open: { table: { disable: true } } },
  render: (args) => {
    const stack = document.createElement('div');
    stack.className = 'flex max-w-xl flex-col gap-400';
    stack.append(Accordion({ ...args, open: false }), Accordion({ ...args, open: true }));
    return stack;
  },
};
