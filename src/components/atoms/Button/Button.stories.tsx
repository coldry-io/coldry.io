import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '.';

export default {
  title: 'Atoms/Button',
  component: Button
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => <Button>Hello</Button>
};
