import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

const defaultStyles =
  'flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = (e: React.MouseEvent) => {
      e.preventDefault();
      setShowPassword(!showPassword);

      if (inputRef.current)
        inputRef.current.type = inputRef.current.type === 'password' ? 'text' : 'password';
    };

    if (props.type === 'password') {
      return (
        <div
          className={cn(
            defaultStyles,
            'items-center bg-white px-px focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-400 focus-within:ring-offset-2',
            className
          )}
        >
          <input
            className={cn(
              'w-full rounded-l-md border-none px-3 py-2 focus:outline-none focus:ring-0'
            )}
            ref={ref}
            {...props}
            type={showPassword ? 'text' : 'password'}
          />
          <button tabIndex={-1} className="outline-none" onClick={togglePasswordVisibility}>
            {!showPassword ? <Eye className="mr-3 h-5 w-5" /> : <EyeOff className="mr-3 h-5 w-5" />}
          </button>
        </div>
      );
    }

    return <input className={cn(defaultStyles, className)} ref={ref} {...props} />;
  }
);
Input.displayName = 'Input';

export default Input;
