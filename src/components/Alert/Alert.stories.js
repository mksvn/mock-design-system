import { Alert, ALERT_TONES } from './Alert.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

export default {
  title: 'Components/Alert',
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'max-w-xl';
    wrapper.append(Alert(args));
    return wrapper;
  },
  args: {
    title: 'Account notification',
    description: 'Review the latest information about your account.',
    tone: 'information',
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    tone: {
      control: 'inline-radio',
      options: ALERT_TONES,
      description: 'Success and information use role="status"; warning and error use role="alert".',
    },
  },
  parameters: { design: figma('18-749') },
};

export const Information = {};
export const Success = { args: { tone: 'success' } };
export const Warning = { args: { tone: 'warning' } };
export const ErrorTone = { name: 'Error', args: { tone: 'error' } };

export const AllStates = {
  name: 'All states',
  argTypes: { tone: { table: { disable: true } } },
  render: (args) => {
    const stack = document.createElement('div');
    stack.className = 'flex max-w-xl flex-col gap-400';
    for (const tone of ALERT_TONES) stack.append(Alert({ ...args, tone }));
    return stack;
  },
};
