import { UserRoles } from "@/generated/prisma/enums";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../config/envConfig";

export const authrorize = () => {
  return async (req: any, res: any, next: any) => {
    try {
      const auth = req.headers.authorization;

      if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const token = auth.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const decoded = jwt.verify(
        token,
        envConfig.jwt_secret as string,
      ) as JwtPayload;

      req.user = decoded;

      next();
    } catch (error) {
      console.log("Failed to authenticate user", error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};
