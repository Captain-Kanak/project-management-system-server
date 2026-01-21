import { UserRoles } from "@/generated/prisma/enums";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function SeedAdmin() {
  try {
    const password = "admin123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminData = {
      name: "Kanak Ray",
      email: "kanakroy835@gmail.com",
      password: hashedPassword,
      role: UserRoles.ADMIN,
    };

    const isAdminExist = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
      select: {
        id: true,
      },
    });

    if (isAdminExist) {
      console.log("Admin already exist");

      return;
    }

    const admin = await prisma.user.create({
      data: adminData,
    });

    console.log("Admin created successfully", admin);
  } catch (error) {
    console.log("Failed to seed Admin", error);
  }
}

SeedAdmin();
