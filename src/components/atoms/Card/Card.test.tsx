import { render, screen } from '@/tests/test-utils';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '.';

describe('Card', () => {
  it('should render the card and the components', () => {
    render(
      <Card className="w-full md:w-[32rem]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
      </Card>
    );

    // TEST: Card should render
    screen.getByRole('heading', { name: /Card Title/i });
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });
});
