import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PasswordStrength } from '.';
import { Input } from '../Input';

export default {
  title: 'Atoms/PasswordStrength',
  component: PasswordStrength
} as Meta<typeof PasswordStrength>;

type Story = StoryObj<typeof PasswordStrength>;

const PasswordStrengthWithInput = () => {
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col">
      <Input type="password" onChange={(e) => setPassword(e.target.value)} />
      <PasswordStrength password={password} />
    </div>
  );
};

export const Default: Story = {
  render: () => <PasswordStrengthWithInput />
};
