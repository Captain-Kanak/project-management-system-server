import { Request, Response } from "express";
import { userService } from "./userService.js";
import { UserRoles, UserStatus } from "@prisma/client";
import paginationHelper from "../../helpers/pagination.js";

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

const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const result = await userService.updateUserRole({
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

const updateUserStaus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await userService.updateUserStaus({
      id: id as string,
      status: status as UserStatus,
    });

    if (!result.success) {
      const statusCode = result.type === "not-found" ? 404 : 500;
      return res.status(statusCode).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log("Failed to update user status", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const userController = {
  getUsers,
  updateUserRole,
  updateUserStaus,
};
