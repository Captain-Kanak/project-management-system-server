import { prisma } from "@/src/lib/prisma";

const getUsers = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  try {
    const users = await prisma.user.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        invitedAt: true,
      },
    });

    if (users.length === 0) {
      return {
        success: true,
        message: "No users found",
        data: [],
      };
    }

    return {
      success: true,
      message: "Users fetched successfully",
      data: users,
    };
  } catch (error) {
    console.log("Failed to get users", error);

    return {
      success: false,
      message: "Failed to get users",
      type: "internal",
    };
  }
};

export const userService = {
  getUsers,
};
