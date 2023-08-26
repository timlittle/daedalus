import getCurrentUser from "./actions/getCurrentUser";
import AppContainer from "./components/AppContainer";
import EmptyState from "./components/EmptyState";

export const dynamic = "force-dynamic";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <AppContainer
        currentUser={currentUser}
        body={
          <EmptyState title="Welcome to Daedalus" subtitle="Please sign in" />
        }
      />
    );
  }

  return (
    <AppContainer
      currentUser={currentUser}
      body={
        <EmptyState
          title={`Welcome ${currentUser.name}`}
          subtitle="Lets get started"
        />
      }
    />
  );
}
