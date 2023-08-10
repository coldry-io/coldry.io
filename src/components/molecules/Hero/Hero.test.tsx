import { fireEvent, render, screen } from '@/tests/test-utils';
import mockRouter from 'next-router-mock';

import Hero from '.';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('Hero', () => {
  it('should render the hero section', () => {
    render(<Hero />);

    // TEST: Hero section should render
    screen.getByRole('button', { name: /Get Started Now/ });
    screen.getByRole('heading', { name: /Elevate your sales and client experience efforts/ });
    screen.getByRole('img', { name: /Demo Video/ });

    // TEST: Clicking the Get Started Now button should redirect to /signup
    fireEvent.click(screen.getByRole('button', { name: /Get Started Now/ }));

    expect(mockRouter).toMatchObject({
      asPath: '/signup',
      pathname: '/signup'
    });
  });
});
