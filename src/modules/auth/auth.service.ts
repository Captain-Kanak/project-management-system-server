import { UserRoles, UserStatus } from "@/generated/prisma/enums";
import { envConfig } from "@/src/config/envConfig";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const MAX_RETRIES = 5;

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
        type: "forbidden",
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

const inviteUser = async ({
  email,
  role,
}: {
  email: string;
  role: UserRoles;
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return {
        success: false,
        message: "User already exist with this email",
        type: "conflict",
      };
    }

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    await prisma.invite.create({
      data: {
        email,
        role,
        token: hashedToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const link = `${envConfig.origin_url}/register?token=${token}`;

    return {
      success: true,
      message: "User invite link created successfully",
      data: { link },
    };
  } catch (error) {
    console.log("Failed to invite user", error);

    return {
      success: false,
      message: "Failed to invite user",
      type: "internal",
    };
  }
};

const registerViaInvite = async ({
  token,
  name,
  password,
}: {
  token: string;
  name: string;
  password: string;
}) => {
  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const hashedPassword = await bcrypt.hash(password, 10);

    const invite = await prisma.invite.findUnique({
      where: {
        token: hashedToken,
        expiresAt: { gt: new Date() },
        acceptedAt: null,
      },
      select: {
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!invite) {
      return {
        success: false,
        message: "Invalid invite token",
      };
    }

    const userResult = await prisma.$transaction(async (trx) => {
      const user = await trx.user.create({
        data: {
          name,
          email: invite.email,
          password: hashedPassword,
          role: invite.role,
          invitedAt: invite.createdAt,
        },
      });

      await trx.invite.update({
        where: {
          token: hashedToken,
        },
        data: {
          acceptedAt: new Date(),
        },
      });

      return user;
    });

    return {
      success: true,
      message: "User registered successfully",
      data: {
        id: userResult.id,
        name: userResult.name,
        email: userResult.email,
        role: userResult.role,
      },
    };
  } catch (error) {
    console.log("Failed to register user", error);

    return {
      success: false,
      message: "Failed to register user",
      type: "internal",
    };
  }
};

export const authService = {
  loginUser,
  inviteUser,
  registerViaInvite,
};
