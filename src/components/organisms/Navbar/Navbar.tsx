'use client';

import type { Session } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

import { Button } from '@/components/atoms/Button';
import UserNav from '@/components/molecules/UserNav/UserNav';

import { cn, Icons } from '@/lib/utils';

interface NavbarProps {
  session: Session | null;
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (session) {
    return (
      <nav className="fixed inset-x-0 top-0 z-20 w-full border-b border-b-coldry-gray bg-white">
        <div className="mx-auto flex items-center justify-between px-8 py-3 md:px-4 md:py-5 lg:max-w-7xl">
          <Link href="/dashboard">
            <Icons.Logo width={143} height={39} />
          </Link>
          <UserNav user={session.user} />
        </div>
      </nav>
    );
  }

  return (
    <div>
      <nav className="fixed inset-x-0 top-0 z-20 w-full border-b border-b-coldry-gray bg-white">
        <div className="mx-auto justify-between px-8 md:flex md:items-center md:px-4 lg:max-w-7xl">
          <div className="flex items-center justify-between py-3 md:block md:py-5">
            <button
              onClick={() =>
                window.location.pathname === '/'
                  ? window.scrollTo({ top: 0, behavior: 'smooth' })
                  : router.push('/')
              }
            >
              <Icons.Logo width={143} height={39} />
            </button>

            <div className="md:hidden">
              <Button
                className={cn(
                  'rounded-md p-2 px-3',
                  !isOpen &&
                    'border border-coldry-black bg-white text-coldry-black hover:bg-coldry-black hover:text-coldry-white'
                )}
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className={cn('transform transition-transform', isOpen && 'rotate-90')}>
                  {isOpen ? (
                    <Icons.close className="h-5 w-5" />
                  ) : (
                    <Icons.hamburger className="h-5 w-5" />
                  )}
                </div>
              </Button>
            </div>
          </div>
          <span className="mx-8 hidden h-8 w-px bg-coldry-gray md:block" />
          <div className="hidden flex-1 items-center justify-between md:flex">
            <div className="flex gap-x-8 lg:gap-x-16">
              <ScrollLink
                to="solutions"
                smooth={true}
                duration={50}
                className="cursor-pointer hover:text-coldry-blue"
              >
                Solutions
              </ScrollLink>

              <ScrollLink
                to="platform"
                smooth={true}
                duration={50}
                className="cursor-pointer hover:text-coldry-blue"
              >
                Platform
              </ScrollLink>
              <ScrollLink
                to="pricing"
                smooth={true}
                duration={50}
                className="cursor-pointer hover:text-coldry-blue"
              >
                Pricing
              </ScrollLink>
            </div>

            <div className="flex items-center justify-center gap-x-4 lg:gap-x-8">
              <Button
                onClick={() => {
                  setIsOpen(false);
                  router.push('/login');
                }}
                className="border border-coldry-black bg-transparent text-coldry-black hover:bg-coldry-black hover:text-coldry-white"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  setIsOpen(false);
                  router.push('/signup');
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="fixed inset-x-0 top-16 z-10 flex-1 justify-self-center rounded border border-b-coldry-gray bg-white py-4 animate-in slide-in-from-top md:hidden">
          <div className="flex flex-col items-center justify-center gap-y-4 px-4">
            <ScrollLink
              to="solutions"
              smooth={true}
              duration={50}
              className="cursor-pointer select-none bg-transparent text-coldry-black hover:bg-transparent hover:text-coldry-blue"
            >
              Solutions
            </ScrollLink>

            <ScrollLink
              to="platform"
              smooth={true}
              duration={50}
              className="cursor-pointer select-none bg-transparent text-coldry-black hover:bg-transparent hover:text-coldry-blue"
            >
              Platform
            </ScrollLink>
            <ScrollLink
              to="pricing"
              smooth={true}
              duration={50}
              className="cursor-pointer select-none bg-transparent text-coldry-black hover:bg-transparent hover:text-coldry-blue"
            >
              Pricing
            </ScrollLink>

            <div className="flex w-full items-center justify-center gap-x-4 border-t border-t-coldry-gray pt-4">
              <Button
                onClick={() => {
                  router.push('/login');
                  setIsOpen(false);
                }}
                className="w-full border border-coldry-black bg-transparent text-coldry-black hover:bg-coldry-black hover:text-coldry-white"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  router.push('/signup');
                  setIsOpen(false);
                }}
                className="w-full"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
