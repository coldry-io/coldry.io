import { render, screen } from '@/tests/test-utils';

import { ErrorHandler } from '.';

describe('ErrorHandler', () => {
  it('should render the default error', () => {
    render(<ErrorHandler message="default" loginError={true} />);

    // TEST: Default error
    expect(screen.getByText('Unable to sign in.')).toBeInTheDocument();
  });

  it('should render the Signin error', () => {
    render(<ErrorHandler message="Signin" loginError={true} />);

    // TEST: Signin error
    expect(screen.getByText('Try signing in with a different account.')).toBeInTheDocument();
  });

  it('should render the OAuthAccountNotLinked error', () => {
    render(<ErrorHandler message="OAuthAccountNotLinked" loginError={true} />);

    // TEST: OAuthAccountNotLinked error
    expect(
      screen.getByText(
        'To confirm your identity, sign in with the same account you used originally.'
      )
    ).toBeInTheDocument();
  });

  it('should render the CredentialsSignin error', () => {
    render(<ErrorHandler message="CredentialsSignin" loginError={true} />);

    // TEST: CredentialsSignin error
    expect(
      screen.getByText('Sign in failed. Please the details you provided are correct.')
    ).toBeInTheDocument();
  });
});
