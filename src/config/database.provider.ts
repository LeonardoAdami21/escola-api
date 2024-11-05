import { PrismaClient } from '@prisma/client';
import { DATA_SOURCE } from './datasource.provider';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const prisma = new PrismaClient();
      await prisma.$connect();
      return prisma;
    },
  },
];
