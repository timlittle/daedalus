import getCurrentUser from "@/app/actions/getCurrentUser";
import getDocumentsByProjectId from "@/app/actions/getDocumentsByProjectId";
import getProjectById from "@/app/actions/getProjectById";
import AppContainer from "@/app/components/AppContainer";
import EmptyState from "@/app/components/EmptyState";
import ProjectPageClient from "./ProjectPageClient";

interface IParams {
  projectId: string;
}

const ProjectPage = async ({ params }: { params: IParams }) => {
  // Server handler for dispalying the documents that are assosicated with a project

  // Fetch the user from the databast
  const currentUser = await getCurrentUser();

  // Fetch the project from the URL params
  const { projectId } = params;

  // Fetch the project from the database using the project id
  const project = await getProjectById({ projectId: projectId });

  // Error if the project or the user are not valid
  if (!project || !currentUser) {
    return <AppContainer currentUser={currentUser} body={<EmptyState />} />;
  }

  // Fetch all the documents in a project from the database
  const documents = await getDocumentsByProjectId({ projectId: project.id });

  // Render the documents using the ProjectPageClient view
  return (
    <AppContainer
      currentUser={currentUser}
      documents={documents}
      projectId={projectId}
      body={<ProjectPageClient projectTitle={project.title} documents={documents} showNew />}
    />
  );
};

export default ProjectPage;
