import { User } from "@prisma/client";

// Santised version of the user
// Sanitising the dates from the database for the client side components
export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

// Santised version of the document
// Sanitising the dates from the database for the client side components
export type SafeDocument = Omit<Document, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
