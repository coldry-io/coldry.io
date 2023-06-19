/* eslint testing-library/no-node-access: 0 */
import { render, screen } from '@testing-library/react';

import { PasswordStrength } from '.';

describe('PasswordStrength', () => {
  it('should render grey', () => {
    render(<PasswordStrength data-testid="pas" password="Pas" />);

    // TEST: Should render grey
    expect(screen.getByTestId('pas').querySelector('div')).toHaveClass('bg-gray-200');
  });

  it('should render yellow', () => {
    render(<PasswordStrength data-testid="password" password="Password" />);

    // TEST: Should render yellow
    expect(screen.getByTestId('password').querySelector('div')).toHaveClass('bg-yellow-400');
  });

  it('should render orange', () => {
    render(<PasswordStrength data-testid="password12" password="Password12" />);

    // TEST: Should render orange
    expect(screen.getByTestId('password12').querySelector('div')).toHaveClass('bg-orange-400');
  });

  it('should render green', () => {
    render(<PasswordStrength data-testid="password123!" password="Password123!" />);

    // TEST: Should render green
    expect(screen.getByTestId('password123!').querySelector('div')).toHaveClass('bg-green-400');
  });
});
