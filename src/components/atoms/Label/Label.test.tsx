import { render, screen } from '@/tests/test-utils';

import { Label } from '.';

describe('Label', () => {
  it('should render the label', () => {
    render(<Label>Default Label</Label>);

    // TEST: Default Label
    expect(screen.getByText('Default Label')).toBeInTheDocument();
  });
});
