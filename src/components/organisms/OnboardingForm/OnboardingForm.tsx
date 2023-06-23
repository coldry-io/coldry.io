'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Integrations } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/atoms/Button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/atoms/Card';
import { Toggle } from '@/components/atoms/Toggle';

import { cn } from '@/lib/utils';
import { OnboardingSchema } from '@/lib/validations';

import { toast } from '@/hooks/useToast';

type FormData = z.infer<typeof OnboardingSchema>;

interface OnboardingFormProps extends React.HTMLAttributes<HTMLDivElement> {
  integrations: Integrations[];
  _currentStep?: OnboardingStep;
}

enum OnboardingStep {
  INTEGRATIONS,
  EXTENSION
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({
  integrations,
  _currentStep,
  className,
  ...props
}) => {
  const router = useRouter();
  const [selectedIntegrations, setSelectedIntegrations] = useState<Integrations[]>([]);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(
    _currentStep ?? OnboardingStep.INTEGRATIONS
  );

  const { handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(OnboardingSchema)
  });

  useEffect(() => {
    setValue('integrations', [...selectedIntegrations.map((i) => i.id)]);
  }, [setValue, selectedIntegrations]);

  const handleSelectIntegation = (integration: Integrations) => {
    setSelectedIntegrations((prevIntegrations) => {
      const integrationExists = prevIntegrations.some((i) => i.id === integration.id);

      if (integrationExists) {
        return prevIntegrations.filter((i) => i.id !== integration.id);
      } else {
        return [...prevIntegrations, integration];
      }
    });
  };

  const onSubmit = async ({ integrations }: FormData) => {
    if (currentStep == OnboardingStep.INTEGRATIONS) {
      setCurrentStep(OnboardingStep.EXTENSION);

      await fetch('/api/integrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          integrations
        })
      })
        .then(async (r) => {
          if (r.status === 201) return r.json();
          throw await r.json();
        })
        .then(async (r) => {
          toast({
            title: 'Success',
            description: r.message,
            variant: 'default'
          });
        })
        .catch((e) =>
          toast({
            title: 'Error',
            description: e.message,
            variant: 'destructive'
          })
        );

      return;
    }

    router.push('/dashboard');
  };

  if (currentStep == OnboardingStep.INTEGRATIONS) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Select your integrations</CardTitle>
          <CardDescription>You can always change this later from your dashboard</CardDescription>
        </CardHeader>

        <CardContent className={cn('grid gap-4', className)} {...props}>
          <div className="flex flex-wrap gap-4">
            {integrations.map((integration) => (
              <Toggle
                key={integration.id}
                onClick={() => handleSelectIntegation(integration)}
                pressed={selectedIntegrations.some((i) => i === integration)}
                className="flex cursor-pointer select-none items-center gap-2 rounded px-4 py-2 text-coldry-black transition-transform hover:scale-105"
              >
                <div className="relative h-8 w-10">
                  <Image
                    src={`data:image/png;base64,${integration.image}`}
                    className="pointer-events-none object-contain"
                    alt={integration.name}
                    fill
                  />
                </div>

                <p>{integration.name}</p>
              </Toggle>
            ))}
          </div>
        </CardContent>
        <CardFooter className="grid gap-4 text-center">
          <Button className="w-full">Next</Button>
        </CardFooter>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Add the Coldry extension to your browser</CardTitle>
        {/* FIXME: Change this description */}
        <CardDescription>Fill here later</CardDescription>
      </CardHeader>

      <CardContent className={cn('grid gap-4', className)} {...props}>
        Image and link to add chrome extension here
      </CardContent>
      <CardFooter className="grid gap-4 text-center">
        <Button className="w-full">Dashboard</Button>
      </CardFooter>
    </form>
  );
};

export default OnboardingForm;
