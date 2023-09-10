import prisma from "@/app/libs/prismadb";

export interface IAllSharedUsersParams {
  documentId: string;
  ownerId?: string;
}

export default async function getAllSharedUsers(params: IAllSharedUsersParams) {
  // This function fetches all the users that have permission to a specific document
  // It injects the current owner into the permisions by default
  // This is used for the determining shared permissions on a document
  // If a user is in the list, they can contribute to the document
  // If not, they are presented with an error
  try {
    const { documentId, ownerId } = params;

    const owner = await prisma.user.findFirst({
      where: {
        id: ownerId,
      },
    });

    if (!owner) return;

    const permissions = await prisma.userDocumentPermission.findMany({
      where: {
        documentId: documentId,
      },
      include: {
        user: true,
      },
    });

    const returnUsers = permissions.map((permission) => ({
      ...permission.user,
      createdAt: permission.user.createdAt.toISOString(),
      updatedAt: permission.user.updatedAt.toISOString(),
      emailVerified: permission.user.emailVerified?.toISOString() || null,
    }));

    const user = {
      ...owner,
      createdAt: owner.createdAt.toISOString(),
      updatedAt: owner.updatedAt.toISOString(),
      emailVerified: owner.emailVerified?.toISOString() || null,
    };

    returnUsers.push(user);

    return returnUsers;
  } catch (error: any) {
    throw new Error(error);
  }
}
