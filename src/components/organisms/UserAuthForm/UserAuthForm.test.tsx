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

    expect(screen.getAllByRole('textbox')).toHaveLength(3);

    expect(screen.getByText('First Name')).toBeInTheDocument();
    screen.getByPlaceholderText('John');
    expect(screen.getByPlaceholderText('John')).toHaveAttribute('type', 'text');
    expect(screen.getByPlaceholderText('John')).toHaveAttribute('name', 'firstName');
    expect(screen.getByPlaceholderText('John')).toHaveAttribute('id', 'firstName');

    expect(screen.getByText('Last Name')).toBeInTheDocument();
    screen.getByPlaceholderText('Doe');
    expect(screen.getByPlaceholderText('Doe')).toHaveAttribute('type', 'text');
    expect(screen.getByPlaceholderText('Doe')).toHaveAttribute('name', 'lastName');
    expect(screen.getByPlaceholderText('Doe')).toHaveAttribute('id', 'lastName');

    expect(screen.getByText('Email')).toBeInTheDocument();
    screen.getByPlaceholderText('example@mail.com');
    expect(screen.getByPlaceholderText('example@mail.com')).toHaveAttribute('type', 'email');
    expect(screen.getByPlaceholderText('example@mail.com')).toHaveAttribute('name', 'email');
    expect(screen.getByPlaceholderText('example@mail.com')).toHaveAttribute('id', 'email');

    expect(screen.getByText('Password')).toBeInTheDocument();
    screen.getByPlaceholderText('Password');

    expect(screen.getByText('Confirm Password')).toBeInTheDocument();
    screen.getByPlaceholderText('Confirm Password');
  });
});
