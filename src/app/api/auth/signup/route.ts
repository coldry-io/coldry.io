import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import { NextResponse } from 'next/server';

import { env } from '@/lib/env';
import prisma from '@/lib/prisma';

const transporter = createTransport({
  host: env.EMAIL_SERVER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL_SERVER_USER,
    pass: env.EMAIL_SERVER_PASSWORD
  }
});

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

    const emailSent = await sendVerificationEmail(token, email, name);

    if (!emailSent) {
      if (!(await sendVerificationEmail(token, email, name)))
        return new NextResponse(JSON.stringify({ message: 'Email not sent' }), {
          status: 500
        });
    }

    return new NextResponse(JSON.stringify({ message: 'Account created successfully' }), {
      status: 201
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 500
    });
  }
}

const sendVerificationEmail = async (token: string, email: string, name: string) => {
  const verificationUrl = `${env.NEXTAUTH_URL}/api/verify?token=${token}&email=${email}`;

  const emailHtml = `<!DOCTYPE html>
<html>

<head>
    <title>Coldry Email Verification</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" ,user-scalable="no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
</head>

<body style="margin: 0; padding: 0;">
    <div style="
        margin: 0;
        padding: 30px 0;
        background: #F7FBFF;
        font-family: 'Roboto', sans-serif !important;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.2px;
        color: #333333;
      ">
        <table style="
          color: #555555;
          margin: auto;
          max-width: 560px;
          background: #fff;
          border-collapse: collapse;
        ">
            <tr style="background-color: #fbfbfb;">
                <td style="
              display: flex;
              padding-bottom: 20px;
              font-family: 'Roboto', sans-serif !important;
            ">
                    <a href="https://coldry.io" target="_blank">
                        <img style="width: 143px; height: 39px;" src="https://landing.coldry.io/dist/assets/logo.png" />
                    </a>
                </td>
            </tr>

            <tr>
                <td style="
              font-family: 'Roboto', sans-serif !important;
              height: 300px;
              padding: 60px 40px;
              margin: 0 auto;
              color: #333333;
              font-size: 16px;
              line-height: 24px;
              letter-spacing: 0.2px;
            ">
                    <p class="title" style="
                margin: 0;
                font-weight: 500;
                font-size: 30px;
                line-height: 35px;
                text-align: center;
                margin-bottom: 40px;
                color: black;
              ">
                        Please confirm your email
                    </p>
                    <p style="margin: 0; margin-bottom: 16px;">
                        Hi ${name}, welcome to Coldry! We're excited to have you on board.
                    </p>
                    <p style="margin: 0; margin-bottom: 16px;">
                        Please confirm that this is your e-mail address by clicking on
                        <br />
                        <span style="font-weight: 500;">the button below or use this link</span>
                    </p>
                    <p style="margin: 0;">
                        <a style="color: #abd1f3; word-wrap: break-word;" href="${verificationUrl}"
                            target="_blank">${env.NEXTAUTH_URL}/verify?email=${email}</a>
                    </p>
                    <div style="
                width: 174px;
                line-height: 50px;
                background: #abd1f3;
                border-radius: 4px;
                margin: 40px auto;
                text-align: center;
              ">
                        <a href="${verificationUrl}" target="_blank" style="
                  display: inherit;
                  font-size: 16px;
                  font-weight: 400;
                  color: #ffffff;
                  text-decoration: none;
                ">
                            Confirm Email
                        </a>
                    </div>
                    <p style="
                margin: 0;
                font-size: 14px;
                line-height: 15px;
                font-weight: 300;
                color: #8c8c8c;
                text-align: center;
              ">
                        Need help? Send us a message at
                        <a style="color: #abd1f3; text-decoration: none;" href="mailto:info@coldry.io"
                            target="_blank">info@coldry.io</a>
                    </p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>`;

  const mailOptions = {
    from: 'Coldry <noreply@coldry.io>',
    to: email,
    subject: 'Verify your email address',
    html: emailHtml
  };

  try {
    transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);

    return true;
  } catch (error) {
    console.error(`Error sending verification email to ${email}: ${error}`);

    return false;
  }
};
