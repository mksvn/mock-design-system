# Mock Design System

A component library built from the Figma file **Mock Design System**
(`https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System`, file key `2X8ywIHUSdHClnRijAI4Dk`).
Pages: `01 · Foundations` (node `0:1`), `02 · Components` (`18:1300`), `03 · Icons` (`6:23`).

## Stack

- Vite + Storybook 10 (`@storybook/html-vite`) + Tailwind CSS v4 (`@tailwindcss/vite`), plain JavaScript (ES modules).
- No React, TypeScript, shadcn, or UI/icon libraries. Don't add dependencies without asking.
- `npm run storybook` (port 6006). A Storybook started before a new file existed can miss that file's Tailwind classes: restart it.

## Components

- One folder per component: `src/components/Name/Name.js` + `Name.stories.js`.
- `export function Name(props)` takes a props object and returns a semantic DOM element (`<button>`, `<a>`, `<input>`…). No templating library, no `innerHTML` for user text (use `textContent`).
- Reference: `src/components/Button/Button.js`.

## Tokens

- Use **only** tokens from the `@theme` block in `src/styles.css`. Never arbitrary values (`h-[48px]`, `bg-[#007969]`).
- If a Figma value has no token, **stop and ask**. Don't invent a token or hard-code the value.
- Tailwind's default palette is reset (`--color-*: initial`), so only Figma colors exist (`bg-white` won't work; use `bg-neutral-white`).
- Border and outline widths have no tokens. Use Tailwind's built-in `border`, `border-2`, `outline-2`… (these match Figma's Border width/sm, md, lg).
- Figma variable → CSS variable → class (paths become lowercase kebab-case):

  | Figma | CSS variable | Class |
  |---|---|---|
  | `Primary/700`, `forest/700` | `--color-primary-700`, `--color-forest-700` | `bg-primary-700` |
  | `Text/on-action`, `Surface/disabled`, `Border/focus` | `--color-text-on-action`… | `text-text-on-action`, `bg-surface-disabled`, `border-border-focus` |
  | `Scale/400` | `--spacing-400` (1rem = 16px) | `p-400`, `gap-200`, `h-900` |
  | `Border radius/lg` | `--radius-lg` | `rounded-lg` |
  | `Font family/Body` | `--font-body` | `font-body` |
  | `Font weight/Medium` | `--font-weight-medium` | `font-medium` |
  | Text style `Typography/paragraph md/medium` | `--text-paragraph-md-medium` (+ `--line-height`, `--font-weight`) | `text-paragraph-md-medium` |

- A `text-*` style class sets size, line height and weight together. Headings take values from the Figma "Responsive" collection: Mobile in `@theme`, Desktop from 64rem (1024px) up.
- Values are resolved (no `var()` chains). Sizes are in rem. Prefer semantic tokens (`primary-*`, `text-*`, `surface-*`) over primitives (`forest-*`).
- `src/foundations/tokens.js` lists the same tokens for the Foundations/Tokens story. When tokens change, update both files and check that story shows no red (mismatched) values.

## Interaction states

- Hover, focus and active are CSS, **never props**. Apply them only when the control is usable, e.g. `enabled:not-aria-busy:hover:bg-primary-800`.
- Disabled: the native `disabled` attribute plus `disabled:` variants with the disabled tokens (`surface-disabled`, `text-disabled`, `icons-disabled`). Never opacity.
- Focus ring: `focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-700`. The outline follows the radius, which gives Figma's 12px ring on an 8px corner.
- Loading (when a component has it): `aria-busy="true"`, stays focusable, clicks blocked with a capture-phase listener, and the size doesn't change.

## Accessibility

- Native elements first. Add ARIA only when no native element or attribute does the job.
- Everything keyboard operable, with a visible focus ring.
- Animate only with `motion-safe:` (e.g. `motion-safe:animate-spin`).
- Decorative icons get `aria-hidden="true"`. Every control has an accessible name.
- Zero violations in the Storybook a11y addon for every story before committing.

## Icons

- Inline Lucide SVG strings in `src/icons/index.js`, from the official Lucide source, with the ISC notice kept.
- 24×24, `stroke-width="2"`, `stroke="currentColor"`, `aria-hidden="true"`. Use `createIcon(name)`.
- Add an icon only when a component needs it.

## Stories

- Title `Components/Name`. Controls for every prop, set in the default export's `argTypes`.
- Callbacks: `onClick: fn()` from `storybook/test`, so calls appear in the Actions panel.
- Optional values: a `none` option mapped to `null` (`mapping: { none: null }`).
- One story per meaningful variant, plus an **All states** story with them side by side. CSS-only states (hover, focus, active) are forced with classes there and labelled "(simulated)".
- Every story has `parameters.design = { type: 'figma', url: '…?node-id=<node>' }` pointing at its own Figma node (the variant, or the component set for All states).

## Tailwind gotcha

Tailwind finds classes by scanning source files for complete strings. **Never build class names from pieces**:

```js
// Wrong: Tailwind never sees "bg-primary-700", so it isn't generated.
el.className = `bg-${color}-700`;
// Right: write out full class names, and choose between them in code.
const BG = { primary: 'bg-primary-700', secondary: 'bg-secondary-700' };
```

Data used for classes (like `tokens.js`) must also contain full class names.

## Workflow for a new component

1. Read it from Figma via the Figma MCP: `create_session`, then `get_design_context` and `get_screenshot`, and `use_figma` (read-only) for variants, component properties and bound variables. Load the Figma skill each tool requires first.
2. Map every value to a token. Stop and ask if one is missing.
3. Build `Name.js` and `Name.stories.js` following the rules above.
4. Verify in the browser: computed styles for each state match Figma, the keyboard works, and there are no console errors.
5. Run the a11y addon on every story and fix all violations.
6. Commit only that component's files, with the message `Add <Name>`.
