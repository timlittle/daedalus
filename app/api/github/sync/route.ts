import getCurrentUser from "@/app/actions/getCurrentUser";
import getGithubAuthZByUserId from "@/app/actions/getGithubAuthZByUserId";
import { createOrUpdateTextFile } from "@octokit/plugin-create-or-update-text-file";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";

export async function POST(request: Request) {
  // API handler to sync the current document with a remote github repo
  // The user needs a valid github access token to authenticate the api call

  // Confirm we have a valid user
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // Fetch the cached github credenitals from the database for the user
  const githubAuthZ = await getGithubAuthZByUserId({ userId: currentUser.id });

  if (!githubAuthZ) {
    return NextResponse.error();
  }

  // Fetch the body from the requst
  const body = await request.json();

  // Deconstructe the fields from the body
  const { owner, path, content, commitMessage, repo } = body;

  // Confirm all the fields have a value
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  // Use the createOrUpdateTextFile plugin for ocotokit
  // This is used to add the file to the remote git repo
  const MyOctoKit = Octokit.plugin(createOrUpdateTextFile);

  // Create a version of the Octoki with the user access token
  const octokit = new MyOctoKit({ auth: githubAuthZ.accessToken });

  // Call the Github API to update the document in the gitrepo
  const { updated } = await octokit.createOrUpdateTextFile({
    owner: owner,
    repo: repo,
    path: path,
    message: commitMessage,
    content: content,
  });

  // Return the body
  return NextResponse.json(body);
}
