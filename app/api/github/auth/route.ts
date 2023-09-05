import { NextRequest, NextResponse } from "next/server";

import axios from "axios";
import { redirect } from "next/navigation";
import queryString from "query-string";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const code = request.nextUrl.searchParams.get("code");
  const githubClientId = process.env.GITHUB_APP_CLIENT_ID;
  const githubClientSecretId = process.env.GITHUB_APP_SECRET_ID;

  if (!code) {
    return NextResponse.error();
  }

  const now = Math.round(Date.now() / 1000);

  let data = {
    accessToken: "",
    expiresAt: 0,
    refreshToken: "",
    refreshTokenExpiresAt: 0,
    userId: currentUser.id,
  };

  await axios
    .post("https://github.com/login/oauth/access_token", {
      client_id: githubClientId,
      client_secret: githubClientSecretId,
      code: code,
    })
    .then((res) => {
      const params = queryString.parse(res.data);
      data.accessToken = params.access_token as string;
      data.expiresAt = now + parseInt(params.expires_in as string);
      data.refreshToken = params.refresh_token as string;
      data.refreshTokenExpiresAt = now + parseInt(params.refresh_token_expires_in as string);
    })
    .catch(() => {
      return NextResponse.error();
    });

  if (data.accessToken === "" || data.refreshToken === "" || data.expiresAt === 0 || data.refreshTokenExpiresAt === 0) {
    return NextResponse.error();
  }

  const githubAuthZ = await prisma.githubAuthZ.create({
    data,
  });

  console.log(githubAuthZ);

  return redirect("/profile");
}
