import { Router } from "express";
import { UserRoles } from "@prisma/client";
import { userController } from "./userController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

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
