import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // API handler for updating the sharing settings of a document
  // Used for sharing the document
  // Creates a relationship between the document and the desired user

  // Fetch the body from the request
  const body = await request.json();

  // Deconstruct the ids from the body
  const { documentId, userId } = body;

  // Check the ids have a value
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  // Create a relationship in the database
  const permission = await prisma.userDocumentPermission.create({
    data: {
      documentId,
      userId,
    },
  });

  // Return the relationship
  return NextResponse.json(permission);
}
