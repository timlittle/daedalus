import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
          <EmptyState 
            title="Welcome to Daedalus"
            subtitle="Please sign in"
          />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <EmptyState 
        title={`Welcome back ${currentUser.name}!`}
        subtitle="Have fun!"
      />
    </ClientOnly>
  )

  }