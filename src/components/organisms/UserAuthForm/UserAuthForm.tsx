/* eslint @typescript-eslint/ban-ts-comment: 0 */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/atoms/Button';
import { CardContent, CardFooter } from '@/components/atoms/Card';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';

import { cn, Icons } from '@/lib/utils';
import { LoginSchema, SignupSchema } from '@/lib/validations';

import { toast } from '@/hooks/useToast';

type FormData = z.infer<typeof LoginSchema | typeof SignupSchema>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'login' | 'signup';
}

enum LoadingType {
  GOOGLE = 'GOOGLE',
  LINKEDIN = 'LINKEDIN',
  FORM = 'FORM',
  NONE = 'NONE'
}

const UserAuthForm: React.FC<UserAuthFormProps> = ({ type, className, ...props }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(LoadingType.NONE);

  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    resetField
  } = useForm<FormData>({
    resolver: zodResolver(type === 'login' ? LoginSchema : SignupSchema)
  });

  const linkedInLogin = async () => {
    try {
      setIsLoading(LoadingType.LINKEDIN);
      await signIn('linkedin');
    } catch (error) {
      toast({
        title: 'There was a problem',
        description: 'There was an error logging in with LinkedIn. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(LoadingType.NONE);
    }
  };

  const googleLogin = async () => {
    try {
      setIsLoading(LoadingType.GOOGLE);
      await signIn('google');
    } catch (error) {
      toast({
        title: 'There was a problem',
        description: 'There was an error logging in with Google. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(LoadingType.NONE);
    }
  };

  const handleLogin = async (data: FormData) => {
    await signIn('credentials', {
      ...data,
      redirect: false
    })
      .then((callback) => {
        if (callback?.error) {
          router.replace(`/login?error=${callback.error}`);

          return;
        }
        if (callback?.ok) {
          toast({
            title: 'Success',
            description: 'You have successfully logged in.',
            variant: 'default'
          });

          router.refresh();
          router.push('/dashboard');
        }
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: error.message ?? error,
          variant: 'destructive'
        });
      })
      .finally(() => {
        setIsLoading(LoadingType.NONE);
      });
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(LoadingType.FORM);

    resetField('password');

    if (type === 'login') {
      await handleLogin(data);
    } else {
      await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
          reset();
        })
        .catch((e) =>
          toast({
            title: 'Error',
            description: e.message,
            variant: 'destructive'
          })
        )
        .finally(() => setIsLoading(LoadingType.NONE));

      setIsLoading(LoadingType.NONE);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className={cn('grid gap-4', className)} {...props}>
        <div className="grid grid-cols-2 gap-6">
          <Button
            onClick={() => linkedInLogin()}
            disabled={isLoading === LoadingType.LINKEDIN}
            className="border border-coldry-black bg-transparent text-coldry-black hover:border-[#313335] hover:bg-[#313335] hover:text-coldry-white"
          >
            {isLoading === LoadingType.LINKEDIN ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.LinkedIn className="mr-2 h-4 w-4 object-contain" />
            )}
            LinkedIn
          </Button>
          <Button
            onClick={() => googleLogin()}
            disabled={isLoading === LoadingType.GOOGLE}
            className="border border-coldry-black bg-transparent text-coldry-black hover:border-[#4285f4] hover:bg-[#4285f4] hover:text-coldry-white"
          >
            {isLoading === LoadingType.GOOGLE ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.Google className="mr-2 h-4 w-4 rounded-full bg-white" />
            )}
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <div className="grid gap-2">
          {/* FIXME: Type safe error handling */}
          {(errors?.email || errors?.password) && (
            <div className="mb-2 w-full rounded bg-destructive p-4 text-destructive-foreground">
              <h2 className="font-semibold">Please fix the following errors:</h2>
              <ul className="list-inside list-disc">
                {/* @ts-ignore */}
                {errors?.name && (
                  // @ts-ignore
                  <li className="ml-2 text-white">{errors.name.message}</li>
                )}
                {errors?.email && <li className="ml-2 text-white">{errors.email.message}</li>}
                {errors?.password && <li className="ml-2 text-white">{errors.password.message}</li>}
              </ul>
            </div>
          )}

          {type === 'signup' && (
            <>
              {/* @ts-ignore */}
              <Label htmlFor="email" className={errors.name && 'text-red-500'}>
                Name
              </Label>
              <Input id="name" type="text" placeholder="John Doe" {...register('name')} />
            </>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className={errors.email && 'text-red-500'}>
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="example@mail.com"
            {...register('email', { required: true, onChange: clearErrors })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password" className={errors.password && 'text-red-500'}>
            Password
          </Label>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            {...register('password', { required: true, onChange: clearErrors })}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={isLoading === LoadingType.FORM}>
          {isLoading === LoadingType.FORM && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          {type === 'login' ? 'Login' : 'Create account'}
        </Button>
      </CardFooter>
    </form>
  );
};

export default UserAuthForm;
