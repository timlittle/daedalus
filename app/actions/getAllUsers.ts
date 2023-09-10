import prisma from "@/app/libs/prismadb";

export default async function getAllUsers() {
  // This function fetches all the users in the database
  // This is used for the sharing feature
  // Users can select the user they wish to share their document with
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const returnUsers = users.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null,
    }));

    return returnUsers;
  } catch (error: any) {
    throw new Error(error);
  }
}
