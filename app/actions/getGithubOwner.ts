import { GithubAuthZ } from "@prisma/client";
import { Octokit } from "octokit";

export interface IGithubOwnerParams {
  githubAuthZ: GithubAuthZ | null;
}

export default async function getGithubOwner(params: IGithubOwnerParams) {
  try {
    const { githubAuthZ } = params;

    if (!githubAuthZ) {
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
