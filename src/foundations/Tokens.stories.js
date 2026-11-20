import { colorGroups, spacing, radii, fontFamilies, fontWeights, textStyles } from './tokens.js';

// Each token shows the value Figma reports next to the value the browser actually
// computes from src/styles.css, so drift between the two is visible at a glance.

const FIGMA_FOUNDATIONS = 'https://www.figma.com/design/2X8ywIHUSdHClnRijAI4Dk/Mock-Design-System?node-id=0-1';
const DESKTOP_QUERY = '(width >= 64rem)';

export default {
  title: 'Foundations/Tokens',
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_FOUNDATIONS },
  },
};

// ---------- helpers ----------

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const toHex = (rgb) => {
  const m = rgb.match(/\d+(\.\d+)?/g);
  if (!m) return rgb;
  return '#' + m.slice(0, 3).map((n) => Math.round(+n).toString(16).padStart(2, '0')).join('');
};

const px = (v) => `${Math.round(parseFloat(v) * 100) / 100}px`;

function page(title, intro, body) {
  const root = document.createElement('div');
  root.className = 'min-h-screen bg-surface-page p-700 font-body text-text-body';
  root.innerHTML = `
    <header class="mb-700 max-w-[60rem]">
      <h1 class="text-h3 text-text-headings">${esc(title)}</h1>
      <p class="mt-200 text-paragraph-md text-neutral-default">${intro}</p>
      <p class="mt-200 text-paragraph-sm text-neutral-default">
        <span class="inline-block size-[0.625rem] rounded-full bg-success-default"></span> CSS matches Figma
        <span class="ml-400 inline-block size-[0.625rem] rounded-full bg-error-default"></span> CSS differs from Figma
      </p>
    </header>
    ${body}`;
  // Compare against live computed styles once the story is in the document.
  // (setTimeout, not requestAnimationFrame: rAF never fires in a background tab.)
  setTimeout(() => root.querySelectorAll('[data-check]').forEach(check));
  return root;
}

function section(title, collection, content) {
  return `
    <section class="mb-900">
      <h2 class="text-h5 text-text-headings">${esc(title)}</h2>
      <p class="mb-400 text-paragraph-sm text-neutral-default">Figma collection: ${esc(collection)}</p>
      ${content}
    </section>`;
}

// Mark a token row green or red after reading the computed value from its sample.
function check(row) {
  const sample = row.querySelector('[data-sample]');
  const out = row.querySelector('[data-live]');
  const cs = getComputedStyle(sample);
  let live;
  let expected = row.dataset.expected;
  switch (row.dataset.check) {
    case 'color': live = toHex(cs.backgroundColor); break;
    case 'width': live = px(cs.width); break;
    case 'radius': live = px(cs.borderTopLeftRadius); break;
    case 'family': live = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(); break;
    case 'weight': live = cs.fontWeight; break;
    case 'text': {
      const t = JSON.parse(row.dataset.token);
      const v = matchMedia(DESKTOP_QUERY).matches ? t.desktop : t.mobile;
      expected = `${v.fs}/${v.lh}px · ${t.weight}${t.underline ? ' · underline' : ''}`;
      const underline = cs.textDecorationLine.includes('underline');
      live = `${parseFloat(cs.fontSize)}/${parseFloat(cs.lineHeight)}px · ${cs.fontWeight}${underline ? ' · underline' : ''}`;
      break;
    }
  }
  const ok = live.toLowerCase() === String(expected).toLowerCase();
  out.textContent = ok ? `CSS ${live}` : `CSS ${live} (Figma ${expected})`;
  out.className = ok ? 'text-success-700' : 'font-bold text-error-default';
  row.dataset.match = ok ? 'true' : 'false';
}

const meta = (figma, cssVar, extra = '') => `
  <div class="min-w-0 text-paragraph-xsm">
    <div class="truncate text-paragraph-sm-medium text-text-headings">${esc(figma)}</div>
    <code class="block truncate text-neutral-default">${esc(cssVar)}</code>
    ${extra}
    <div data-live class="text-neutral-default">…</div>
  </div>`;

// ---------- stories ----------

export const Colors = {
  render: () =>
    page(
      'Colors',
      'Every color variable from Figma, with its value in Figma and the color the browser actually draws.',
      colorGroups
        .map((g) =>
          section(
            g.title,
            g.collection,
            `<div class="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-400">
              ${g.tokens
                .map(
                  (t) => `
                <div data-check="color" data-expected="${t.value}" class="overflow-hidden rounded-lg border border-neutral-200">
                  <div data-sample class="${t.className} h-1000 border-b border-neutral-200"></div>
                  <div class="p-200">${meta(t.figma, t.cssVar, `<div class="text-neutral-default">Figma ${t.value}</div>`)}</div>
                </div>`,
                )
                .join('')}
            </div>`,
          ),
        )
        .join(''),
    ),
};

export const Spacing = {
  render: () =>
    page(
      'Spacing',
      'The Scale variables as Tailwind spacing (<code>p-400</code>, <code>gap-200</code>, <code>w-900</code>…). Each bar is drawn with its <code>w-*</code> class.',
      section(
        'Spacing scale',
        spacing.collection,
        `<div class="flex flex-col gap-300">
          ${spacing.tokens
            .map(
              (t) => `
            <div data-check="width" data-expected="${t.px}px" class="grid grid-cols-[14rem_1fr] items-center gap-400">
              ${meta(t.figma, t.cssVar, `<div class="text-neutral-default">Figma ${t.px}px · <code>${t.className}</code></div>`)}
              <div data-sample class="${t.className} h-400 bg-primary-default"></div>
            </div>`,
            )
            .join('')}
        </div>`,
      ),
    ),
};

export const Radii = {
  render: () =>
    page(
      'Border radius',
      'The Border radius variables as Tailwind <code>rounded-*</code> classes.',
      section(
        'Border radius',
        radii.collection,
        `<div class="flex flex-wrap gap-700">
          ${radii.tokens
            .map(
              (t) => `
            <div data-check="radius" data-expected="${t.px}px" class="flex w-[10rem] flex-col gap-200">
              <div data-sample class="${t.className} size-1100 border-2 border-primary-700 bg-primary-100"></div>
              ${meta(t.figma, t.cssVar, `<div class="text-neutral-default">Figma ${t.px}px · <code>${t.className}</code></div>`)}
            </div>`,
            )
            .join('')}
        </div>`,
      ),
    ),
};

export const Typography = {
  render: () => {
    const desktop = matchMedia(DESKTOP_QUERY).matches;
    return page(
      'Typography',
      `Figma text styles as Tailwind <code>text-*</code> classes. Each class sets font size, line height and weight together.
       Headings use the Responsive collection: Mobile values below 1024px, Desktop values from 1024px.
       This canvas is <strong>${desktop ? 'Desktop' : 'Mobile'}</strong> width, so values are checked against Figma's ${desktop ? 'Desktop' : 'Mobile'} mode.`,
      section(
        'Font families',
        fontFamilies.collection,
        `<div class="flex flex-wrap gap-700">
          ${fontFamilies.tokens
            .map(
              (t) => `
            <div data-check="family" data-expected="${t.value}" class="flex flex-col gap-200">
              <div data-sample class="${t.className} text-h4">Aa Bb Cc 123</div>
              ${meta(t.figma, t.cssVar, `<div class="text-neutral-default">Figma ${t.value} · <code>${t.className}</code></div>`)}
            </div>`,
            )
            .join('')}
        </div>`,
      ) +
        section(
          'Font weights',
          fontWeights.collection,
          `<div class="flex flex-wrap gap-700">
            ${fontWeights.tokens
              .map(
                (t) => `
              <div data-check="weight" data-expected="${t.value}" class="flex flex-col gap-200">
                <div data-sample class="${t.className} text-h4">Aa Bb Cc 123</div>
                ${meta(t.figma, t.cssVar, `<div class="text-neutral-default">Figma ${t.value} · <code>${t.className}</code></div>`)}
              </div>`,
              )
              .join('')}
          </div>`,
        ) +
        section(
          'Text styles',
          textStyles.collection,
          `<div class="flex flex-col divide-y divide-neutral-200">
            ${textStyles.tokens
              .map(
                (t) => `
              <div data-check="text" data-token='${JSON.stringify(t)}' class="grid grid-cols-1 items-baseline gap-200 py-400 md:grid-cols-[16rem_1fr] md:gap-400">
                ${meta(
                  t.figma,
                  t.cssVar,
                  `<div class="text-neutral-default"><code>${t.className}</code> · Figma ${
                    t.mobile.fs === t.desktop.fs && t.mobile.lh === t.desktop.lh
                      ? `${t.desktop.fs}/${t.desktop.lh}px`
                      : `Mobile ${t.mobile.fs}/${t.mobile.lh}px, Desktop ${t.desktop.fs}/${t.desktop.lh}px`
                  } · ${t.weight}</div>`,
                )}
                <div data-sample class="${t.className} text-text-headings">The quick brown fox jumps over the lazy dog</div>
              </div>`,
              )
              .join('')}
          </div>`,
        ),
    );
  },
};
