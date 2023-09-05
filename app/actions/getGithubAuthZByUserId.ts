import prisma from "@/app/libs/prismadb";
import axios from "axios";
import { NextResponse } from "next/server";
import queryString from "query-string";

export interface IGithubAuthZParams {
  userId: string;
}

export default async function getGithubAuthZByUserId(params: IGithubAuthZParams) {
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const githubAuthZ = await prisma.githubAuthZ.findFirst({
      where: query,
    });

    const now = Math.round(Date.now() / 1000);

    if (githubAuthZ && now >= githubAuthZ.expiresAt) {
      const githubClientId = process.env.GITHUB_APP_CLIENT_ID;
      const githubClientSecretId = process.env.GITHUB_APP_SECRET_ID;

      let data = {
        accessToken: "",
        expiresAt: 0,
        refreshToken: "",
        refreshTokenExpiresAt: 0,
      };

      await axios
        .post("https://github.com/login/oauth/access_token", {
          client_id: githubClientId,
          client_secret: githubClientSecretId,
          refresh_token: githubAuthZ.refreshToken,
          grant_type: "refresh_token",
        })
        .then((response) => {
          console.log("refreshed token");
          const resParams = queryString.parse(response.data);

          data.accessToken = resParams.access_token as string;
          data.expiresAt = now + parseInt(resParams.expires_in as string);
          data.refreshToken = resParams.refresh_token as string;
          data.refreshTokenExpiresAt = now + parseInt(resParams.refresh_token_expires_in as string);

          const newGitAuthZ = prisma.githubAuthZ.update({
            where: {
              id: githubAuthZ.id,
            },
            data: {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              expiresAt: data.expiresAt,
              refreshTokenExpiresAt: data.refreshTokenExpiresAt,
            },
          });

          return newGitAuthZ;
        })
        .catch(() => {
          return NextResponse.error();
        });
    }

    return githubAuthZ;
  } catch (error: any) {
    throw new Error(error);
  }
}
