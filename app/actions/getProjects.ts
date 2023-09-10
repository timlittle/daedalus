import prisma from "@/app/libs/prismadb";

export interface IProjectsParams {
  userId?: string;
}

export default async function getProjects(params: IProjectsParams) {
  // Fetch all the projects for a current user
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const projects = await prisma.project.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
  } catch (error: any) {
    throw new Error(error);
  }
}
