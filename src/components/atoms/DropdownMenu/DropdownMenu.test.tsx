import { render, screen } from '@/tests/test-utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '.';

describe('DropdownMenu', () => {
  it('should render the dropdown menu', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-neutral-200 p-4">Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    // TEST: should render the dropdown menu
    screen.getByRole('button', { name: 'Open' });
  });
});
