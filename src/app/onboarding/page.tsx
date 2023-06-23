import { Metadata } from 'next';
import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

import { Card } from '@/components/atoms/Card';
import { OnboardingForm } from '@/components/organisms/OnboardingForm';

import { getAuthSession } from '@/lib/auth';

import getIntegrations from '@/actions/getIntegrations';

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Get started with Coldry'
};

export default async function Onboarding() {
  const session = await getAuthSession();
  const integrations = await getIntegrations();

  if (session?.user.onboardedAt) redirect('/login', RedirectType.replace);

  return (
    <div className="-mt-20 flex h-full min-h-screen flex-col items-center justify-center md:-mt-24">
      <Card className="w-full md:w-[32rem]">
        <OnboardingForm integrations={integrations} />
      </Card>
    </div>
  );
}
