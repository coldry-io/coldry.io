import { render, screen } from '@/tests/test-utils';

import { Switch } from '.';

describe('Switch', () => {
  it('should render an unchecked switch', () => {
    render(<Switch checked={false} />);

    // TEST: The switch should be unchecked.
    expect(screen.getByRole('switch')).not.toBeChecked();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked');
    expect(screen.getByRole('switch')).toHaveAttribute('type', 'button');
    expect(screen.getByRole('switch')).toHaveValue('on');
  });

  it('should render a checked switch', () => {
    render(<Switch checked={true} />);

    // TEST: The switch should be checked.
    expect(screen.getByRole('switch')).toBeChecked();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked');
    expect(screen.getByRole('switch')).toHaveAttribute('type', 'button');
    expect(screen.getByRole('switch')).toHaveValue('on');
  });
});
