import type { Meta, StoryObj } from '@storybook/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '.';

export default {
  title: 'Atoms/Card',
  component: Card
} as Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-full md:w-[32rem]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>Card Content</CardContent>
    </Card>
  )
};
