import { UserRoles } from "@/generated/prisma/enums";
import { authMiddleware } from "@/src/middleware/authMiddleware";
import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/", authMiddleware(UserRoles.ADMIN), userController.getUsers);

router.patch(
  "/:id/role",
  authMiddleware(UserRoles.ADMIN),
  userController.updateRole,
);

export { router as userRouter };
