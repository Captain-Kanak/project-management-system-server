import { Project, ProjectStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const createProject = async ({
  userId,
  name,
  description,
}: {
  userId: string;
  name: string;
  description: string;
}) => {
  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        createdBy: userId,
      },
    });

    return {
      success: true,
      message: "Project created successfully",
      data: project,
    };
  } catch (error) {
    console.log("Failed to create project", error);

    return {
      success: false,
      message: "Failed to create project",
      type: "internal",
    };
  }
};

const getProjects = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  try {
    const projects = await prisma.project.findMany({
      skip: offset,
      take: limit,
      where: {
        status: ProjectStatus.ACTIVE,
        isDeleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (projects.length === 0) {
      return {
        success: true,
        message: "No projects found",
        data: [],
      };
    }

    return {
      success: true,
      message: "Projects fetched successfully",
      data: projects,
    };
  } catch (error) {
    console.log("Failed to get projects", error);

    return {
      success: false,
      message: "Failed to get projects",
      type: "internal",
    };
  }
};

const updateProject = async (id: string, payload: Project) => {
  try {
    const project = await prisma.project.update({
      where: {
        id,
      },
      data: payload,
    });

    return {
      success: true,
      message: "Project updated successfully",
      data: project,
    };
  } catch (error) {
    console.log("Failed to update project", error);

    return {
      success: false,
      message: "Failed to update project",
      type: "internal",
    };
  }
};

const deleteProject = async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      return {
        success: false,
        message: "Project not found",
        type: "not-found",
      };
    }

    const softDeleteProject = await prisma.project.update({
      where: {
        id,
      },
      data: {
        status: ProjectStatus.DELETED,
        isDeleted: true,
      },
    });

    return {
      success: true,
      message: "Project deleted successfully",
      data: softDeleteProject,
    };
  } catch (error) {
    console.log("Failed to delete project", error);

    return {
      success: false,
      message: "Failed to delete project",
      type: "internal",
    };
  }
};

export const projectService = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};
