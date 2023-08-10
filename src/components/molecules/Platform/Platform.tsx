'use client';

import chrome from '@/public/images/chrome-logo.svg';
import logo from '@/public/images/icon.png';
import { Plus } from 'lucide-react';
import Image from 'next/image';

const Platform: React.FC<React.HtmlHTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div
        className="container flex w-full flex-col gap-4 lg:mx-auto lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-12 lg:gap-y-20 lg:px-8 lg:py-5"
        {...props}
      >
        <h2 className="col-span-2 text-4xl font-semibold sm:text-5xl lg:text-6xl">Platform</h2>

        <h3 className="col-span-2 text-2xl lg:text-3xl">Chrome Extension</h3>

        <p className="text-lg lg:text-xl">
          Craft compelling cold emails or support messages right from your browser with ease.
        </p>
        <div className="flex items-center gap-8">
          <Image src={logo} width={150} height={150} alt="Coldry Logo" />
          <Plus size={64} />
          <Image src={chrome} width={150} height={150} alt="Chrome Logo" />
        </div>

        <h3 className="col-span-2 text-2xl lg:text-3xl">Dashboard</h3>
      </div>
    </div>
  );
};

export default Platform;
