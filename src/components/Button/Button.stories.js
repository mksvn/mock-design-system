import { fn } from 'storybook/test';
import { Button } from './Button.js';
import { iconNames } from '../../icons/index.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

// "none" in the icon pickers maps to null (icon hidden).
const iconControl = {
  control: 'select',
  options: ['none', ...iconNames],
  mapping: { none: null },
};

export default {
  title: 'Components/Button',
  render: (args) => Button(args),
  args: {
    label: 'Continue',
    leftIcon: 'badge-plus',
    rightIcon: 'arrow-big-right',
    disabled: false,
    loading: false,
    type: 'button',
    onClick: fn(),
  },
  argTypes: {
    label: { control: 'text', description: 'Visible text and accessible name.' },
    leftIcon: { ...iconControl, description: 'Icon before the label, or none.' },
    rightIcon: { ...iconControl, description: 'Icon after the label, or none.' },
    disabled: { control: 'boolean', description: 'Native disabled attribute.' },
    loading: {
      control: 'boolean',
      description: 'Spinner replaces the left icon, right icon hidden, aria-busy="true", clicks ignored.',
    },
    type: { control: 'inline-radio', options: ['button', 'submit', 'reset'] },
    onClick: { control: false, description: 'Click handler. Calls appear in the Actions panel.' },
  },
  parameters: { design: figma('15-45') },
};

export const Default = {
  parameters: { design: figma('15-20') },
};

export const NoIcons = {
  name: 'No icons',
  args: { leftIcon: 'none', rightIcon: 'none' },
  parameters: { design: figma('15-113') },
};

export const LeftIconOnly = {
  name: 'Left icon only',
  args: { rightIcon: 'none' },
  parameters: { design: figma('15-121') },
};

export const Disabled = {
  args: { disabled: true },
  parameters: { design: figma('15-214') },
};

export const Loading = {
  args: { loading: true },
  parameters: { design: figma('15-220') },
};

// Hover, Focus and Active are CSS states, so this story forces their look with
// classes to show them next to each other. The buttons in the other stories show
// the real states when you hover, tab to or press them.
const FORCED_STATE_CLASSES = {
  Hover: ['bg-primary-800!'],
  Focus: ['outline-2', 'outline-offset-4', 'outline-primary-700'],
  Active: ['bg-primary-900!'],
};

export const AllStates = {
  name: 'All states',
  argTypes: {
    disabled: { table: { disable: true } },
    loading: { table: { disable: true } },
  },
  parameters: { design: figma('15-45') },
  render: (args) => {
    const states = [
      ['Default', {}],
      ['Hover', {}],
      ['Focus', {}],
      ['Active', {}],
      ['Disabled', { disabled: true }],
      ['Loading', { loading: true }],
    ];
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-2 gap-600 sm:grid-cols-3 lg:grid-cols-6';
    for (const [state, overrides] of states) {
      const cell = document.createElement('div');
      cell.className = 'flex flex-col items-center gap-400';
      const caption = document.createElement('p');
      caption.className = 'text-paragraph-sm text-text-body';
      caption.textContent = FORCED_STATE_CLASSES[state] ? `${state} (simulated)` : state;
      const button = Button({ ...args, ...overrides });
      if (FORCED_STATE_CLASSES[state]) button.classList.add(...FORCED_STATE_CLASSES[state]);
      cell.append(caption, button);
      grid.append(cell);
    }
    return grid;
  },
};
