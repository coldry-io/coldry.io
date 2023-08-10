import { render, screen } from '@/tests/test-utils';
import { Plus } from 'lucide-react';

import SolutionBlock from '.';

describe('SolutionBlock', () => {
  it('should render the heading', () => {
    render(<SolutionBlock header="Hello" description="World" icon={<Plus />} />);

    // Assert
    screen.getByRole('heading', { name: /Hello/i });
  });
});
