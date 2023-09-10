import prisma from "@/app/libs/prismadb";

interface IParams {
  projectId?: string;
}

export default async function getProjectById(params: IParams) {
  // Fecth a specific project for a desired user
  try {
    const { projectId } = params;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        user: true,
      },
    });

    if (!project) {
      return null;
    }

    return project;
  } catch (error: any) {
    throw new Error(error);
  }
}
