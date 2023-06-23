import * as jwt from 'jsonwebtoken';

import { env } from '@/lib/env';
import prisma from '@/lib/prisma';

export default async function verifyUser(token: string) {
  try {
    const decodedUser: jwt.JwtPayload = jwt.decode(token) as jwt.JwtPayload;

    if (!decodedUser) return false;

    const isValid = jwt.verify(
      token,
      env.NEXTAUTH_PROVIDER_EMAIL_VERIFICATION_SECRET + decodedUser.user.email
    );

    if (!isValid) return false;

    const unverifiedUser = await prisma.unVerifiedUser.findUnique({
      where: { id: decodedUser.user.id }
    });

    if (!unverifiedUser) return false;

    await prisma.$transaction([
      prisma.user.create({
        data: {
          email: unverifiedUser.email,
          givenName: unverifiedUser.givenName,
          familyName: unverifiedUser.familyName,
          password: unverifiedUser.password,
          emailVerified: new Date(Date.now()),
          createdAt: unverifiedUser.createdAt,
          updatedAt: new Date(Date.now()),
          plan: {
            connect: {
              id: await prisma.plan
                .findFirst({
                  where: { name: 'Free' }
                })
                .then((plan) => plan?.id)
            }
          }
        }
      }),
      prisma.unVerifiedUser.delete({
        where: { id: decodedUser.user.id }
      })
    ]);

    return true;
  } catch (err) {
    return false;
  }
}
