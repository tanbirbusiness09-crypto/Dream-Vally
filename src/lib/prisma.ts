// Safe singleton Prisma Client for Dreamvally Next.js
// Avoids build failures on Vercel before DATABASE_URL and Prisma Generate run

let prismaInstance: any = null;

if (typeof window === 'undefined' && process.env.DATABASE_URL) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require('@prisma/client');
    const globalForPrisma = globalThis as unknown as { prisma: any };
    prismaInstance = globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;
  } catch (error) {
    console.warn('Prisma client not yet available or generated:', error);
  }
}

export const prisma = prismaInstance;
export default prisma;
