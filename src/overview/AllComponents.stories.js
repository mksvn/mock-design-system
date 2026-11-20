import { Button } from '../components/Button/Button.js';
import { Tooltip } from '../components/Tooltip/Tooltip.js';
import { Input } from '../components/Input/Input.js';
import { Checkbox } from '../components/Checkbox/Checkbox.js';
import { Radio } from '../components/Radio/Radio.js';
import { Switch } from '../components/Switch/Switch.js';
import { Badge } from '../components/Badge/Badge.js';
import { Alert } from '../components/Alert/Alert.js';
import { Accordion } from '../components/Accordion/Accordion.js';
import { Label } from '../components/Label/Label.js';
import { Field } from '../components/Field/Field.js';
import { TextField } from '../components/TextField/TextField.js';
import { Select } from '../components/Select/Select.js';
import { Textarea } from '../components/Textarea/Textarea.js';
import { RadioGroup } from '../components/RadioGroup/RadioGroup.js';
import { Tabs } from '../components/Tabs/Tabs.js';
import { Pagination } from '../components/Pagination/Pagination.js';
import { Dialog } from '../components/Dialog/Dialog.js';
import { Table } from '../components/Table/Table.js';

// One example of every component, in checklist order. Tab, Pagination item and Table cell are
// shown inside Tabs, Pagination and Table, where they belong.

function section(title, note, ...content) {
  const el = document.createElement('section');
  el.className = 'flex flex-col gap-400';
  const heading = document.createElement('h2');
  heading.className = 'text-h6 text-text-headings';
  heading.textContent = title;
  el.append(heading);
  if (note) {
    const p = document.createElement('p');
    p.className = 'text-paragraph-sm text-text-body';
    p.textContent = note;
    el.append(p);
  }
  const body = document.createElement('div');
  body.className = 'flex flex-wrap items-start gap-400';
  body.append(...content);
  el.append(body);
  return el;
}

function column(...children) {
  const el = document.createElement('div');
  el.className = 'flex w-full max-w-sm flex-col gap-200';
  el.append(...children);
  return el;
}

// Like column(), with room between whole fields.
function fields(...children) {
  const el = column(...children);
  el.classList.replace('gap-200', 'gap-600');
  return el;
}

function wide(child) {
  const el = document.createElement('div');
  el.className = 'w-full';
  el.append(child);
  return el;
}

function dialogExample() {
  const dialog = Dialog({
    title: 'Delete this project?',
    description: 'This removes the project and its files for everyone. You can’t undo this.',
    intent: 'destructive',
  });
  const trigger = Button({ label: 'Delete project', variant: 'outline', tone: 'destructive', onClick: () => dialog.showModal() });
  const wrapper = document.createElement('div');
  wrapper.append(trigger, dialog);
  return wrapper;
}

export default {
  title: 'Overview/All components',
  parameters: { layout: 'fullscreen' },
};

export const AllComponents = {
  name: 'All components',
  render: () => {
    const page = document.createElement('main');
    page.className = 'flex max-w-5xl flex-col gap-900 p-700 font-body';

    const title = document.createElement('h1');
    title.className = 'text-h3 text-text-headings';
    title.textContent = 'All components';

    const labelId = 'overview-label-input';

    page.append(
      title,
      section(
        'Button',
        'Variants solid, outline and transparent; tone default or destructive.',
        Button({ label: 'Continue', leftIcon: 'badge-plus', rightIcon: 'arrow-big-right' }),
        Button({ label: 'Continue', variant: 'outline' }),
        Button({ label: 'Continue', variant: 'transparent' }),
        Button({ label: 'Delete', tone: 'destructive' }),
        Button({ label: 'Saving', loading: true }),
      ),
      section('Tooltip', 'Hover over or tab to the button.', Tooltip({ text: 'Changes are saved automatically.', trigger: Button({ label: 'Save', variant: 'outline' }) })),
      section('Input', null, column(Input({ ariaLabel: 'Email address', type: 'email', placeholder: 'Enter your email address', leadingIcon: 'mail' }))),
      section(
        'Checkbox, Radio, Switch',
        null,
        column(
          Checkbox({ label: 'Email updates', checked: true }),
          Radio({ label: 'Standard delivery', name: 'overview-radio', value: 'standard', checked: true }),
          Switch({ label: 'Email notifications', checked: true }),
        ),
      ),
      section(
        'Badge',
        null,
        Badge({ label: 'Active', tone: 'success' }),
        Badge({ label: 'Pending', tone: 'warning' }),
        Badge({ label: 'Failed', tone: 'error' }),
        Badge({ label: 'Draft' }),
      ),
      section('Alert', null, column(Alert({ title: 'Account notification', description: 'Review the latest information about your account.', tone: 'information' }))),
      section(
        'Accordion',
        null,
        column(Accordion({ question: 'How do I update my account?', answer: 'Open account settings to update your profile, preferences and contact details.' })),
      ),
      section(
        'Label and Field',
        'Label with a help tooltip; Field wrapping an Input.',
        column(Label({ text: 'Workspace name', htmlFor: labelId, required: true, help: 'Shown to everyone in the workspace.' }), Input({ id: labelId })),
        column(Field({ label: 'Website', help: 'Include https://', control: Input({ type: 'url', placeholder: 'https://example.com' }) })),
      ),
      section(
        'Text field, Select, Textarea',
        null,
        fields(
          TextField({ label: 'Email address', type: 'email', required: true, placeholder: 'Enter your email address', help: 'We’ll only use this to contact you.' }),
          Select({ label: 'Country', options: ['United Kingdom', 'Ireland', 'France'], placeholder: 'Choose a country', help: 'Choose your primary location.' }),
          Textarea({ label: 'Message', placeholder: 'Write your message…', error: 'Please add more detail to your message.' }),
        ),
      ),
      section(
        'RadioGroup',
        null,
        column(
          RadioGroup({
            legend: 'Delivery method',
            name: 'overview-delivery',
            value: 'standard',
            options: [
              { value: 'standard', label: 'Standard delivery' },
              { value: 'express', label: 'Express delivery' },
            ],
          }),
        ),
      ),
      section(
        'Tabs',
        'Built from Tab.',
        wide(
          Tabs({
            label: 'Account sections',
            tabs: [
              { label: 'Overview', content: 'A summary of your account and recent activity.' },
              { label: 'Members', content: 'Everyone who can access this workspace.' },
              { label: 'Billing', content: 'Invoices, payment method and plan.' },
            ],
          }),
        ),
      ),
      section('Pagination', 'Built from Pagination item.', Pagination({ current: 3, total: 12, href: (p) => `#page-${p}` })),
      section('Dialog', 'Opens a destructive confirmation.', dialogExample()),
      section(
        'Table',
        'Built from Table cell.',
        wide(
          Table({
            caption: 'Workspace members',
            columns: [
              { key: 'member', label: 'Member' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status' },
              { key: 'seats', label: 'Seats', numeric: true },
            ],
            rows: [
              { member: 'Alex Morgan', role: 'Editor', status: Badge({ label: 'Active', tone: 'success' }), seats: '4' },
              { member: 'Jordan Lee', role: 'Viewer', status: Badge({ label: 'Invited', tone: 'information' }), seats: '1' },
            ],
          }),
        ),
      ),
    );
    return page;
  },
};
