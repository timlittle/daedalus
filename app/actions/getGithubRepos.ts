import { GithubAuthZ } from "@prisma/client";
import { Octokit } from "octokit";

export interface IGithubReposParams {
  githubAuthZ: GithubAuthZ | null;
  githubOwner: string | undefined;
}

export default async function getGithubRepos(params: IGithubReposParams) {
  try {
    const { githubAuthZ, githubOwner } = params;

    if (!githubAuthZ || !githubOwner) {
      return;
    }

    const octokit = new Octokit({
      auth: githubAuthZ.accessToken,
    });

    const userResponse = await octokit.request(`GET /user/repos`);
    if (!userResponse.data) {
      return;
    }

    let repos: string[] = [];

    userResponse.data.map((repo: { name: string }) => {
      repos.push(repo.name);
    });

    return repos;
  } catch (error: any) {
    throw new Error(error);
  }
}
