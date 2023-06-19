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
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }),
    LinkedInProvider({
      clientId: env.LINKEDIN_CLIENT_ID,
      clientSecret: env.LINKEDIN_CLIENT_SECRET,
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

        if (!user || !user?.hashedPassword) return null;

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!isCorrectPassword) return null;

        return user;
      }
    })
  ],
  callbacks: {
    session: async ({ token, session }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
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
        name: currentUser.name,
        email: currentUser.email,
        picture: currentUser.image
      };
    },
    redirect: ({ url, baseUrl }) => {
      return url.startsWith(baseUrl) ? url : baseUrl;
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
