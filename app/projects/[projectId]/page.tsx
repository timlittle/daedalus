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
  const currentUser = await getCurrentUser();
  const { projectId } = params;
  const project = await getProjectById({projectId: projectId});

  if (!project || !currentUser) {
    return <AppContainer currentUser={currentUser} body={<EmptyState />} />;
  }

  const documents = await getDocumentsByProjectId({projectId: project.id});

  if (documents.length == 0) {
    return (
      <AppContainer 
        currentUser={currentUser}
        projectId={projectId}
        body={
        <EmptyState title="No documents found" subtitle="Start by clicking New Document"/>
      }
      />
    )
  }

  return (
    <AppContainer
      currentUser={currentUser}
      documents={documents}
      projectId={projectId}
      body={
        <ProjectPageClient projectTitle={project.title} documents={documents} />
      }
    />
  );
};

export default ProjectPage;
