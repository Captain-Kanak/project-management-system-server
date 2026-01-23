import { PrismaPg } from "@prisma/adapter-pg";
import { envConfig } from "../config/envConfig";
import { PrismaClient } from "@prisma/client";

const connectionString = `${envConfig.datebase_url}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
