import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/atoms/Card';
import { UserAuthForm } from '@/components/organisms/UserAuthForm';

import { getAuthSession } from '@/lib/auth';

export default async function LoginPage() {
  const session = await getAuthSession();

  if (session) redirect('/dashboard', RedirectType.replace);

  return (
    <div className="-mt-20 flex h-full min-h-screen flex-col items-center justify-center md:-mt-24">
      <Card className="w-full md:w-[32rem]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>
        <UserAuthForm type="signup" />
      </Card>
    </div>
  );
}
