import { fn } from 'storybook/test';
import { Input } from './Input.js';
import { iconNames } from '../../icons/index.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

export default {
  title: 'Components/Input',
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'max-w-sm';
    wrapper.append(Input(args));
    return wrapper;
  },
  args: {
    type: 'email',
    name: 'email',
    value: '',
    placeholder: 'Enter your email address',
    ariaLabel: 'Email address',
    disabled: false,
    invalid: false,
    required: false,
    leadingIcon: 'none',
    autocomplete: 'email',
    onInput: fn(),
  },
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'search', 'tel', 'url', 'number'] },
    name: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    ariaLabel: { control: 'text', description: 'Accessible name when there is no visible label (Field provides one).' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean', description: 'aria-invalid="true", error border and indicator.' },
    required: { control: 'boolean' },
    leadingIcon: { control: 'select', options: ['none', ...iconNames], mapping: { none: null } },
    autocomplete: { control: 'text' },
    onInput: { control: false },
    id: { control: false },
  },
  parameters: { design: figma('18-213') },
};

export const Empty = {};

export const Filled = {
  args: { value: 'alex@example.com' },
};

export const LeadingIcon = {
  name: 'Leading icon',
  args: { leadingIcon: 'mail' },
};

export const Invalid = {
  args: { value: 'alex@example.com', invalid: true },
};

export const Disabled = {
  args: { value: 'alex@example.com', disabled: true },
};

// Hover and focus are CSS states: hover over or click into any input to see them.
export const AllStates = {
  name: 'All states',
  argTypes: {
    value: { table: { disable: true } },
    disabled: { table: { disable: true } },
    invalid: { table: { disable: true } },
  },
  render: (args) => {
    const states = [
      ['Empty', { value: '' }],
      ['Filled', { value: 'alex@example.com' }],
      ['Leading icon', { value: 'alex@example.com', leadingIcon: 'mail' }],
      ['Invalid', { value: 'alex@example.com', invalid: true }],
      ['Disabled', { value: 'alex@example.com', disabled: true }],
    ];
    const grid = document.createElement('div');
    grid.className = 'grid max-w-sm gap-400';
    for (const [title, overrides] of states) {
      const cell = document.createElement('div');
      cell.className = 'flex flex-col gap-200';
      const caption = document.createElement('p');
      caption.className = 'text-paragraph-sm text-text-body';
      caption.textContent = title;
      cell.append(caption, Input({ ...args, ...overrides, ariaLabel: `Email address (${title})` }));
      grid.append(cell);
    }
    return grid;
  },
};
