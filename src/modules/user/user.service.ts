import { UserRoles, UserStatus } from "@/generated/prisma/enums";
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

const updateUserRole = async ({
  id,
  role,
}: {
  id: string;
  role: UserRoles;
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
        type: "not-found",
      };
    }

    if (user.role === role) {
      return {
        success: true,
        message: "User already has the same role",
      };
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });

    return {
      success: true,
      message: "User role updated successfully",
    };
  } catch (error) {
    console.log("Failed to update user role", error);

    return {
      success: false,
      message: "Failed to update user role",
    };
  }
};

const updateUserStaus = async ({
  id,
  status,
}: {
  id: string;
  status: UserStatus;
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
        type: "not-found",
      };
    }

    if (user.status === status) {
      return {
        success: true,
        message: "User already has the same status",
      };
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return {
      success: true,
      message: "User status updated successfully",
    };
  } catch (error) {
    console.log("Failed to update user status", error);

    return {
      success: false,
      message: "Failed to update user status",
    };
  }
};

export const userService = {
  getUsers,
  updateUserRole,
  updateUserStaus,
};
