'use client';

import { BadgeDollarSign, HelpingHand, Workflow } from 'lucide-react';

import SolutionBlock from '../SolutionBlock/SolutionBlock';

const Solutions: React.FC<React.HtmlHTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100">
      <div
        className="container flex w-full flex-col gap-4 lg:mx-auto lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-12 lg:gap-y-20 lg:px-8 lg:py-5"
        {...props}
      >
        <h2 className="col-span-2 text-4xl font-semibold sm:text-5xl lg:text-6xl">Solutions</h2>

        <h3 className="col-span-2 text-xl sm:text-2xl lg:text-3xl">
          Who benefits from Coldry?{' '}
          <span className="bg-coldry-black p-1 px-2 font-bold text-coldry-blue">Everyone</span>
        </h3>

        <SolutionBlock
          icon={<BadgeDollarSign size={84} />}
          header="Sale Teams"
          description="Close deals faster with persuasive and personalized cold emails."
        />
        <SolutionBlock
          icon={<HelpingHand size={84} />}
          header="Customer Success Teams"
          description="Respond effectively and efficiently to inquires and deliver exceptional support"
        />
        <SolutionBlock
          icon={<Workflow size={84} />}
          header="Professionals"
          description="Simplify your email communication and make a lasting impression"
        />
        <SolutionBlock
          icon={<Workflow size={84} />}
          header="Integrations"
          description="Integrate seemlessly with popular tools like SalesForce, Hubspot, Gmail, Outlook, and LinkedIn"
        />
      </div>
    </div>
  );
};

export default Solutions;
