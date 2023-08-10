import Hero from '@/components/molecules/Hero/Hero';
import Platform from '@/components/molecules/Platform/Platform';
import Solutions from '@/components/molecules/Solutions';

const HomePage = () => (
  <div className="flex w-full flex-col items-center justify-center py-2">
    <Hero />
    <Solutions />
    <Platform />
  </div>
);

export default HomePage;
