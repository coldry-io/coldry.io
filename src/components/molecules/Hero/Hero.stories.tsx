import type { Meta, StoryObj } from '@storybook/react';

import Hero from '.';

export default {
  title: 'Molecules/Hero',
  component: Hero,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  }
} as Meta<typeof Hero>;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  render: () => <Hero />
};
