import { Router } from "express";
import { authController } from "./auth.controller";
import { UserRoles } from "@prisma/client";
import { authMiddleware } from "@/middleware/authMiddleware";

const router = Router();

router.post("/login", authController.loginUser);

router.post(
  "/invite",
  authMiddleware(UserRoles.ADMIN),
  authController.inviteUser,
);

router.post("/register-via-invite", authController.registerViaInvite);

export { router as authRouter };
