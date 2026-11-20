import { Badge, BADGE_TONES } from './Badge.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

export default {
  title: 'Components/Badge',
  render: (args) => Badge(args),
  args: { label: 'Active', tone: 'neutral' },
  argTypes: {
    label: { control: 'text' },
    tone: { control: 'inline-radio', options: BADGE_TONES },
  },
  parameters: { design: figma('18-720') },
};

export const Neutral = {};
export const Success = { args: { tone: 'success' } };
export const Warning = { args: { tone: 'warning' } };
export const ErrorTone = { name: 'Error', args: { tone: 'error' } };
export const Information = { args: { tone: 'information' } };

export const AllStates = {
  name: 'All states',
  argTypes: { tone: { table: { disable: true } } },
  render: (args) => {
    const row = document.createElement('div');
    row.className = 'flex flex-wrap items-center gap-400';
    for (const tone of BADGE_TONES) row.append(Badge({ ...args, tone }));
    return row;
  },
};
