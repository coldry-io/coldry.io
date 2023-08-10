import { render, screen } from '@/tests/test-utils';

import Solutions from '.';

describe('Solutions', () => {
  it('should render the heading', () => {
    render(<Solutions />);

    // Assert
    screen.getByRole('heading', { name: /Solutions/i });
  });
});
