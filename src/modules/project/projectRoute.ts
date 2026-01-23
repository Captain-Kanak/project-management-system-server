import { Router } from "express";

import { UserRoles } from "@prisma/client";
import { authrorize } from "../../middleware/authorize.js";
import { projectController } from "./projectController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

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
