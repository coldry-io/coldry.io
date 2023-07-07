import { Metadata } from 'next';
import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/atoms/Card';
import { ErrorHandler } from '@/components/atoms/ErrorHandler';
import { UserAuthForm } from '@/components/organisms/UserAuthForm';

import { getAuthSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Log In',
  description: 'Log into your account'
};

export default async function LoginPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getAuthSession();
  const { callbackUrl, error } = searchParams;

  if (!error && callbackUrl) redirect(callbackUrl as string, RedirectType.replace);

  if (session) redirect('/dashboard', RedirectType.replace);

  return (
    <div className="-mt-20 flex h-full min-h-screen flex-col items-center justify-center md:-mt-24">
      <Card className="w-full md:w-[32rem]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Please log in to your account to continue</CardDescription>
          <ErrorHandler message={error as string} loginError={true} />
        </CardHeader>
        <UserAuthForm type="login" />
      </Card>
    </div>
  );
}
