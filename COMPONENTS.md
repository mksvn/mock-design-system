# Component build checklist

Every component and component set in the Figma file **Mock Design System**, in build order.
Read from Figma on 2026-11-19: 22 components and component sets, all on page `02 · Components`
(`18:1300`). Page `03 · Icons` (`6:23`) holds 2,044 Lucide icons (24×24). Those aren't built as
components; add each one to `src/icons/index.js` when a component needs it.

How to read this list:

- **Node**: the Figma node ID of the component set (open it with `?node-id=` plus the ID, `:` written as `-`).
- **Properties**: variant properties first, then text, boolean and icon-swap properties.
  States marked *(CSS)* become CSS states, not props (see CLAUDE.md).
- **Depends on**: other components it is built from. Icons are listed separately.
- Every component uses variables for its colors, spacing and type (no hard-coded values found).

## 1. Primitives

No dependencies on other components.

| | Component | Node | Properties | Depends on | Icons | HTML |
|---|---|---|---|---|---|---|
| ✅ | **Button** (Solid) | `15:45` | State: Default, Hover *(CSS)*, Focus *(CSS)*, Active *(CSS)*, Disabled, Loading · Label · Show left/right icon · Left/Right icon | none | badge-plus, arrow-big-right, loader-circle | `<button>` |
| ⬜ | **Button: Outline variant** | `15:76` | Same as Solid | Button | same | `<button>` (add a `variant` prop to Button, see flag 1) |
| ⬜ | **Button: Transparent variant** | `15:107` | Same as Solid | Button | same | `<button>` (same `variant` prop) |
| ⬜ | **Overlay/Tooltip** | `18:921` | Text | none | none | `<div role="tooltip" popover>` + `aria-describedby` on the trigger |
| ⬜ | **Form/Label** | `18:103` | Required: No, Yes · Label · Help icon | Tooltip (for the help icon, see flag 4) | circle-help | `<label>` |
| ⬜ | **Form/Checkbox** | `18:480` | Selected: Off, On, Mixed · State: Default, Focus *(CSS)*, Disabled · Label | none | check, minus | `<input type="checkbox">` in a `<label>`; Mixed = `.indeterminate` |
| ⬜ | **Form/Radio** | `18:520` | Selected: Off, On · State: Default, Focus *(CSS)*, Disabled · Label | none | none | `<input type="radio">` in a `<label>` |
| ⬜ | **Form/Switch** | `18:560` | Selected: Off, On · State: Default, Focus *(CSS)*, Disabled · Label | none | none | `<input type="checkbox" role="switch">` in a `<label>` |
| ⬜ | **Feedback/Badge** | `18:720` | Tone: Neutral, Success, Warning, Error, Information · Label | none | none | `<span>` |
| ⬜ | **Feedback/Alert** | `18:749` | Tone: Success, Warning, Error, Information · Title · Description | none | circle-check, triangle-alert, circle-alert, info | `<div role="status">` (`role="alert"` for urgent errors) |
| ⬜ | **Navigation/Tab** | `18:763` | State: Default, Hover *(CSS)*, Selected, Disabled · Label | none | none | `<button role="tab" aria-selected>` (needs a tablist, see flag 7) |
| ⬜ | **Navigation/Pagination item** | `18:774` | State: Default, Hover *(CSS)*, Current, Disabled · Label | none | none | `<a href>` with `aria-current="page"` (or `<button>` for client-side paging) |
| ⬜ | **Navigation/Accordion** | `18:804` | State: Closed, Open · Question · Answer | none | chevron-down, chevron-up | `<details>` + `<summary>` (rotate one chevron instead of swapping icons) |
| ⬜ | **Data/Table cell** | `18:818` | Type: Header, Body, Numeric · Value | none | none | `<th scope="col">` / `<td>`; Numeric right-aligned with tabular numbers |

## 2. Composites

Built from primitives.

| | Component | Node | Properties | Depends on | Icons | HTML |
|---|---|---|---|---|---|---|
| ⬜ | **Form/Text field** | `18:213` | State: Empty, Filled, Hover *(CSS)*, Focus *(CSS)*, Error, Disabled · Value · Placeholder · Helper text · Error message · Show label · Show supporting text · Show leading icon · Leading icon | Form/Label | mail, circle-alert | `<input>` with `<label for>`, help/error via `aria-describedby`, Error = `aria-invalid="true"` |
| ⬜ | **Form/Select** | `18:634` | State: Empty, Filled, Focus *(CSS)*, Error, Disabled · Value · Placeholder · Show supporting text | Form/Label | chevron-down | `<select>` (same label/description wiring) |
| ⬜ | **Form/Textarea** | `18:697` | State: Empty, Filled, Focus *(CSS)*, Error, Disabled · Value · Placeholder · Show supporting text | Form/Label | none | `<textarea>` (same label/description wiring) |
| ⬜ | **Form/Control** | `18:319` | Hint: Hidden, Below · Hint text | Form/Label, Form/Text field | none | Decide before building (flag 2) |
| ⬜ | **Navigation/Pagination** | `18:776` | none (fixed 5 pages) | Navigation/Pagination item | chevron-left, chevron-right | `<nav aria-label="Pagination">` + `<ul>` |
| ⬜ | **Data/Table row** | `18:847` | State: Default, Hover *(CSS)*, Selected | Data/Table cell | none | `<tr>` (Selected = `aria-selected` only in an interactive grid, otherwise a visual state) |
| ⬜ | **Overlay/Dialog** | `18:956` | Intent: Default, Destructive · Title · Description | Button (Solid + Outline) | none | `<dialog>` opened with `showModal()`, `aria-labelledby` the title |

## 3. Patterns

Larger reusable sections.

| | Component | Node | Properties | Depends on | Icons | HTML |
|---|---|---|---|---|---|---|
| ⬜ | **Data/Table** | `18:918` | State: Populated, Empty | Data/Table cell, Data/Table row, Button (Solid) | none | `<table>` with `<caption>`, `<thead>`, `<tbody>`; Empty state in a full-width row |

## Flags

### Duplicates

1. **Three Button sets are one component.** Button/Solid, Button/Outline and Button/Transparent have the
   same properties and states and differ only in color. In code they are one `Button` with a
   `variant` prop: `solid` (built), `outline`, `transparent`. In Figma, merging them into one set
   with a *Variant* property would match the code.
2. **Form/Control duplicates Form/Text field.** Form/Control is a Form/Label, plus a Text field with its
   own label and helper text switched off, plus its own Hint text. Text field already has a label,
   helper text and error message built in. Choose one model before building either:
   - **Recommended:** a bare **Input** primitive (the input box) plus one **Field** composite
     (Label + Input/Select/Textarea + help/error text). Then Text field, Select and Textarea all use
     the same Field, and Control goes away.
   - Or keep Text field as the field and drop Control.

### One-offs (probably not reusable components)

3. **Data/Table row and Data/Table are a "Members" example.** The row always has exactly four cells
   (Member, Role, Status, Seats) and the table has fixed rows. Build a generic `Table({ columns, rows })`
   from Table cell instead, and use the Figma table as its example story.
   **Navigation/Pagination** is similar: a fixed set of 5 pages with no properties. In code it needs
   `current` and `total` props.

### Figma issues to fix before building

4. **Form/Label's help icon can't be hidden.** Its icon can be swapped but there's no
   "Show help icon" property, so every label shows a help icon. It is also a bare icon: as an
   interactive help trigger it needs to be a focusable button with a Tooltip and an accessible name.
5. **Dialog's Destructive intent overrides the button fill.** The Delete button is a Button/Solid
   with its fill overridden to `Error/700`, with no hover, active or focus colors defined. Add a
   destructive tone to Button in Figma (Error 700/800/900), then a `tone` prop in code, before Dialog.
6. **Pagination's previous and next arrows are bare 20×20 icons**, not Pagination items or buttons,
   so they can't be clicked or focused, and they don't use the standard 24px icon size.
7. **No Tabs container.** There's only a single Tab. Tabs need a tablist that handles selection and
   arrow-key navigation, with the panels linked by `aria-controls`. Design a Navigation/Tabs set.
   Radio buttons have the same gap: there's no Radio group (`<fieldset>` + `<legend>`).
8. **Inconsistent field properties.** Text field has Helper text and Error message properties.
   Select and Textarea have a supporting-text layer with no text property, and no error message.
   Text field has a Hover state but Select and Textarea don't. Text field can hide its label
   ("Show label") but Select and Textarea can't.
9. **States drawn as variants.** Hover and Focus appear as variants on Button, Text field, Select,
   Textarea, Checkbox, Radio, Switch, Tab, Pagination item and Table row. That's fine for Figma, but in
   code they're CSS states, not props.
