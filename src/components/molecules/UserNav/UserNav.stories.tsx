import type { Meta, StoryObj } from '@storybook/react';

import UserNav from '.';

export default {
  title: 'Molecules/UserNav',
  component: UserNav,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  }
} as Meta<typeof UserNav>;

type Story = StoryObj<typeof UserNav>;

const user = {
  id: '1',
  image: 'https://randomuser.me/api/portraits/men/18.jpg',
  name: 'Brayden Olson',
  username: 'brayden.olson',
  email: 'brayden.olson@example.com'
};

export const Default: Story = {
  render: () => <UserNav user={user} />
};
