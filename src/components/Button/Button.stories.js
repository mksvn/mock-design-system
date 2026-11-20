import { fn } from 'storybook/test';
import { Button, BUTTON_VARIANTS, BUTTON_TONES } from './Button.js';
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
    variant: 'solid',
    tone: 'default',
    leftIcon: 'badge-plus',
    rightIcon: 'arrow-big-right',
    disabled: false,
    loading: false,
    type: 'button',
    onClick: fn(),
  },
  argTypes: {
    label: { control: 'text', description: 'Visible text and accessible name.' },
    variant: { control: 'inline-radio', options: BUTTON_VARIANTS },
    tone: {
      control: 'inline-radio',
      options: BUTTON_TONES,
      description: 'Destructive swaps the Primary color scale for the Error scale.',
    },
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

export const Outline = {
  args: { variant: 'outline' },
  parameters: { design: figma('15-76') },
};

export const Transparent = {
  args: { variant: 'transparent' },
  parameters: { design: figma('15-107') },
};

// Figma has no destructive Button yet; Dialog's Destructive intent overrides the fill.
export const Destructive = {
  args: { tone: 'destructive', label: 'Delete', leftIcon: 'none', rightIcon: 'none' },
  parameters: { design: figma('18-956') },
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

// Rows: variant x tone. Columns: default, disabled, loading. Hover, focus and active are
// CSS states: hover over, tab to or press any button to see them.
export const AllStates = {
  name: 'All states',
  argTypes: {
    variant: { table: { disable: true } },
    tone: { table: { disable: true } },
    disabled: { table: { disable: true } },
    loading: { table: { disable: true } },
  },
  parameters: { design: figma('15-2') },
  render: (args) => {
    const columns = [
      ['Default', {}],
      ['Disabled', { disabled: true }],
      ['Loading', { loading: true }],
    ];
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-4 items-center gap-600';
    grid.append(document.createElement('span'));
    for (const [title] of columns) {
      const heading = document.createElement('p');
      heading.className = 'text-paragraph-sm-medium text-text-body';
      heading.textContent = title;
      grid.append(heading);
    }
    for (const variant of BUTTON_VARIANTS) {
      for (const tone of BUTTON_TONES) {
        const rowLabel = document.createElement('p');
        rowLabel.className = 'text-paragraph-sm text-text-body';
        rowLabel.textContent = `${variant} · ${tone}`;
        grid.append(rowLabel);
        for (const [, overrides] of columns) {
          const cell = document.createElement('div');
          cell.append(Button({ ...args, variant, tone, ...overrides }));
          grid.append(cell);
        }
      }
    }
    return grid;
  },
};
