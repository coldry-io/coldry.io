import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const defaultStyles =
  'flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ';

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return <input className={cn(defaultStyles, className)} ref={ref} {...props} />;
  }
);
Input.displayName = 'Input';

export default Input;
