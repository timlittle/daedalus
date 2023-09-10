import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // API hanlder for adding a new project

  // Confirm there is a valid user
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // Fetch the body from the request
  const body = await request.json();

  // Deconstruct the fields from the body
  const { title, description } = body;

  // Confirm the fields have a value
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  // Create the project in the database
  const project = await prisma.project.create({
    data: {
      title,
      description,
      userId: currentUser.id,
    },
  });

  // Return the project
  return NextResponse.json(project);
}
