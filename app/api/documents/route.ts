import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // API handler to create a new document

  // Fetch the user and confirm it is valid
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // Fetch the body from the request
  const body = await request.json();

  // Deconstruct the fields from the body
  const { title, description, projectId } = body;

  // Confirm all the fields have a value
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  // Create the document in the database
  const document = await prisma.document.create({
    data: {
      title,
      description,
      projectId,
      userId: currentUser.id,
    },
  });

  // Return the document
  return NextResponse.json(document);
}
