import { z } from 'zod';

export const OnboardingSchema = z.object({
  integrations: z.array(z.string()).nullable()
});
