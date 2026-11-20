import { Pagination } from './Pagination.js';

const figma = (nodeId) => ({
  type: 'figma',
  url: `https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=${nodeId}`,
});

export default {
  title: 'Components/Pagination',
  render: (args) => Pagination({ ...args, href: (page) => `#page-${page}` }),
  args: { current: 1, total: 5, label: 'Pagination' },
  argTypes: {
    current: { control: { type: 'number', min: 1 } },
    total: { control: { type: 'number', min: 1 } },
    label: { control: 'text', description: 'Accessible name of the nav.' },
    href: { control: false, description: '(page) => URL for a page.' },
  },
  parameters: { design: figma('18-776') },
};

export const FirstPage = { name: 'First page' };
export const MiddlePage = { name: 'Middle page', args: { current: 3 } };
export const LastPage = { name: 'Last page', args: { current: 5 } };
export const ManyPages = { name: 'Many pages', args: { current: 10, total: 20 } };

export const AllStates = {
  name: 'All states',
  argTypes: { current: { table: { disable: true } }, total: { table: { disable: true } } },
  render: (args) => {
    const stack = document.createElement('div');
    stack.className = 'flex flex-col gap-600';
    const cases = [
      [1, 5],
      [5, 5],
      [3, 20],
      [10, 20],
      [18, 20],
    ];
    for (const [current, total] of cases) {
      stack.append(Pagination({ ...args, current, total, label: `Pagination, page ${current} of ${total}`, href: (page) => `#page-${page}` }));
    }
    return stack;
  },
};
