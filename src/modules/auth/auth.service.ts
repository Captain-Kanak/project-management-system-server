import { UserRoles, UserStatus } from "@/generated/prisma/enums";
import { envConfig } from "@/src/config/envConfig";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const inviteUser = async ({
  email,
  role,
}: {
  email: string;
  role: UserRoles;
}) => {
  try {
    const token = crypto.randomBytes(32).toString("hex");
  } catch (error) {
    console.log("Failed to invite user", error);

    return {
      success: false,
      message: "Failed to invite user",
    };
  }
};

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not exist with this email",
        type: "not-found",
      };
    }

    if (user.status !== UserStatus.ACTIVE) {
      return {
        success: false,
        message: "User is not active",
        type: "unauthorized",
      };
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return {
        success: false,
        message: "Invalid password",
        type: "unauthorized",
      };
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      envConfig.jwt_secret as string,
      {
        expiresIn: "1d",
      },
    );

    return {
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    };
  } catch (error) {
    console.log("Failed to login user", error);

    return {
      success: false,
      message: "Failed to login user",
      type: "internal",
    };
  }
};

export const authService = {
  inviteUser,
  loginUser,
};
