import { Router } from "express";
import { projectController } from "./project.controller";
import { authrorize } from "@/src/middleware/authorize";

const router = Router();

router.post("/", authrorize(), projectController.createProject);

router.get("/", authrorize(), projectController.getProjects);

export { router as projectRouter };
