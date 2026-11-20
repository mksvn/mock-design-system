# Mock Design System

A 22-component accessible UI library, built in plain JavaScript and Tailwind CSS from a Figma design system, with every value taken from Figma variables.

**Live Storybook:** https://mksvn.github.io/mock-design-system/

## Stack

- **Figma:** the source of truth for components, variables and text styles ([Mock Design System](https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System))
- **Tailwind CSS v4:** every Figma variable and text style becomes a token in one `@theme` block, and the default palette is switched off, so only Figma colors exist
- **Plain JavaScript (ES modules):** each component is a function that returns a native DOM element (`<button>`, `<dialog>`, `<details>`, `<fieldset>`…). No framework, no UI or icon library.
- **Storybook 10** (`@storybook/html-vite`) with Vite, the a11y addon (axe) and the Designs addon, which links each story to its Figma node
- **Lucide icons**, inlined as SVG strings with the ISC notice kept

## Project structure

```
.storybook/              Storybook config, fonts
src/
  styles.css             Design tokens (@theme), generated from Figma variables
  foundations/           Token reference story: compares Figma values with the live CSS
  components/
    Button/
      Button.js          export function Button(props) → <button>
      Button.stories.js  Controls, one story per variant, an "All states" story
    …                    22 components: primitives → composites → patterns
  overview/              "Overview/All components": one example of each
  icons/                 Inline Lucide SVGs and createIcon()
  utils/                 Shared helpers (unique IDs, choice-control rows)
.github/workflows/       Builds Storybook and deploys it to GitHub Pages
CLAUDE.md                The project's rules: tokens, states, accessibility, stories
COMPONENTS.md            Build checklist, design decisions and Figma fixes
OPEN-QUESTIONS.md        Every judgment call made during the build
```

## Running it

Requires Node.js 20.19 or later.

```bash
npm install
npm run storybook        # http://localhost:6006
npm run build-storybook  # static build in storybook-static/
```

## Components

| Group | Components |
|---|---|
| Primitives | Button (solid, outline, transparent; default or destructive), Tooltip, Input, Checkbox, Radio, Switch, Badge, Alert, Tab, Pagination item, Accordion, Table cell |
| Composites | Label, Field, Text field, Select, Textarea, RadioGroup, Tabs, Pagination, Dialog |
| Patterns | Table, with an empty state |

Every story passes the Storybook a11y addon with zero violations. Every control works from the keyboard and shows a visible focus ring. Hover, focus and active are CSS states rather than props. Disabled states use dedicated tokens instead of opacity.

## How it was built

I designed the Figma library: the variables, text styles and components. I also made the design decisions recorded in this repo: the component APIs, the destructive tone, how fields are composed, and which Figma inconsistencies to fix.

The code was implemented with [Claude Code](https://claude.com/claude-code), which read my Figma file through the Figma MCP server. It mapped every value to a token and built each component against the rules in [CLAUDE.md](CLAUDE.md). It also checked computed styles against Figma in the browser and ran the a11y addon on every story. Wherever Figma was silent, it made a judgment call and logged it for my review instead of stopping to ask.

- [COMPONENTS.md](COMPONENTS.md) has the build checklist, the design decisions, and the **Figma fixes**: problems in the design file that the build exposed.
- [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md) lists every judgment call made where Figma was silent, with what was chosen and why.
