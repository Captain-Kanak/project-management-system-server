import { Router } from "express";
import { projectController } from "./project.controller";
import { authrorize } from "@/middleware/authorize";
import { authMiddleware } from "@/middleware/authMiddleware";
import { UserRoles } from "@prisma/client";

const router = Router();

router.post("/", authrorize(), projectController.createProject);

router.get("/", authrorize(), projectController.getProjects);

router.patch(
  "/:id",
  authMiddleware(UserRoles.ADMIN),
  projectController.updateProject,
);

router.delete(
  "/:id",
  authMiddleware(UserRoles.ADMIN),
  projectController.deleteProject,
);

export { router as projectRouter };
