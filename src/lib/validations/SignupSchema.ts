import { z } from 'zod';

export const SignupSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email("Email isn't valid"),
  password: z.string().refine((p) => p.length >= 2, {
    // TODO: Proper passsword strength validation
    message: 'Password must be at least 8 characters long'
  })
});
