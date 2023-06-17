import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const defaultStyles =
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';

const Label = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return <label className={cn(defaultStyles, className)} ref={ref} {...props} />;
  }
);
Label.displayName = 'Label';

export default Label;
