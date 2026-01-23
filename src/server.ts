import app from "./app.js";
import { envConfig } from "./config/envConfig.js";
import { prisma } from "./lib/prisma.js";

const port = envConfig.port || 5000;

async function Server() {
  try {
    await prisma.$connect();
    console.log("Database Connected Successfully using Prisma.");

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Failed to start server", error);
    process.exit(1);
  }
}

Server();
