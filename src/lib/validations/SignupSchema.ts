import { z } from 'zod';

export const SignupSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email("Email isn't valid"),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*])/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
      .refine(
        (value) => !value.toLowerCase().includes('password'),
        'Password must not contain the word "password"'
      ),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword && data.password, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  });
