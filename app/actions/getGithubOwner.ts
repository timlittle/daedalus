import { GithubAuthZ } from "@prisma/client";
import { Octokit } from "octokit";

export interface IGithubOwnerParams {
  githubAuthZ: GithubAuthZ | null;
}

export default async function getGithubOwner(params: IGithubOwnerParams) {
  // Fetches the github owner of the authorization record
  // This is used in the github sync method
  // This is pulled from the authorization request for the github app
  try {
    const { githubAuthZ } = params;

    const now = Math.round(Date.now() / 1000);

    if (!githubAuthZ || now >= githubAuthZ.expiresAt) {
      return;
    }

    const octokit = new Octokit({
      auth: githubAuthZ.accessToken,
    });

    const userResponse = await octokit.request("GET /user");
    const owner = userResponse.data.login;

    return owner;
  } catch (error: any) {
    throw new Error(error);
  }
}
