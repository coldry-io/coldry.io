'use client';

interface SolutionBlockProps {
  header: string;
  description: string;
  icon: JSX.Element;
}

const SolutionBlock: React.FC<SolutionBlockProps> = ({ header, description, icon }) => {
  return (
    <div className="grid grid-cols-6 gap-8 rounded-lg border-2 border-primary p-8">
      <div className="col-span-1 flex justify-center">{icon}</div>
      <div className="col-span-5 flex flex-col">
        <h2 className="text-3xl font-semibold">{header}</h2>
        <p className="mt-4 text-lg text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default SolutionBlock;
