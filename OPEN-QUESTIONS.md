# Open questions

Judgment calls made while building the components in COMPONENTS.md without stopping to ask.
Each entry: what was unclear, what was chosen, and why. Review these and tell me which to change.

| # | Component | Question | What I chose | Why |
|---|---|---|---|---|
| 1 | All | Figma frames have fixed example widths (Tooltip 320, fields 352, Alert/Accordion/Dialog 560, Table 1120px) with no spacing token. | Components are fluid (`w-full` or hug content) and the container sets the width. Where a maximum width matters I used Tailwind's built-in container sizes: Tooltip `max-w-xs` (320px), Dialog `max-w-xl` (576px). | No token exists for these widths, and they look like artboard sizes rather than component rules. Built-in container sizes aren't arbitrary values. |
| 2 | Tooltip | Figma doesn't say where the tooltip sits or how it's positioned. | Above the trigger, centered, 8px gap (Scale/200), flipping below when there's no room. Placed with a few lines of JS on a `popover="manual"` element. | CSS anchor positioning isn't in every browser we can assume yet, and JS positioning is small and predictable. |
| 3 | Tooltip | Should mouse focus (clicking the trigger) also show it? | Shown on hover and on keyboard focus (`:focus-visible`) only. | Matches the spec ("hover and keyboard focus") and avoids a tooltip popping up on every click. |
| 4 | Global | Stories had a transparent page background, so on a dark OS theme Storybook drew them on a dark canvas. | `styles.css` now sets `body` to `Surface/page` background and `Text/body` color (separate commit). | The design system is light-only and Figma has a Surface/page token for exactly this. |
| 5 | Input | Input needs icons inside the box (leading icon, error indicator), so it can't be a bare `<input>`. | `Input()` returns the styled box (`<div>`) with the native `<input>` inside, available as `box.input`. | Consistent return type whether or not icons are shown. Field finds the native control inside. |
| 6 | Input | Figma's focus state is a 2px Primary/700 border; the Button focus ring (outline outside) doesn't apply. | Focus uses `focus-within`: the 1px border turns Primary/700, plus a 1px inset ring, for 2px without moving the text. Hover is suppressed while focused. | Matches Figma exactly. Text fields show focus on any focus (not only keyboard), which is standard for inputs. |
| 7 | Input | Figma has no "Error + Focus" state. | An invalid input keeps its Error/700 border and gets an Error/700 inset ring when focused. | Keeps the error visible while the user corrects it. |
| 8 | Checkbox, Radio, Switch | Figma has no hover state for these. | No hover style; focus fills the whole row (Primary/100 + 2px Primary/700 inside border), as Figma draws. | Follows Figma; adding a hover state would be inventing design. |
| 9 | Switch, Radio | The switch track radius is a raw 12px in Figma (no variable), and the radio circle has no radius variable. | `rounded-full` (Tailwind's built-in pill/circle). | Same shape, and no radius token is meant for pills. A `Border radius/full` variable in Figma would make it explicit. |
