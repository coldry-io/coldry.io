import type { Meta, StoryObj } from '@storybook/react';

import { ErrorHandler } from '.';

export default {
  title: 'Atoms/ErrorHandler',
  component: ErrorHandler
} as Meta<typeof ErrorHandler>;

type Story = StoryObj<typeof ErrorHandler>;

export const Default: Story = {
  render: () => <ErrorHandler message="Custom error message" />
};

export const Signin: Story = {
  render: () => <ErrorHandler message="Signin" loginError={true} />
};

export const OAuthAccountNotLinked: Story = {
  render: () => <ErrorHandler message="OAuthAccountNotLinked" loginError={true} />
};

export const CredentialsSignin: Story = {
  render: () => <ErrorHandler message="CredentialsSignin" loginError={true} />
};

export const DefaultLoginError: Story = {
  render: () => <ErrorHandler message="default" loginError={true} />
};
