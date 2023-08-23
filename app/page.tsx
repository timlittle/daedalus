import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import Sidebar from "./components/sidebar/Sidebar";

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
    <div className='flex flex-row gap-2'>
        <ClientOnly>
            <Sidebar currentUser={currentUser}/>
        </ClientOnly>
        <ClientOnly>
          <Container>
          <EmptyState 
                title={`Welcome ${currentUser.name}`}
                subtitle="Lets get started"
              />
          </Container>
        </ClientOnly>
      </div>
  )

  }