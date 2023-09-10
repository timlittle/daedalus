import prisma from "@/app/libs/prismadb";

export interface IDocumentsUserParams {
  userId: string;
}

export default async function getDocumentsByUserId(params: IDocumentsUserParams) {
  // Fetchs all the documents for a desired user ID
  // This is used to display all documents owned by the user on the My Documents page
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const documents = await prisma.document.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        project: true,
      },
    });
    return documents;
  } catch (error: any) {
    throw new Error(error);
  }
}
