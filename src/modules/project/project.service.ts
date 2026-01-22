import { prisma } from "@/src/lib/prisma";

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

export const projectService = {
  createProject,
};
