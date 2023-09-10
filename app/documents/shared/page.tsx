import getAllSharedDocuments from "@/app/actions/getAllSharedDocuments";
import getCurrentUser from "@/app/actions/getCurrentUser";
import AppContainer from "@/app/components/AppContainer";
import EmptyState from "@/app/components/EmptyState";
import ProjectPageClient from "@/app/projects/[projectId]/ProjectPageClient";

const DocumentsPage = async () => {
  // Server side handler to fetch all shared documents for user and rendering view

  // Fetch the user and confirm they are valid
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <AppContainer currentUser={currentUser} body={<EmptyState />} />;
  }

  // Fetch all the shared documents for the user from the database
  const documents = await getAllSharedDocuments({ userId: currentUser.id });

  // If the user has no shared documents then display a placeholder
  if (documents && documents.length === 0) {
    return <AppContainer currentUser={currentUser} body={<EmptyState title="No shared documents" subtitle="Start sharing" />} />;
  }

  // Render the ProjectPageClient view with the shared documents
  return (
    <AppContainer
      currentUser={currentUser}
      documents={documents}
      body={<ProjectPageClient projectTitle="My Shared Documents" documents={documents} />}
    />
  );
};

export default DocumentsPage;
