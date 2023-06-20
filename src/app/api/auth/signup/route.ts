import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Resend } from 'resend';
import rateLimit from 'next-rate-limit';
import { NextRequest, NextResponse } from 'next/server';

import { ColdryVerifyEmail } from '@/components/emails';

import { env } from '@/lib/env';
import prisma from '@/lib/prisma';

const resend = new Resend(env.RESEND_API_KEY);

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500
});

export async function POST(request: NextRequest) {
  try {
    const headers = limiter.checkNext(request, 10);

    const body = await request.json();
    const { email, firstName, lastName, password } = body;

    const [existingUser, existingUserUnverified] = await prisma.$transaction([
      prisma.user.findFirst({
        where: { email }
      }),
      prisma.unVerifiedUser.findFirst({
        where: { email }
      })
    ]);

    if (existingUser || existingUserUnverified) {
      throw new Error(
        existingUser ? 'Account already exists' : 'Please check your email to verify your account'
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.unVerifiedUser.create({
      data: {
        email,
        givenName: firstName,
        familyName: lastName,
        password: hashedPassword
      }
    });

    const token = jwt.sign({ user }, env.NEXTAUTH_PROVIDER_EMAIL_VERIFICATION_SECRET + email, {
      expiresIn: '7d'
    });

    const { react, text } = ColdryVerifyEmail({
      name: firstName,
      verificationUrl: `${env.NEXTAUTH_URL}/verify/${token}`
    });

    resend.sendEmail({
      from: 'Coldry <noreply@coldry.io>',
      to: email,
      subject: 'Please verify your email address',
      text,
      react
    });

    return new NextResponse(
      JSON.stringify({
        message: 'Account created successfully. Please check your email to verify your account'
      }),
      {
        status: 201,
        headers
      }
    );
  } catch (error) {
    if (error instanceof Error)
      return new NextResponse(JSON.stringify({ message: error.message }), {
        status: error.message === 'Rate limit exceeded' ? 429 : 500
      });

    return new NextResponse(
      JSON.stringify({ message: 'An error occured. Please try again later.' }),
      {
        status: 500
      }
    );
  }
}
