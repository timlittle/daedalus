import getCurrentUser from "../actions/getCurrentUser";
import getDocumentsByUserId from "../actions/getDocumentsByUserId";
import AppContainer from "../components/AppContainer";
import EmptyState from "../components/EmptyState";
import ProjectPageClient from "../projects/[projectId]/ProjectPageClient";

const DocumentsPage = async () => {
  // Server side handler for fetch all the documents for a user and rendering the view

  // Fetch the user and confirm they are valid
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <AppContainer currentUser={currentUser} body={<EmptyState />} />;
  }

  // Fetch all the documents for the user from the database
  const documents = await getDocumentsByUserId({ userId: currentUser.id });

  // If the documents do not have any documents, display a placeholder
  if (documents.length == 0) {
    return (
      <AppContainer
        currentUser={currentUser}
        body={<EmptyState title="No documents found" subtitle="Start by creating a project, then a document" />}
      />
    );
  }

  // Render the ProjectPageClient view with the documents
  return (
    <AppContainer currentUser={currentUser} documents={documents} body={<ProjectPageClient projectTitle="My Documents" documents={documents} />} />
  );
};

export default DocumentsPage;
