import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '.';

export default {
  title: 'Atoms/Label',
  component: Label
} as Meta<typeof Label>;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => <Label>Default Label</Label>
};

export const Error: Story = {
  render: () => <Label className="text-red-500">Error Label</Label>
};
