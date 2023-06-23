import prisma from '@/lib/prisma';

export default async function getIntegrations(userId?: string) {
  return userId
    ? await prisma.integrations.findMany({
        where: {
          userId: userId
        }
      })
    : await prisma.integrations.findMany();
}
