import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // API Handler to create a new user
  // This is used for people registering without oAuth

  // Fetch the fields from body
  const body = await request.json();
  const { email, name, password } = body;

  // Hash the users password with bcrypt
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create the user in the database
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  // Return the user
  return NextResponse.json(user);
}
