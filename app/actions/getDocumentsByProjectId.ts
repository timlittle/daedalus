import prisma from "@/app/libs/prismadb";

export interface IDocumentsProjectParams {
  projectId?: string;
}

export default async function getDocumentsByProjectId(params: IDocumentsProjectParams) {
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
