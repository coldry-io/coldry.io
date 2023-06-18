import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms/Card';

import { Icons } from '@/lib/utils';

import verifyUser from '@/actions/verifyUser';

interface VerifyPageProps {
  params: {
    token: string;
  };
}

export default async function VerifyPage({ params: { token } }: VerifyPageProps) {
  const verified = await verifyUser(token);

  if (!verified)
    return (
      <div className="-mt-20 flex h-full min-h-screen flex-col items-center justify-center md:-mt-24">
        This link is invalid or has expired.
      </div>
    );

  return (
    <div className="-mt-20 flex h-full min-h-screen flex-col items-center justify-center md:-mt-24">
      <Card className="w-full md:w-[32rem]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>
            Your account has been verified. You can now login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-2">
          <div className="w-fit rounded-full bg-green-500 p-4">
            <Icons.check className="text-white" size={48} />
          </div>
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-md bg-coldry-blue px-4 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-coldry-blue/90 disabled:pointer-events-none disabled:opacity-50 md:px-16"
          >
            Login
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
