
import getCurrentUser from "@/app/actions/getCurrentUser";
import DocumentClient from "./DocumentsClient";
import AppContainer from "@/app/components/AppContainer";
import EmptyState from "@/app/components/EmptyState";
import getDocumentById from "@/app/actions/getDocumentById";
import getProjectById from "@/app/actions/getProjectById";

interface IDocumentParams {
  documentId: string;
}

const DocumentPage = async ({params}: {params: IDocumentParams}) => {
    const currentUser = await getCurrentUser();

    const { documentId } = params;

    const document = await getDocumentById({documentId: documentId})

    const project = await getProjectById({projectId: document?.projectId});

    if (!document || !currentUser || !project) {
      return <AppContainer currentUser={currentUser} body={<EmptyState />} />;
    }

    if (!currentUser) {
        return (
            <AppContainer
            currentUser={currentUser}
            body={<EmptyState title="Unauthorized" subtitle="Please log in" />}
          />
        );
    }

    return (
        <DocumentClient currentUser={currentUser} document={document} project={project}/>
      );
}
 
export default DocumentPage;