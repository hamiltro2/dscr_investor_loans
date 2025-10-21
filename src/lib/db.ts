/**
 * Prisma Database Client
 * Singleton pattern to avoid connection issues in development
 */

import { PrismaClient } from '@prisma/client';
import { env } from './env';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: env.DATABASE_URL,
      },
    },
  });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Gracefully handle connection errors and reconnect
prisma.$connect().catch((error) => {
  console.error('Initial Prisma connection failed:', error);
});

// Handle process termination
if (typeof window === 'undefined') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
}

// Helper to safely disconnect (mainly for testing)
export async function disconnectDB() {
  await prisma.$disconnect();
}
