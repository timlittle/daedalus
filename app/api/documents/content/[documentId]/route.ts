import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  documentId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  // API handler for update the content of a document in the database
  // Used by the editor to "save" the content

  // Check for the body and confrim the user is valid
  const body = await request.json();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // Fetch the document id from the params
  const { documentId } = params;

  // If the document does not exist or is in the wrong format
  if (!documentId || typeof documentId !== "string") {
    throw new Error("Invalid ID");
  }

  // Deconstruct the content from the body
  const { content } = body;

  // Confirm the content has a value
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
      content: content,
    },
  });

  // Return the document
  return NextResponse.json(document);
}
