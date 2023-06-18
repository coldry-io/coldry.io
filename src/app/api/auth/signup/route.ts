import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

import { ColdryVerifyEmail, ColdryVerifyPlain } from '@/components/emails';

import { env } from '@/lib/env';
import prisma from '@/lib/prisma';

// FIXME: Temporary fix for CI
const resend = new Resend(env.RESEND_API_KEY ?? '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword
      }
    });

    const token = jwt.sign({ user }, env.NEXTAUTH_PROVIDER_EMAIL_VERIFICATION_SECRET + email, {
      expiresIn: '7d'
    });

    resend.sendEmail({
      from: 'Coldry <noreply@coldry.io>',
      to: email,
      subject: 'Verify your email',
      text: ColdryVerifyPlain({
        name,
        verificationUrl: `${env.NEXTAUTH_URL}/api/verify?token=${token}&email=${email}`
      }),
      react: ColdryVerifyEmail({
        name,
        verificationUrl: `${env.NEXTAUTH_URL}/api/verify?token=${token}&email=${email}`
      })
    });

    return new NextResponse(JSON.stringify({ message: 'Account created successfully' }), {
      status: 201
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 500
    });
  }
}
