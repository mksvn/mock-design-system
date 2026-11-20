import { fn } from 'storybook/test';
import { Dialog } from './Dialog.js';
import { Button } from '../Button/Button.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

// A trigger button that opens the dialog; focus returns to it on close.
function withTrigger(args, triggerLabel) {
  const dialog = Dialog(args);
  const trigger = Button({
    label: triggerLabel,
    variant: args.intent === 'destructive' ? 'outline' : 'solid',
    tone: args.intent === 'destructive' ? 'destructive' : 'default',
    onClick: () => dialog.showModal(),
  });
  const wrapper = document.createElement('div');
  wrapper.append(trigger, dialog);
  return { wrapper, dialog };
}

export default {
  title: 'Components/Dialog',
  render: (args) => withTrigger(args, 'Open dialog').wrapper,
  args: {
    title: 'Confirm your action',
    description: 'Review the details before continuing.',
    intent: 'default',
    cancelLabel: 'Cancel',
    onConfirm: fn(),
    onCancel: fn(),
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    intent: { control: 'inline-radio', options: ['default', 'destructive'] },
    confirmLabel: { control: 'text', description: 'Defaults to Confirm, or Delete when destructive.' },
    cancelLabel: { control: 'text' },
    onConfirm: { control: false },
    onCancel: { control: false, description: 'Also called on Escape.' },
  },
  parameters: { design: figma('18-956') },
};

/** Click the button to open the dialog. Escape or Cancel closes it and focus returns to the button. */
export const Default = {};

export const Destructive = {
  args: { intent: 'destructive', title: 'Delete this project?', description: 'This removes the project and its files for everyone. You can’t undo this.' },
  render: (args) => withTrigger(args, 'Delete project').wrapper,
};

/** Opens on load, to compare with Figma. */
export const Open = {
  render: (args) => {
    const { wrapper, dialog } = withTrigger(args, 'Open dialog');
    setTimeout(() => dialog.showModal());
    return wrapper;
  },
};

// Both intents side by side, shown in the page flow (not modal) so they can be compared.
export const AllStates = {
  name: 'All states',
  argTypes: { intent: { table: { disable: true } } },
  render: (args) => {
    const stack = document.createElement('div');
    stack.className = 'flex flex-col gap-600';
    for (const intent of ['default', 'destructive']) {
      const dialog = Dialog({ ...args, intent, title: `${args.title} (${intent})` });
      dialog.classList.add('static');
      stack.append(dialog);
      setTimeout(() => dialog.show());
    }
    return stack;
  },
};
