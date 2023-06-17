interface ErrorHandlerProps {
  message: string;
  loginError?: boolean;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ message, loginError }) => {
  const errors = {
    Signin: 'Try signing in with a different account.',
    OAuthSignin: 'Try signing in with a different account.',
    OAuthCallback: 'Try signing in with a different account.',
    OAuthCreateAccount: 'Try signing in with a different account.',
    EmailCreateAccount: 'Try signing in with a different account.',
    Callback: 'Try signing in with a different account.',
    OAuthAccountNotLinked:
      'To confirm your identity, sign in with the same account you used originally.',
    CredentialsSignin: 'Sign in failed. Please the details you provided are correct.',
    default: 'Unable to sign in.'
  };

  if (!message) return null;

  return (
    <div className="mb-2 w-full rounded bg-destructive p-4 text-sm text-destructive-foreground animate-in fade-in zoom-in">
      {loginError ? errors[message as keyof typeof errors] : message}
    </div>
  );
};

export default ErrorHandler;
