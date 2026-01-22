import paginationHelper from "@/src/helpers/pagination";
import { Request, Response } from "express";
import { userService } from "./user.service";
import { UserRoles } from "@/generated/prisma/enums";

const getUsers = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  try {
    const pagination = paginationHelper({
      page: page as string,
      limit: limit as string,
    });

    const result = await userService.getUsers(pagination);

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log("Failed to get users", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const result = await userService.updateRole({
      id: id as string,
      role: role as UserRoles,
    });

    if (!result.success) {
      const statusCode = result.type === "not-found" ? 404 : 500;
      return res.status(statusCode).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log("Failed to update user role", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const userController = {
  getUsers,
  updateRole,
};
