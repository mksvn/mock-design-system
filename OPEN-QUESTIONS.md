# Open questions

Judgment calls made while building the components in COMPONENTS.md without stopping to ask.
Each entry: what was unclear, what was chosen, and why. Review these and tell me which to change.

| # | Component | Question | What I chose | Why |
|---|---|---|---|---|
| 1 | All | Figma frames have fixed example widths (Tooltip 320, fields 352, Alert/Accordion/Dialog 560, Table 1120px) with no spacing token. | Components are fluid (`w-full` or hug content) and the container sets the width. Where a maximum width matters I used Tailwind's built-in container sizes: Tooltip `max-w-xs` (320px), Dialog `max-w-xl` (576px). | No token exists for these widths, and they look like artboard sizes rather than component rules. Built-in container sizes aren't arbitrary values. |
| 2 | Tooltip | Figma doesn't say where the tooltip sits or how it's positioned. | Above the trigger, centered, 8px gap (Scale/200), flipping below when there's no room. Placed with a few lines of JS on a `popover="manual"` element. | CSS anchor positioning isn't in every browser we can assume yet, and JS positioning is small and predictable. |
| 3 | Tooltip | Should mouse focus (clicking the trigger) also show it? | Shown on hover and on keyboard focus (`:focus-visible`) only. | Matches the spec ("hover and keyboard focus") and avoids a tooltip popping up on every click. |
