import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  // Setup Next JS Authentication in the application
  // Using Google and Github oAuth authentication with the plaform
  // Keeping basic auth with the credential provider
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // Confirm the credentials are present in the request
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials - No account");
        }

        // Find the user in the data
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        // Check if the user is validate and has a password
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials - No user");
        }

        // Compare a bcrypt version of the passwords
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

        // IF the password is not valid tell the user
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials - Passwords dont match");
        }
        // Return the user for NextJS
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  // Turn on debugging for development only
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Return the configuration of NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
