import prisma from "@/app/libs/prismadb";

export interface IAllSharedUsersParams {
  documentId: string;
  ownerId?: string 
}

export default async function getAllSharedUsers(params: IAllSharedUsersParams) {
  try {
    const { documentId, ownerId } = params;

    const owner = await prisma.user.findFirst({
      where: {
        id: ownerId
      }
    })

    if (!owner) return
    
    const permissions = await prisma.userDocumentPermission.findMany({
      where: {
        documentId: documentId,
      },
      include: {
        user: true
      }
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
    }

    returnUsers.push(user);

    return returnUsers;
  } catch (error: any) {
    throw new Error(error);
  }
}
