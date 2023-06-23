import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '.';

export default {
  title: 'Atoms/Switch',
  component: Switch
} as Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

export const Unchecked: Story = {
  render: () => <Switch checked={false} />
};

export const Checked: Story = {
  render: () => <Switch checked={true} />
};
