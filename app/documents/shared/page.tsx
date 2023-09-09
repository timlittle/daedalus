import getAllSharedDocuments from "@/app/actions/getAllSharedDocuments";
import getCurrentUser from "@/app/actions/getCurrentUser";
import AppContainer from "@/app/components/AppContainer";
import EmptyState from "@/app/components/EmptyState";
import ProjectPageClient from "@/app/projects/[projectId]/ProjectPageClient";

const DocumentsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <AppContainer currentUser={currentUser} body={<EmptyState />} />;
  }

  const documents = await getAllSharedDocuments({ userId: currentUser.id });

  if (documents && documents.length === 0) {
    return <AppContainer currentUser={currentUser} body={<EmptyState title="No shared documents" subtitle="Start sharing" />} />;
  }

  return (
    <AppContainer
      currentUser={currentUser}
      documents={documents}
      body={<ProjectPageClient projectTitle="My Shared Documents" documents={documents} />}
    />
  );
};

export default DocumentsPage;
