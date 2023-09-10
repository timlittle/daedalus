import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  documentId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  // An API handlder for deleting a document

  // Fetch the user and confirm it is valid
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // Fetch the documentID from the paramas
  const { documentId } = params;

  // If the document does not exist or is in the wrong format
  if (!documentId || typeof documentId !== "string") {
    throw new Error("Invalid ID");
  }

  // Delete the document from the database
  const document = await prisma.document.deleteMany({
    where: {
      id: documentId,
      userId: currentUser.id,
    },
  });

  // Return the document
  return NextResponse.json(document);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  // API handler for updating documents metadata

  // Fetch the body
  // Confirm the user is valid
  const body = await request.json();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // Fetch the documnet id from the params
  const { documentId } = params;

  // If the document does not exist or is in the wrong format
  if (!documentId || typeof documentId !== "string") {
    throw new Error("Invalid ID");
  }

  // Deconstruct the fields from the body
  const { title, description, projectId } = body;

  // Check all the fields have a valid value
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      return NextResponse.error();
    }
  });

  // Update the record in the database
  const document = await prisma.document.updateMany({
    where: {
      id: documentId,
      userId: currentUser.id,
    },
    data: {
      title: title,
      description: description,
      projectId: projectId,
      userId: currentUser.id,
    },
  });

  // Return the new document
  return NextResponse.json(document);
}
