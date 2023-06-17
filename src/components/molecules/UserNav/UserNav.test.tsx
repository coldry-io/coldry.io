import { render } from '@/tests/test-utils';

import UserNav from '.';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('UserNav', () => {
  it('should render the UserNav', () => {
    const user = {
      id: '1',
      image: 'https://randomuser.me/api/portraits/men/18.jpg',
      name: 'Brayden Olson',
      username: 'brayden.olson',
      email: 'brayden.olson@example.com'
    };

    const { asFragment } = render(<UserNav user={user} />);

    // TEST: should render the UserNav
    expect(asFragment()).toMatchSnapshot();
  });
});
