'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/atoms/Button';

const Hero: React.FC<React.HtmlHTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col gap-6 space-y-6 p-4 pb-16 pt-[4.75rem] sm:p-10 xl:flex-row xl:gap-2 2xl:gap-6"
      {...props}
    >
      {/* Left Side */}
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1 px-6 pt-4 xl:pt-36 2xl:px-0">
          <h1 className="text-4xl font-extrabold sm:text-5xl 2xl:text-6xl">
            Revolutionize your <span className="text-coldry-blue">cold email</span> strategy
          </h1>

          <p className="text-black-100 mt-5 text-xl font-light sm:text-2xl">
            Unlock the power of artificial intelligence for your cold email execution. Coldry is the
            ultimate tool for efficient, targeted, and effective outreach.
          </p>

          <Button
            title="Get Started"
            className="text-md mt-4 transform py-6 font-semibold uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-lg md:text-lg"
            onClick={() => router.push('/signup')}
          >
            Get Started Now
          </Button>
        </div>
      </div>

      {/* Right Side */}
      {/* TODO: Fill with proper image */}
      <div className="flex w-full justify-center">
        <div className="relative z-0 -mt-20 h-[590px] w-full md:mt-0 xl:mt-20 xl:h-full xl:w-full">
          <Image
            src="https://cdn.dribbble.com/userupload/5366143/file/original-656f6da20450c1722a342fbc7ecbc6b3.png?compress=1&resize=1600x1200"
            fill
            alt="hero image"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
