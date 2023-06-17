import type { PrismaClient } from '@prisma/client';

declare global {
  let prisma: PrismaClient | undefined;
}
