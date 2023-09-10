import prisma from "@/app/libs/prismadb";

export interface IDocumentsParams {
  documentId?: string;
}

export default async function getDocumentById(params: IDocumentsParams) {
  // This fetches a document by its unique identifier
  // Used to load the content of the document into the editor
  try {
    const { documentId } = params;

    const document = await prisma.document.findUnique({
      where: {
        id: documentId,
      },
      include: {
        user: true,
      },
    });

    if (!document) {
      return null;
    }

    return document;
  } catch (error: any) {
    throw new Error(error);
  }
}
