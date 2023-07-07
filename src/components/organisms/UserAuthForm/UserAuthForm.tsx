'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/atoms/Button';
import { CardContent, CardFooter } from '@/components/atoms/Card';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import { PasswordStrength } from '@/components/atoms/PasswordStrength';

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
  const formSchema = type === 'login' ? LoginSchema : SignupSchema;
  const errorsOrder = [
    'firstName',
    'lastName',
    'email',
    'password',
    'confirmPassword',
    'passMatch'
  ];

  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    resetField,
    watch
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const password = watch('password');

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
      redirect: false,
      callbackUrl: window.location.origin
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
        <div className="grid gap-2 md:grid-cols-2">
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
          {Object.keys(errors).some((field) => errors[field as keyof typeof errors]) && (
            <div className="mb-2 w-full rounded bg-destructive p-4 text-destructive-foreground">
              <h2 className="font-semibold">Please fix the following errors:</h2>
              <ul className="list-inside list-disc">
                {Object.keys(errors)
                  .sort((a, b) => errorsOrder.indexOf(a) - errorsOrder.indexOf(b))
                  .map((field) => (
                    <li key={field} className="ml-2 text-white">
                      {errors[field as keyof typeof errors]?.message}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {type === 'signup' && (
            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <Label
                  htmlFor="firstName"
                  className={cn('firstName' in errors && errors.firstName && 'text-red-500')}
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  {...register('firstName', {
                    required: true,
                    onChange: () => clearErrors('firstName')
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="lastName"
                  className={cn('lastName' in errors && errors.lastName && 'text-red-500')}
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  {...register('lastName', {
                    required: true,
                    onChange: () => clearErrors('lastName')
                  })}
                />
              </div>
            </div>
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
            {...register('email', { required: true, onChange: () => clearErrors('email') })}
          />
        </div>

        <div className={cn('grid gap-2', type === 'signup' && 'md:grid-cols-2')}>
          <div className="grid gap-2">
            <Label htmlFor="password" className={errors.password && 'text-red-500'}>
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoComplete="none"
              {...register('password', {
                required: true,
                onChange: () => clearErrors('password')
              })}
            />
          </div>
          {type === 'signup' ? (
            <div className="grid gap-2">
              <Label
                htmlFor="confirmPassword"
                className={cn(
                  'confirmPassword' in errors && errors.confirmPassword && 'text-red-500'
                )}
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                autoComplete="none"
                {...register('confirmPassword', {
                  required: true,
                  onChange: () => clearErrors('confirmPassword')
                })}
              />
            </div>
          ) : (
            <Link
              className="text-sm text-coldry-blue transition-colors duration-300 hover:text-coldry-black"
              href="/login"
            >
              Forgot password?
            </Link>
          )}
        </div>
        {type === 'signup' && password && <PasswordStrength password={password} />}
      </CardContent>
      <CardFooter className="grid gap-4 text-center">
        <Button className="w-full" disabled={isLoading === LoadingType.FORM}>
          {isLoading === LoadingType.FORM && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          {type === 'login' ? 'Log In' : 'Create account'}
        </Button>

        {type === 'login' ? (
          <p className="text-sm text-muted-foreground">
            New to Coldry?{' '}
            <Link
              className="text-coldry-blue transition-colors duration-300 hover:text-coldry-black"
              href="/signup"
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              className="text-coldry-blue transition-colors duration-300 hover:text-coldry-black"
              href="/login"
            >
              Log In
            </Link>
          </p>
        )}
      </CardFooter>
    </form>
  );
};

export default UserAuthForm;
