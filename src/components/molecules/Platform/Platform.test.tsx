import { render, screen } from '@/tests/test-utils';

import Platform from '.';

describe('Platform', () => {
  it('should render the heading', () => {
    render(<Platform />);

    // Assert
    screen.getByRole('heading', { name: /Platform/i });
  });
});
