import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarFallback, AvatarImage } from '.';

export default {
  title: 'Atoms/Avatar',
  component: Avatar
} as Meta<typeof Avatar>;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/coldry-io.png" />
      <AvatarFallback>C</AvatarFallback>
    </Avatar>
  )
};
