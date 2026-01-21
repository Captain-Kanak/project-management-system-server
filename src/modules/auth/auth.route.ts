import { Router } from "express";
import { authController } from "./auth.controller";
import { authMiddleware } from "@/src/middleware/authMiddleware";
import { UserRoles } from "@/generated/prisma/enums";

const router = Router();

router.post("/login", authController.loginUser);

router.post(
  "/invite",
  authMiddleware(UserRoles.ADMIN),
  authController.inviteUser,
);

// router.post("/register-via-invite");

export { router as authRouter };
