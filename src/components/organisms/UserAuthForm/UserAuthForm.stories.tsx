import type { Meta, StoryObj } from '@storybook/react';

import { UserAuthForm } from '.';

export default {
  title: 'Organisms/UserAuthForm',
  component: UserAuthForm,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  }
} as Meta<typeof UserAuthForm>;

type Story = StoryObj<typeof UserAuthForm>;

export const Login: Story = {
  render: () => <UserAuthForm className="bg-white" type="login" />
};

export const Signup: Story = {
  render: () => <UserAuthForm className="bg-white" type="signup" />
};
