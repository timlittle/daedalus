import getCurrentUser from "../actions/getCurrentUser";
import getProjects from "../actions/getProjects";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import Sidebar from "../components/sidebar/Sidebar";
import ProjectsClient from "./ProjectsClient";

const ProjectsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div className="flex flex-row gap-2">
        <ClientOnly>
          <Sidebar currentUser={currentUser} />
        </ClientOnly>
        <ClientOnly>
          <EmptyState title="Unauthorized" subtitle="Please log in" />
        </ClientOnly>
      </div>
    );
  }

  const projects = await getProjects({
    userId: currentUser.id,
  });

  if (projects.length === 0) {
    return (
      <div className="flex flex-row gap-2">
        <ClientOnly>
          <Sidebar currentUser={currentUser} />
        </ClientOnly>
        <ClientOnly>
          <EmptyState
            title="No projects found"
            subtitle="Looks like you have no prjects"
          />
        </ClientOnly>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-2">
      <ClientOnly>
        <Sidebar projects={projects} currentUser={currentUser} />
      </ClientOnly>
      <ClientOnly>
        <ProjectsClient projects={projects} currentUser={currentUser} />
      </ClientOnly>
    </div>
  );
};

export default ProjectsPage;
