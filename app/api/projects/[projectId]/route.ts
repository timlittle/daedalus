import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  projectId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  // API Handler for deleting a project

  // Confirm there is a valid user
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // Fetch the project id from the params
  const { projectId } = params;

  // Confirm the project id exists and is of the right type
  if (!projectId || typeof projectId !== "string") {
    throw new Error("Invalid ID");
  }

  // Delete the project from the database
  const project = await prisma.project.deleteMany({
    where: {
      id: projectId,
      userId: currentUser.id,
    },
  });

  // Return the deleted project
  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  // API handler for updating a project metadata

  // Fetch the body and confirm there is a valid user
  const body = await request.json();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // Fetch the project id from the params
  const { projectId } = params;

  // Confirm the project id is valid and of the right type
  if (!projectId || typeof projectId !== "string") {
    throw new Error("Invalid ID");
  }

  // Deconstruct the fields from the body
  const { title, description } = body;

  // Confirm the fields have a value
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  // Update the record in the database
  const project = await prisma.project.updateMany({
    where: {
      id: projectId,
      userId: currentUser.id,
    },
    data: {
      title: title,
      description: description,
      userId: currentUser.id,
    },
  });

  // Return the project
  return NextResponse.json(project);
}
