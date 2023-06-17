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

    EMAIL_SERVER_USER: z.string(),
    EMAIL_SERVER_PASSWORD: z.string(),
    EMAIL_SERVER_HOST: z.string(),

    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_PROVIDER_EMAIL_VERIFICATION_SECRET: z.string()
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

    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,

    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_PROVIDER_EMAIL_VERIFICATION_SECRET:
      process.env.NEXTAUTH_PROVIDER_EMAIL_VERIFICATION_SECRET
  }
});
