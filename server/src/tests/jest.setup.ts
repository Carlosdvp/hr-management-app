import dotenv from 'dotenv'
dotenv.config(); 

import { PrismaClient } from '@prisma/client'
import supertest from 'supertest'
import app from '../app'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL
    },
  }
});

// Connect to the test database before running tests
beforeAll(async () => {
  await prisma.$connect();
});

// Disconnect from the test database after running tests
afterAll(async () => {
  await prisma.$disconnect();
});

const api = supertest(app);

export { prisma, api };
