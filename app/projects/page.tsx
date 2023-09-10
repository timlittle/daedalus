import getCurrentUser from "../actions/getCurrentUser";
import getProjects from "../actions/getProjects";
import AppContainer from "../components/AppContainer";
import EmptyState from "../components/EmptyState";
import ProjectsClient from "./ProjectsClient";

const ProjectsPage = async () => {
  // Server side handler for fetching the projects the user owners and listing them on the page

  // Fetch the user from the database
  const currentUser = await getCurrentUser();

  // If the user is not valid, return an error
  if (!currentUser) {
    return <AppContainer currentUser={currentUser} body={<EmptyState title="Unauthorized" subtitle="Please log in" />} />;
  }

  // Fetch the projects for a user from the database
  const projects = await getProjects({ userId: currentUser.id });

  // Render the list of projects using the ProjectsClient view
  return <AppContainer currentUser={currentUser} projects={projects} body={<ProjectsClient projects={projects} />} />;
};

export default ProjectsPage;
