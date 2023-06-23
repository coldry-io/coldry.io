import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import { getServerSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';

import { env } from '@/lib/env';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile: (profile) => {
        return {
          id: profile.sub,
          givenName: profile.given_name,
          familyName: profile.family_name,
          email: profile.email,
          emailVerified: profile.email_verified,
          image: profile.picture
        };
      }
    }),
    LinkedInProvider({
      clientId: env.LINKEDIN_CLIENT_ID,
      clientSecret: env.LINKEDIN_CLIENT_SECRET,
      profile: async (profile, tokens) => {
        const emailResponse = await fetch(
          'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
          { headers: { Authorization: `Bearer ${tokens.access_token}` } }
        );
        const emailData = await emailResponse.json();

        return {
          id: profile.id,
          givenName: profile.localizedFirstName,
          familyName: profile.localizedLastName,
          email: emailData?.elements?.[0]?.['handle~']?.emailAddress,
          image:
            profile.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier
        };
      },
      checks: ['none']
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.password) return null;

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isCorrectPassword) return null;

        return user;
      }
    })
  ],
  callbacks: {
    session: async ({ token, session }) => {
      if (token) {
        session.user.id = token.id;
        session.user.givenName = token.givenName;
        session.user.familyName = token.familyName;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.onboardedAt = token.onboardedAt;
      }

      return session;
    },
    jwt: async ({ token, user }) => {
      const currentUser = await prisma.user.findUnique({
        where: {
          email: token.email as string
        }
      });

      if (!currentUser) {
        token.id = user.id;

        return token;
      }

      return {
        id: currentUser.id,
        givenName: currentUser.givenName,
        familyName: currentUser.familyName,
        email: currentUser.email,
        picture: currentUser.image,
        onboardedAt: currentUser.onboardedAt?.toISOString()
      };
    },
    redirect: ({ url, baseUrl }) => {
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  events: {
    createUser: async ({ user }) => {
      await prisma.user.update({
        where: { id: user.id },
        data: {
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
      });
    }
  },
  pages: {
    signIn: '/login',
    newUser: '/onboarding'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: env.NEXTAUTH_SECRET
};

export const getAuthSession = () => getServerSession(authOptions);
