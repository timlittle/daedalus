import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};


export type SafeDocument = Omit<
  Document,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};