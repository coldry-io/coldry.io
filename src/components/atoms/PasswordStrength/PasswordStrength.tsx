import { zxcvbn } from '@zxcvbn-ts/core';
import { forwardRef } from 'react';

interface PasswordStrengthProps extends React.HTMLAttributes<HTMLDivElement> {
  password: string;
}

const PasswordStrength = forwardRef<HTMLDivElement, PasswordStrengthProps>(
  ({ password, ...props }, ref) => {
    const passwordScore = !password || !password.length ? 0 : zxcvbn(password).score;

    const getIndicatorColor = (): string => {
      if (passwordScore >= 4) {
        return 'bg-green-400';
      } else if (passwordScore === 3) {
        return 'bg-orange-400';
      } else if (passwordScore === 2) {
        return 'bg-yellow-400';
      } else if (passwordScore === 1) {
        return 'bg-red-400';
      }

      return 'bg-gray-200';
    };

    return (
      <div className="relative mt-4 h-4 overflow-hidden rounded bg-gray-200" ref={ref} {...props}>
        <div
          className={`h-full ${getIndicatorColor()}`}
          style={{ width: `${(passwordScore / 4) * 100}%` }}
        ></div>
      </div>
    );
  }
);

PasswordStrength.displayName = 'PasswordStrength';

export default PasswordStrength;
