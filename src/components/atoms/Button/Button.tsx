import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const defaultStyles =
  'inline-flex items-center justify-center rounded-md text-sm text-white font-medium transition-colors md:px-16 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-coldry-blue hover:bg-coldry-blue/90 h-10 px-4';

export const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return <button className={cn(defaultStyles, className)} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';
