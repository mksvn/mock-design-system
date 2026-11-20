import { Tooltip } from './Tooltip.js';
import { Button } from '../Button/Button.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

export default {
  title: 'Components/Tooltip',
  args: {
    text: 'Changes are saved automatically.',
    triggerLabel: 'Save',
  },
  argTypes: {
    text: { control: 'text', description: 'Tooltip text; also the trigger’s accessible description.' },
    triggerLabel: { control: 'text', description: 'Story only: label of the Button used as the trigger.' },
  },
  parameters: { design: figma('18-921') },
  render: ({ text, triggerLabel }) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'p-1100';
    wrapper.append(Tooltip({ text, trigger: Button({ label: triggerLabel, variant: 'outline' }) }));
    return wrapper;
  },
};

/** Hover over the button, or tab to it, to show the tooltip. Escape hides it. */
export const Default = {};

// Shows the tooltip without hovering so it can be compared with Figma.
export const AllStates = {
  name: 'All states',
  render: ({ text, triggerLabel }) => {
    const row = document.createElement('div');
    row.className = 'flex items-start gap-1100 p-1100';
    for (const [title, open] of [['Hidden', false], ['Shown', true]]) {
      const cell = document.createElement('div');
      // Leaves room above the button for the open tooltip (32px + 8px gap).
      cell.className = 'flex flex-col items-start gap-1100';
      const caption = document.createElement('p');
      caption.className = 'text-paragraph-sm text-text-body';
      caption.textContent = title;
      const tooltip = Tooltip({ text, trigger: Button({ label: triggerLabel, variant: 'outline' }) });
      cell.append(caption, tooltip);
      row.append(cell);
      if (open) setTimeout(() => tooltip.show());
    }
    return row;
  },
};
