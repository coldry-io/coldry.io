import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '.';

export default {
  title: 'Atoms/Input',
  component: Input
} as Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => <Input type="text" placeholder="Text Input" />
};

export const Disabled: Story = {
  render: () => <Input type="text" placeholder="Text Input Disabled" disabled={true} />
};

export const Error: Story = {
  render: () => <Input type="text" placeholder="Text Input with Error" className="border-red-500" />
};

export const Password: Story = {
  render: () => <Input type="password" placeholder="Password" />
};

export const Email: Story = {
  render: () => <Input type="email" placeholder="Email" />
};

export const Number: Story = {
  render: () => <Input type="number" placeholder="Number" />
};
