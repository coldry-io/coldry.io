import { render, screen } from '@/tests/test-utils';

import { Avatar, AvatarFallback, AvatarImage } from '.';

describe('Avatar', () => {
  it('should render an image', () => {
    render(
      <Avatar role="img">
        <AvatarImage src="https://github.com/coldry-io.png" />
        <AvatarFallback>C</AvatarFallback>
      </Avatar>
    );

    // TEST: image is rendered
    screen.getByRole('img');
  });
});
