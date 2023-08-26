import prisma from "@/app/libs/prismadb";

export interface IDocumentsParams {
  projectId?: string;
}

export default async function getDocumentsById(params: IDocumentsParams) {
  try {
    const { projectId } = params;

    let query: any = {};

    if (projectId) {
      query.projectId = projectId;
    }

    const documents = await prisma.document.findMany({
    where: query,
      orderBy: {
        createdAt: "desc",
      },
      
    });
    return documents;
  } catch (error: any) {
    throw new Error(error);
  }
}
