
import getAllSharedUsers from "@/app/actions/getAllSharedUsers";
import getAllUsers from "@/app/actions/getAllUsers";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getDocumentById from "@/app/actions/getDocumentById";
import getProjectById from "@/app/actions/getProjectById";
import AppContainer from "@/app/components/AppContainer";
import EmptyState from "@/app/components/EmptyState";
import { SafeUser } from "@/app/types";
import dynamic from "next/dynamic";

// @ts-ignore
import jsonwebtoken from 'jsonwebtoken'

interface IDocumentParams {
  documentId: string;
}

const DocumentPage = async ({params}: {params: IDocumentParams}) => {
    const currentUser = await getCurrentUser();

    const { documentId } = params;

    const document = await getDocumentById({documentId: documentId})
    const project = await getProjectById({projectId: document?.projectId});
    const allUsers = await getAllUsers();
    const sharedUsers = await getAllSharedUsers({documentId: documentId, ownerId: document?.userId});

    const jwtSecret = await process.env.TIPTAP_JWT_SECRET;
    const jwtToken = jsonwebtoken.sign({},jwtSecret);

    if (!document || !project || !currentUser) {
      return <AppContainer currentUser={currentUser} body={<EmptyState title="Error" subtitle="An error occured"/>} />;
    }

    const hasPermission = (currentUser: SafeUser) => {

      let found = false;

      if (sharedUsers) {
        sharedUsers.map((user)=>{
          if (currentUser.id === user.id) {
            found = true
          }
        })
      }

      return found
    }

    if (!hasPermission(currentUser)) {
      return (
        <AppContainer
          currentUser={currentUser}
          body={<EmptyState title="Unauthorized" subtitle="Please request permission" />}
        />
      );
    }

    const DocumentClientNoSrr = dynamic(() => import('./DocumentsClient'), {ssr: false})

    return (
        <DocumentClientNoSrr currentUser={currentUser} document={document} project={project} allUsers={allUsers} sharedUsers={sharedUsers} jwtToken={jwtToken}/>
      );
}
 
export default DocumentPage;