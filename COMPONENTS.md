# Component build checklist

Every component in the Figma file **Mock Design System**, in build order, with the decisions made
about how each one maps to code. Read from Figma on 2026-11-19: 22 components and component sets,
all on page `02 · Components` (`18:1300`). Page `03 · Icons` (`6:23`) holds 2,044 Lucide icons;
add each one to `src/icons/index.js` when a component needs it.

How to read this list:

- **Node**: the Figma node ID to build from (in URLs, `:` is written as `-`). "Not in Figma" means
  the component comes from a decision below and has no Figma design yet (see Figma fixes).
- **Properties**: Figma variant properties first, then other properties, then the code API where it
  differs. States marked *(CSS)* become CSS states, not props (see CLAUDE.md).
- **Depends on**: components it is built from. Icons are listed separately.
- Every Figma component uses variables for its colors, spacing and type (no hard-coded values).

## Decisions

1. **Button** gets `variant: "solid" | "outline" | "transparent"`, replacing the separate
   Button/Outline and Button/Transparent components.
2. **Form fields**: a bare **Input** primitive plus one **Field** composite (label, control, help
   text, error text), shared by Text field, Select and Textarea. Form/Control is dropped.
3. **Table** is generic, `Table({ columns, rows })`, with the Figma "Members" table as an example
   story. **Pagination** takes `{ current, total }`.
4. **Label** gets an optional `help` prop that renders a focusable button with a Tooltip. No icon
   when `help` is omitted.
5. **Button** gets `tone: "default" | "destructive"`. The rule: destructive swaps the Primary color
   scale for the Error scale, everywhere, in every variant, including the focus ring. Disabled uses
   neutral tokens, so it looks the same in both tones. Colors from Figma, with every Error token
   confirmed to exist:

   | Variant | Default | Hover | Active | Focus ring |
   |---|---|---|---|---|
   | Solid | bg `primary-700` → `error-700` | bg `primary-800` → `error-800` | bg `primary-900` → `error-900` | `primary-700` → `error-700` |
   | Outline | border, text, icon `primary-700` → `error-700` | bg `primary-100` → `error-100`; border, text, icon `primary-800` → `error-800` | bg `primary-200` → `error-200`; border, text, icon `primary-900` → `error-900` | `primary-700` → `error-700` |
   | Transparent | text, icon `primary-700` → `error-700` | bg `primary-100` → `error-100`; text, icon `primary-800` → `error-800` | bg `primary-200` → `error-200`; text, icon `primary-900` → `error-900` | `primary-700` → `error-700` |

   Solid text and icons stay `text-on-action` in both tones. Loading uses the Default colors.
6. **Pagination** previous and next are real links.
7. New composites: **Tabs** (tablist with arrow-key navigation) and **RadioGroup** (`<fieldset>` + `<legend>`).
8. **Button `tone="destructive"`** swaps the Primary scale for the Error scale in every variant and
   state, including the focus ring (Error/700). Outline and transparent destructive buttons mirror
   their primary versions.

## 1. Primitives

No dependencies on other components.

| | Component | Node | Properties / API | Depends on | Icons | HTML |
|---|---|---|---|---|---|---|
| ✅ | **Button**: solid | `15:45` | State: Default, Hover *(CSS)*, Focus *(CSS)*, Active *(CSS)*, Disabled, Loading · Label · Show left/right icon · Left/Right icon | none | badge-plus, arrow-big-right, loader-circle | `<button>` |
| ✅ | **Button**: `variant` prop | `15:76` (outline), `15:107` (transparent) | `variant: "solid" \| "outline" \| "transparent"`, same states | none | same | `<button>` |
| ✅ | **Button**: `tone` prop | Not in Figma (Dialog `18:956` overrides the fill) | `tone: "default" \| "destructive"`: Primary swapped for Error in every variant (decision 5) | none | same | `<button>` |
| ✅ | **Overlay/Tooltip** | `18:921` | Text | none | none | `<div role="tooltip" popover>` + `aria-describedby` on the trigger |
| ✅ | **Input** | Control inside `18:213` ("Input control") | States: Empty, Filled, Hover *(CSS)*, Focus *(CSS)*, Error, Disabled · Placeholder · Leading icon (optional) | none | mail (example) | `<input>` |
| ✅ | **Form/Checkbox** | `18:480` | Selected: Off, On, Mixed · State: Default, Focus *(CSS)*, Disabled · Label | none | check, minus | `<input type="checkbox">` in a `<label>`; Mixed = `.indeterminate` |
| ✅ | **Form/Radio** | `18:520` | Selected: Off, On · State: Default, Focus *(CSS)*, Disabled · Label | none | none | `<input type="radio">` in a `<label>` |
| ✅ | **Form/Switch** | `18:560` | Selected: Off, On · State: Default, Focus *(CSS)*, Disabled · Label | none | none | `<input type="checkbox" role="switch">` in a `<label>` |
| ✅ | **Feedback/Badge** | `18:720` | Tone: Neutral, Success, Warning, Error, Information · Label | none | none | `<span>` |
| ✅ | **Feedback/Alert** | `18:749` | Tone: Success, Warning, Error, Information · Title · Description | none | circle-check, triangle-alert, circle-alert, info | `<div role="status">` (`role="alert"` for urgent errors) |
| ✅ | **Navigation/Tab** | `18:763` | State: Default, Hover *(CSS)*, Selected, Disabled · Label | none | none | `<button role="tab" aria-selected>` (used inside Tabs) |
| ✅ | **Navigation/Pagination item** | `18:774` | State: Default, Hover *(CSS)*, Current, Disabled · Label | none | none | `<a href>`; Current = `aria-current="page"` |
| ✅ | **Navigation/Accordion** | `18:804` | State: Closed, Open · Question · Answer | none | chevron-down | `<details>` + `<summary>` (rotate the chevron rather than swap icons) |
| ✅ | **Data/Table cell** | `18:818` | Type: Header, Body, Numeric · Value | none | none | `<th scope="col">` / `<td>`; Numeric right-aligned with tabular numbers |

## 2. Composites

Built from primitives (and, for the form fields, from Field).

| | Component | Node | Properties / API | Depends on | Icons | HTML |
|---|---|---|---|---|---|---|
| ✅ | **Form/Label** | `18:103` | Required: No, Yes · Label · `help` (optional) | Tooltip | circle-help (only with `help`) | `<label>` + `<button type="button" aria-label>` for help |
| ⬜ | **Field** | Structure of `18:213` (label, control, supporting text) | `label`, `required`, `help`, `helpText`, `error`, plus one control | Form/Label | circle-alert (error) | `<div>`: label `for` the control, help/error via `aria-describedby`, error sets `aria-invalid="true"` |
| ⬜ | **Form/Text field** | `18:213` | State: Empty, Filled, Hover *(CSS)*, Focus *(CSS)*, Error, Disabled · Value · Placeholder · Helper text · Error message · Show label · Leading icon | Field, Input | mail, circle-alert | Field + `<input>` |
| ⬜ | **Form/Select** | `18:634` | State: Empty, Filled, Focus *(CSS)*, Error, Disabled · Value · Placeholder · same Field props as Text field | Field | chevron-down | Field + `<select>` |
| ⬜ | **Form/Textarea** | `18:697` | State: Empty, Filled, Focus *(CSS)*, Error, Disabled · Value · Placeholder · same Field props as Text field | Field | none | Field + `<textarea>` |
| ⬜ | **RadioGroup** | Not in Figma | `legend`, `name`, `options`, `value`, `disabled`, `error` | Form/Radio | none | `<fieldset>` + `<legend>` |
| ⬜ | **Tabs** | Not in Figma | `tabs: [{ label, panel }]`, `selected` | Navigation/Tab | none | `role="tablist"` with arrow keys, Home and End; panels are `role="tabpanel"`, linked with `aria-controls` / `aria-labelledby` |
| ⬜ | **Navigation/Pagination** | `18:776` | `{ current, total }`; previous and next are links | Navigation/Pagination item | chevron-left, chevron-right | `<nav aria-label="Pagination">` + `<ul>`; previous/next `<a rel="prev/next">`, with no `href` at the first and last page |
| ⬜ | **Overlay/Dialog** | `18:956` | Intent: Default, Destructive · Title · Description | Button (`variant`, `tone`) | none | `<dialog>` opened with `showModal()`, `aria-labelledby` the title |

## 3. Patterns

Larger reusable sections.

| | Component | Node | Properties / API | Depends on | Icons | HTML |
|---|---|---|---|---|---|---|
| ⬜ | **Table** | `18:918` (table), `18:847` (row) | `Table({ columns, rows })`; row State: Default, Hover *(CSS)*, Selected; Empty state; "Members" example story | Data/Table cell, Button | none | `<table>` with `<caption>`, `<thead>`, `<tbody>`; the empty state is one full-width row |

## Figma fixes

Changes to make in Figma so it matches the code.

1. **Button variants:** merge Button/Solid, Button/Outline and Button/Transparent into one set with a
   *Variant* property (Solid, Outline, Transparent).
2. **Destructive button:** add a *Tone* property (Default, Destructive) to Button, for all three
   variants. Destructive is the Default tone with every Primary variable swapped for its Error
   equivalent (100, 200, 700, 800, 900), including the Error/700 focus ring. Disabled stays the same.
   Then switch Dialog's Destructive intent to this tone instead of overriding the fill.
3. **Label help icon:** add a *Show help* boolean to Form/Label, off by default, and draw the help
   icon as a focusable button with Focus and Hover states that opens Overlay/Tooltip.
4. **Pagination arrows:** replace the bare 20×20 chevron icons with Previous and Next link
   components (24px icons) with Default, Hover, Focus and Disabled states, matching Pagination item.
5. **Containers:** add a **Navigation/Tabs** set (a row of Tabs plus a panel area) and a
   **Form/Radio group** set (legend plus Radios, with error and disabled states).
6. **Consistent form fields:**
   - Make one **Form/Field** component (label, control slot, help text, error text) and use it in
     Text field, Select and Textarea, then delete Form/Control.
   - Give all three fields the same properties: Show label, Required, Helper text, Error message.
   - Give all three the same states: Empty, Filled, Hover, Focus, Error, Disabled.
     Select and Textarea currently have no Hover state and no error-message property.
7. **Icons/on-action:** Button icons are colored with `Text/on-action`. Bind them to
   `Icons/on-action`, which exists but is unused, so icon and text colors can change independently.
8. **Small cleanups:**
   - Button/Solid binds `Border width/sm` to a stroke it doesn't draw; remove that binding.
   - Label the "Members" table and row as examples of the generic Table.
