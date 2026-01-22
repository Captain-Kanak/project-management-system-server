import { Request, Response } from "express";
import { projectService } from "./project.service";

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

export const projectController = {
  createProject,
};
