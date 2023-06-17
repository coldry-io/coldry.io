import { render, screen } from '@/tests/test-utils';

import { Button } from '.';

describe('Button', () => {
  it('should render a button', () => {
    render(<Button>Hello World</Button>);

    // TEST: button is rendered
    screen.getByRole('button', { name: /Hello World/i });
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
