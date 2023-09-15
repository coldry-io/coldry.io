'use client';

import chrome from '@/public/images/chrome-logo.svg';
import demo from '@/public/images/demo.gif';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/atoms/Button';

const Hero: React.FC<React.HtmlHTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const router = useRouter();

  return (
    <div
      className="container flex min-h-screen w-full flex-col justify-center gap-8 lg:mx-auto lg:grid lg:grid-cols-2 lg:items-center lg:px-8 lg:py-5"
      {...props}
    >
      {/* Left Side */}
      <div className="">
        <h1 className="text-4xl font-semibold lg:text-5xl">
          Elevate your sales and client experience efforts
        </h1>

        <p className="mb-8 mt-4 w-11/12 text-lg text-gray-700">
          Revolutionize your cold email outreach.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:flex">
          <Button
            title="Get Started"
            className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            onClick={() => router.push('/signup')}
          >
            Get Started Now
          </Button>
          <Button
            title="Learn More"
            className="flex gap-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            variant="secondary"
            onClick={() => router.push('/contact')}
          >
            <Image src={chrome} width={20} height={20} alt="Chrome Logo" />{' '}
            <p>Download Extension</p>
          </Button>
        </div>
      </div>

      {/* Right Side */}
      <div className="">
        <div className="relative h-96 w-full lg:min-h-screen">
          <Image src={demo} fill alt="Demo Video" className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
