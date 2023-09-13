import getAllSharedUsers from "@/app/actions/getAllSharedUsers";
import getAllUsers from "@/app/actions/getAllUsers";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getDocumentById from "@/app/actions/getDocumentById";
import getProjectById from "@/app/actions/getProjectById";
import AppContainer from "@/app/components/AppContainer";
import EmptyState from "@/app/components/EmptyState";
import { SafeUser } from "@/app/types";
import dynamic from "next/dynamic";

// @ts-ignore
import getGithubAuthZByUserId from "@/app/actions/getGithubAuthZByUserId";
import getGithubOwner from "@/app/actions/getGithubOwner";
import getGithubRepos from "@/app/actions/getGithubRepos";
import jsonwebtoken from "jsonwebtoken";

interface IDocumentParams {
  documentId: string;
}

const DocumentPage = async ({ params }: { params: IDocumentParams }) => {
  // Server side hanldier for the editor
  // Fetches the document, github auth, githut repos, shared users

  // Fetch the user from the database
  const currentUser = await getCurrentUser();

  // Get the document ID from the URL params
  const { documentId } = params;

  // Fetch the document from the database
  const document = await getDocumentById({ documentId: documentId });
  // Fetch the project from the database base on the document project id
  const project = await getProjectById({ projectId: document?.projectId });
  // Fetch all the users in the database
  const allUsers = await getAllUsers();
  // Fetch all the users that have permission to view the document
  const sharedUsers = await getAllSharedUsers({ documentId: documentId, ownerId: document?.userId });
  // Fetch the JWT secret from the envvar for the yJS provider
  const jwtSecret = await process.env.TIPTAP_JWT_SECRET;
  const tipTapApp = await process.env.TIPTAP_APP;

  // If there is mising data, error and feedback to the user
  if (!document || !project || !currentUser || !jwtSecret || !tipTapApp) {
    return <AppContainer currentUser={currentUser} body={<EmptyState title="Error" subtitle="An error occured" />} />;
  }

  // Generate a JWT token for the yJS provider
  const jwtToken = jsonwebtoken.sign({}, jwtSecret);

  // Function to determine if the current user has permission to view the document
  const hasPermission = (currentUser: SafeUser) => {
    let found = false;

    // Loop through all the shared users and confirm the current users is in there
    if (sharedUsers) {
      sharedUsers.map((user) => {
        if (currentUser.id === user.id) {
          found = true;
        }
      });
    }

    return found;
  };

  // If the user does not have permission, display a prompt to request permission
  if (!hasPermission(currentUser)) {
    return <AppContainer currentUser={currentUser} body={<EmptyState title="Unauthorized" subtitle="Please request permission" />} />;
  }

  // Fetch GitHub auth, Github repos and Github Owner from the database/github API
  const githubAuthZ = await getGithubAuthZByUserId({ userId: currentUser.id });
  const githubOwner = await getGithubOwner({ githubAuthZ: githubAuthZ });
  const githubRepos = await getGithubRepos({ githubAuthZ: githubAuthZ, githubOwner: githubOwner });

  // Use lazy load for the Editor and disable server side rendering
  const DocumentClientNoSrr = dynamic(() => import("./DocumentsClient"), { ssr: false });

  // Render the editor view with all the information gathered above
  return (
    <DocumentClientNoSrr
      currentUser={currentUser}
      document={document}
      project={project}
      allUsers={allUsers}
      sharedUsers={sharedUsers}
      jwtToken={jwtToken}
      tipTapApp={tipTapApp}
      githubAuthZ={githubAuthZ}
      githubOwner={githubOwner}
      githubRepos={githubRepos}
    />
  );
};

export default DocumentPage;
