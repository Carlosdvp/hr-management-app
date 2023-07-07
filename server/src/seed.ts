import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mainSeeder = async () => {
  console.log("Start seeding...");
};

mainSeeder()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
