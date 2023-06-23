import type { Meta, StoryObj } from '@storybook/react';

import { Toggle } from '.';

export default {
  title: 'Atoms/Toggle',
  component: Toggle
} as Meta<typeof Toggle>;

type Story = StoryObj<typeof Toggle>;

export const Unpressed: Story = {
  render: () => (
    <Toggle className="px-4 py-2" pressed={false}>
      Toggle
    </Toggle>
  )
};

export const Pressed: Story = {
  render: () => (
    <Toggle className="px-4 py-2" pressed={true}>
      Toggle
    </Toggle>
  )
};
