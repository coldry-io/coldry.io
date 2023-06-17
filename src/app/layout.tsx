import '@/styles/globals.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import { TailwindIndicator } from '@/components/dev/TailwindIndicator';
import { MainProvider } from '@/components/providers/MainProvider';
import { Toaster } from '@/components/providers/ToastProvider';
import { MainLayout } from '@/components/templates/MainLayout';

import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home page | Nextjs boilerplate',
  description:
    '🚀 Boilerplate and Starter for Next.js, Tailwind CSS and TypeScript ⚡️ Made with developer experience first: Next.js, TypeScript, ESLint, Prettier, Husky, Lint-Staged, Jest, React Testing Library, PostCSS, Tailwind CSS, Storybook, Plop, GH actions.'
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={cn('bg-white text-slate-900 antialiased', inter.className)}>
      <body className="min-h-screen bg-white antialiased" suppressHydrationWarning>
        <MainProvider>
          <MainLayout>
            <main>{children}</main>
          </MainLayout>
        </MainProvider>
        <TailwindIndicator />
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
