import { render, screen } from '@/tests/test-utils';

import Navbar from '.';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('Navbar', () => {
  it('should render the navbar', () => {
    render(<Navbar session={null} />);

    // TEST: Navbar renders with logo and buttons
    screen.getByRole('img', { name: 'Coldry Logo' });
    screen.getByRole('button', { name: 'Login' });
    screen.getByRole('button', { name: 'Sign Up' });
    screen.getByRole('navigation');
  });
});
