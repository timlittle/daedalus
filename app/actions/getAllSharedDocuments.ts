import prisma from "@/app/libs/prismadb";

export interface IAllSharedDocumentsParams {
  userId: string 
}

export default async function getAllSharedDocuments(params: IAllSharedDocumentsParams) {
  try {
    const { userId } = params;

    const permissions = await prisma.userDocumentPermission.findMany({
      where: {
        userId: userId,
      },
      include: {
        document: true
      }
    });
    
    const returnDocuments = permissions.map((permission) => permission.document);

    if (!returnDocuments){
      return []
    }

    return returnDocuments;
  } catch (error: any) {
    throw new Error(error);
  }
}
