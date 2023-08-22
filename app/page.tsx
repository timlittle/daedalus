import getCurrentUser from "./actions/getCurrentUser";
import getProjects from "./actions/getProjects";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ProjectCard from "./components/projects/ProjectCard";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const currentUser = await getCurrentUser();

  const projects = await getProjects({userId: currentUser?.id});

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
      <Container>
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold flex pt-8 justify-center">Projects</div>
          <div className="pt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            {projects.map((project)=>{
              return (
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    currentUser={currentUser}
                    key={project.id}
                    onAction={()=>{}}
                  />
              );
            })}
          </div>

        </div>
      </Container>
    </ClientOnly>
  )

  }