import { NextRequest, NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import axios from "axios";
import { redirect } from "next/navigation";
import queryString from "query-string";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // API handler to cache the github credentials in the database
  // Used in the callback function of the Github App
  // Saves the returns access token and updates fields for when they expire

  // Confirm we have a valid user
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // Fetch the 'code' returned by github used to fetch an access token
  // Fetch the Github App details from envvars
  const code = request.nextUrl.searchParams.get("code");
  const githubClientId = process.env.GITHUB_APP_CLIENT_ID;
  const githubClientSecretId = process.env.GITHUB_APP_SECRET_ID;

  // Confirm we have a code
  if (!code) {
    return NextResponse.error();
  }

  // Todays date in seconds
  const now = Math.round(Date.now() / 1000);

  // Empty datastructure to fill
  let data = {
    accessToken: "",
    expiresAt: 0,
    refreshToken: "",
    refreshTokenExpiresAt: 0,
    userId: currentUser.id,
  };

  // Call the github API to request the access token with the 'code' we recieved
  await axios
    .post("https://github.com/login/oauth/access_token", {
      client_id: githubClientId,
      client_secret: githubClientSecretId,
      code: code,
    })
    .then((res) => {
      // The POST request was successful
      // Get the response from the request params and store them in the database
      // A TTL for expiration is given, this is added to current time to work out the time it will expire
      const params = queryString.parse(res.data);
      data.accessToken = params.access_token as string;
      data.expiresAt = now + parseInt(params.expires_in as string);
      data.refreshToken = params.refresh_token as string;
      data.refreshTokenExpiresAt = now + parseInt(params.refresh_token_expires_in as string);
    })
    .catch(() => {
      return NextResponse.error();
    });

  // Confirm we have a record for each field we need in the database
  if (data.accessToken === "" || data.refreshToken === "" || data.expiresAt === 0 || data.refreshTokenExpiresAt === 0) {
    return NextResponse.error();
  }

  // Create a record in the database for the user
  const githubAuthZ = await prisma.githubAuthZ.create({
    data,
  });

  // As the handler is called back the callback from github
  // Redirct to the profile page
  return redirect("/profile");
}
