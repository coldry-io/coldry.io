import type { Meta, StoryObj } from '@storybook/react';

import Navbar from '.';

export default {
  title: 'Organisms/Navbar',
  component: Navbar,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  }
} as Meta<typeof Navbar>;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  render: () => <Navbar session={null} />
};
