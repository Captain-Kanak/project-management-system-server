import { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await authService.loginUser({ email, password });

    if (!result.success) {
      const statusCode = result.type === "internal" ? 500 : 401;
      return res.status(statusCode).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log("Failed to login user", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const authController = {
  loginUser,
};
