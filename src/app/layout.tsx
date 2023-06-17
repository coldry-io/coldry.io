import '@/styles/globals.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import { TailwindIndicator } from '@/components/dev/TailwindIndicator';
import Navbar from '@/components/organisms/Navbar';
import { Toaster } from '@/components/providers/ToastProvider';

import { getAuthSession } from '@/lib/auth';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Coldry',
    template: '%s | Coldry'
  },
  description: 'Artificial Intelligence Cold Email Solutions'
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const session = await getAuthSession();

  return (
    <html lang="en" className={cn('bg-white text-slate-900 antialiased', inter.className)}>
      <body className="min-h-screen bg-white pt-12 antialiased" suppressHydrationWarning>
        <Navbar session={session} />
        <div className="container mx-auto h-full max-w-7xl px-4 pt-8 md:px-0 md:pt-12">
          {children}
        </div>

        <TailwindIndicator />
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
