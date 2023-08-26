import getCurrentUser from "../actions/getCurrentUser";
import getProjects from "../actions/getProjects";
import AppContainer from "../components/AppContainer";
import EmptyState from "../components/EmptyState";
import ProjectsClient from "./ProjectsClient";

const ProjectsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <AppContainer
        currentUser={currentUser}
        body={<EmptyState title="Unauthorized" subtitle="Please log in" />}
      />
    );
  }

  const projects = await getProjects({
    userId: currentUser.id,
  });

  if (projects.length === 0) {
    return (
      <AppContainer
        currentUser={currentUser}
        projects={projects}
        body={
          <EmptyState
            title="No projects found"
            subtitle="Looks like you have no prjects"
          />
        }
      />
    );
  }

  return (
    <AppContainer
      currentUser={currentUser}
      projects={projects}
      body={<ProjectsClient projects={projects} currentUser={currentUser} />}
    />
  );
};

export default ProjectsPage;
