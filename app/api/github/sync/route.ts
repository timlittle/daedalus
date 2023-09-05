import getCurrentUser from "@/app/actions/getCurrentUser";
import getGithubAuthZByUserId from "@/app/actions/getGithubAuthZByUserId";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";
import { createOrUpdateTextFile } from "@octokit/plugin-create-or-update-text-file";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const githubAuthZ = await getGithubAuthZByUserId({ userId: currentUser.id });

  if (!githubAuthZ) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { owner, path, content, commitMessage, repo } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const MyOctoKit = Octokit.plugin(createOrUpdateTextFile);

  const octokit = new MyOctoKit({ auth: githubAuthZ.accessToken });

  const { updated } = await octokit.createOrUpdateTextFile({
    owner: owner,
    repo: repo,
    path: path,
    message: commitMessage,
    content: content,
  });

  return NextResponse.json(body);
}
