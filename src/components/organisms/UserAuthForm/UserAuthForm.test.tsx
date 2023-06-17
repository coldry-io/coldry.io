import { render, screen } from '@/tests/test-utils';

import { UserAuthForm } from '.';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('UserAuthForm', () => {
  it('should render the login version of userauthform', () => {
    render(<UserAuthForm type="login" />);

    // TEST: Check if the login version of the userauthform is rendered
    screen.getByRole('button', { name: /LinkedIn/i });
    screen.getByRole('button', { name: /Google/i });
    screen.getByRole('button', { name: /Login/i });

    expect(screen.getByText('Email')).toBeInTheDocument();
    screen.getByPlaceholderText('example@mail.com');
    screen.getByRole('textbox');
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'email');
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'email');

    expect(screen.getByText('Password')).toBeInTheDocument();
    screen.getByPlaceholderText('Password');
  });

  it('should render the signup version of userauthform', () => {
    render(<UserAuthForm type="signup" />);

    // TEST: Check if the signup version of the userauthform is rendered
    screen.getByRole('button', { name: /LinkedIn/i });
    screen.getByRole('button', { name: /Google/i });
    screen.getByRole('button', { name: /Create account/i });

    expect(screen.getAllByRole('textbox')).toHaveLength(2);

    expect(screen.getByText('Name')).toBeInTheDocument();
    screen.getByPlaceholderText('John Doe');
    expect(screen.getByPlaceholderText('John Doe')).toHaveAttribute('type', 'text');
    expect(screen.getByPlaceholderText('John Doe')).toHaveAttribute('name', 'name');
    expect(screen.getByPlaceholderText('John Doe')).toHaveAttribute('id', 'name');

    expect(screen.getByText('Email')).toBeInTheDocument();
    screen.getByPlaceholderText('example@mail.com');
    expect(screen.getByPlaceholderText('example@mail.com')).toHaveAttribute('type', 'email');
    expect(screen.getByPlaceholderText('example@mail.com')).toHaveAttribute('name', 'email');
    expect(screen.getByPlaceholderText('example@mail.com')).toHaveAttribute('id', 'email');

    expect(screen.getByText('Password')).toBeInTheDocument();
    screen.getByPlaceholderText('Password');
  });
});
