import { UserRoles } from "@prisma/client";
import { authMiddleware } from "@/middleware/authMiddleware";
import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/", authMiddleware(UserRoles.ADMIN), userController.getUsers);

router.patch(
  "/:id/role",
  authMiddleware(UserRoles.ADMIN),
  userController.updateUserRole,
);

router.patch(
  "/:id/status",
  authMiddleware(UserRoles.ADMIN),
  userController.updateUserStaus,
);

export { router as userRouter };
