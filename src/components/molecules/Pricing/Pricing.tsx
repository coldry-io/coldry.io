'use client';

import { motion } from 'framer-motion';

import { Button } from '@/components/atoms/Button';

import { Icons } from '@/lib/utils';

export const Pricing = () => (
  <div
    className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-50"
    id="pricing"
  >
    <h2 className="col-span-2 text-4xl font-semibold sm:text-5xl lg:text-6xl">
      Simple pricing for every need
    </h2>
    <h3 className="col-span-2 text-lg text-gray-600 sm:text-xl lg:text-xl">
      Choose the plan that works for you
    </h3>

    <div className="mx-auto mb-10 w-full px-5 py-10 text-gray-600">
      <div className="mx-auto max-w-4xl md:flex">
        <motion.div
          initial={{ opacity: 0, motion: 'easeInOut', descent: 0, speed: 0.2 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0 }}
          className="mx-auto mb-3 w-full rounded-md bg-white px-8 py-8 shadow shadow-gray-600 md:my-6 md:flex md:w-1/3 md:max-w-none md:flex-col md:px-10 md:py-10"
        >
          <div className="w-full flex-grow">
            <h2 className="mb-4 text-center font-bold uppercase">Basic</h2>
            <h3 className="mb-5 text-center text-4xl font-bold">$20/mo</h3>
            <ul className="mb-8 px-5 text-sm">
              <Feature text="150 Credits" />
              <Feature text="2 Integrations" />
              <Feature text="1 User" />
            </ul>
          </div>
          <div className="w-full">
            <Button
              title="Buy Now"
              className="w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              Buy Now
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, motion: 'easeInOut', descent: 0, speed: 0.2 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.4 }}
          className="mx-auto mb-3 w-full rounded-md bg-white px-8 py-8 shadow shadow-gray-600 md:relative md:z-50 md:-mx-3 md:mb-0 md:flex md:w-1/3 md:max-w-none md:flex-col md:px-10 md:py-10"
        >
          <div className="w-full flex-grow">
            <h2 className="mb-4 text-center font-bold uppercase">Premium</h2>
            <h3 className="mb-5 text-center text-4xl font-bold md:text-5xl">$50/mo</h3>
            <ul className="mb-8 px-5 text-sm">
              <Feature text="450 Credits" />
              <Feature text="4 Integrations" />
              <Feature text="1 User" />
            </ul>
          </div>
          <div className="w-full">
            <Button
              title="Buy Now"
              className="w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              Buy Now
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, motion: 'easeInOut', descent: 0, speed: 0.2 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="mx-auto mb-3 w-full rounded-md bg-white px-8 py-8 shadow shadow-gray-600 md:my-6 md:flex md:w-1/3 md:max-w-none md:flex-col md:px-10 md:py-10"
        >
          <div className="w-full flex-grow">
            <h2 className="mb-4 text-center font-bold uppercase">Ultimate</h2>
            <h3 className="mb-5 text-center text-4xl font-bold">$100/mo</h3>
            <ul className="mb-8 px-5 text-sm">
              <Feature text="1000 Credits" />
              <Feature text="Unlimited Integrations" />
              <Feature text="1 User" />
            </ul>
          </div>
          <div className="w-full">
            <Button
              title="Buy Now"
              className="w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              Buy Now
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

const Feature = ({ text }: { text: string }) => (
  <li className="flex items-center gap-2 leading-tight">
    <Icons.checkMark />
    <p>{text}</p>
  </li>
);
