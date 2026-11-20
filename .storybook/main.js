/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-designs'],
  framework: '@storybook/html-vite',
  // GitHub Pages serves the build under /<repo>/; the deploy workflow sets STORYBOOK_BASE.
  // Locally it's unset and Storybook keeps its default.
  viteFinal: (config) => (process.env.STORYBOOK_BASE ? { ...config, base: process.env.STORYBOOK_BASE } : config),
};
export default config;
