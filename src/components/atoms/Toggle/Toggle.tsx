'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as React from 'react';

import { cn } from '@/lib/utils';

const defaultStyles =
  'inline-flex items-center justify-center rounded-md border border-x border-coldry-black text-sm font-medium transition-colors data-[state=on]:border-none data-[state=on]:bg-green-400 data-[state=on]:font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

export const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(defaultStyles, className)} {...props} />
));

Toggle.displayName = TogglePrimitive.Root.displayName;
