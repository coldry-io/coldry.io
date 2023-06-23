import { render, screen } from '@/tests/test-utils';

import { Toggle } from '.';

describe('Toggle', () => {
  it('should render unpressed toggle', () => {
    render(<Toggle pressed={false}>Toggle</Toggle>);

    // TEST: The toggle should be unpressed.
    expect(screen.getByRole('button')).toHaveTextContent(/Toggle/i);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'off');
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('should render pressed toggle', () => {
    render(<Toggle pressed={true}>Toggle</Toggle>);

    // TEST: The toggle should be pressed.
    expect(screen.getByRole('button')).toHaveTextContent(/Toggle/i);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'on');
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});
