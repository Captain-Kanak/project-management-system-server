import paginationHelper from "@/src/helpers/pagination";
import { Request, Response } from "express";
import { userService } from "./user.service";

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

export const userController = {
  getUsers,
};
