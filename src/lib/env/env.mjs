import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const skipValidation =
  !!process.env.SKIP_ENV_VALIDATION &&
  process.env.SKIP_ENV_VALIDATION !== 'false' &&
  process.env.SKIP_ENV_VALIDATION !== '0';

export const env = createEnv({
  skipValidation,
  server: {
    DATABASE_URL: z.string(),

    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    LINKEDIN_CLIENT_ID: z.string(),
    LINKEDIN_CLIENT_SECRET: z.string(),

    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string(),
    NEXTAUTH_PROVIDER_EMAIL_VERIFICATION_SECRET: z.string(),

    RESEND_API_KEY: z.string()
  },
  client: {
    // NEXT_PUBLIC_EXAMPLE: z.string()
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,

    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_PROVIDER_EMAIL_VERIFICATION_SECRET:
      process.env.NEXTAUTH_PROVIDER_EMAIL_VERIFICATION_SECRET,

    RESEND_API_KEY: process.env.RESEND_API_KEY
  }
});
