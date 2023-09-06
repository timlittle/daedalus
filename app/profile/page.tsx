import getCurrentUser from "../actions/getCurrentUser";
import getGithubAuthZByUserId from "../actions/getGithubAuthZByUserId";
import AppContainer from "../components/AppContainer";
import EmptyState from "../components/EmptyState";
import ProfileClient from "./ProfileClient";

export default async function Profile() {
  const currentUser = await getCurrentUser();

  const githubAppName = process.env.GITHUB_APP_NAME;

  if (!currentUser || !githubAppName) {
    return <AppContainer currentUser={currentUser} body={<EmptyState title="Unauthorized" subtitle="Please sign in" />} />;
  }
  const githubAuthZ = await getGithubAuthZByUserId({ userId: currentUser.id });

  return (
    <AppContainer
      currentUser={currentUser}
      body={<ProfileClient currentUser={currentUser} githubAuthZ={githubAuthZ} githubAppName={githubAppName} />}
    />
  );
}
