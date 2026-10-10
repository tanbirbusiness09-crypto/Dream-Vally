import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email or Phone', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        const identifier = credentials.identifier.trim();
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: identifier },
              { phoneNumber: identifier },
            ],
          },
        });

        if (!user?.passwordHash) return null;

        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.fullName,
          email: user.email ?? user.phoneNumber,
          role: user.role,
          shopName: user.shopName,
          shopSlug: user.shopSlug,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session: updateData }) {
      if (user) {
        token.id = (user as { id: string }).id;
        token.role = (user as { role?: string }).role;
        token.shopName = (user as { shopName?: string | null }).shopName;
        token.shopSlug = (user as { shopSlug?: string | null }).shopSlug;
      }
      // Allow client-side updateSession({ ... }) to refresh token fields
      if (trigger === 'update' && updateData) {
        const d = updateData as { role?: string; shopName?: string | null; shopSlug?: string | null };
        if (d.role) token.role = d.role;
        if (d.shopName !== undefined) token.shopName = d.shopName;
        if (d.shopSlug !== undefined) token.shopSlug = d.shopSlug;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { shopName?: string }).shopName = token.shopName as string;
        (session.user as { shopSlug?: string }).shopSlug = token.shopSlug as string;
      }
      return session;
    },
  },
};
