import type { Preview } from '@storybook/react';

import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    backgrounds: {
      default: 'light'
    }
  }
};

// This is the place responsible for grouping all decorators from the storybook app
export const decorators = [];

export default preview;
