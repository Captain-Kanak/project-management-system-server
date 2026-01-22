import { Request, Response } from "express";
import { projectService } from "./project.service";
import { Project } from "@/generated/prisma/client";

const createProject = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const user = req.user;
  try {
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    const result = await projectService.createProject({
      userId: user.id as string,
      name: name as string,
      description: description as string,
    });

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.log("Failed to create project", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getProjects = async (req: Request, res: Response) => {
  try {
    const result = await projectService.getProjects();

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log("Failed to get projects", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const result = await projectService.updateProject(
      id as string,
      payload as Project,
    );

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log("Failed to update project", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const projectController = {
  createProject,
  getProjects,
  updateProject,
};
