import getCurrentUser from "../actions/getCurrentUser";
import getDocumentsByUserId from "../actions/getDocumentsByUserId";
import AppContainer from "../components/AppContainer";
import EmptyState from "../components/EmptyState";
import ProjectPageClient from "../projects/[projectId]/ProjectPageClient";

const DocumentsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <AppContainer currentUser={currentUser} body={<EmptyState />} />;
  }

  const documents = await getDocumentsByUserId({ userId: currentUser.id });

  if (documents.length == 0) {
    return (
      <AppContainer
        currentUser={currentUser}
        body={<EmptyState title="No documents found" subtitle="Start by creating a project, then a document" />}
      />
    );
  }

  return (
    <AppContainer currentUser={currentUser} documents={documents} body={<ProjectPageClient projectTitle="My Documents" documents={documents} />} />
  );
};

export default DocumentsPage;
