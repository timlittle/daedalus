import getCurrentUser from "../actions/getCurrentUser";
import getGithubAuthZByUserId from "../actions/getGithubAuthZByUserId";
import AppContainer from "../components/AppContainer";
import EmptyState from "../components/EmptyState";
import ProfileClient from "./ProfileClient";

export default async function Profile() {
  // Server side handler for fetching the state of the user and displaying a profile page
  // Includes the state of the github app connection

  // Fetch the user from the database
  const currentUser = await getCurrentUser();

  // Fetch the github app name from the envvar
  const githubAppName = process.env.GITHUB_APP_NAME;

  // If the current user or github app are not valid then error
  if (!currentUser || !githubAppName) {
    return <AppContainer currentUser={currentUser} body={<EmptyState title="Unauthorized" subtitle="Please sign in" />} />;
  }

  // Fetch the github auth status of the user
  const githubAuthZ = await getGithubAuthZByUserId({ userId: currentUser.id });

  // Render the profile using the ProfileClient view
  return (
    <AppContainer
      currentUser={currentUser}
      body={<ProfileClient currentUser={currentUser} githubAuthZ={githubAuthZ} githubAppName={githubAppName} />}
    />
  );
}
