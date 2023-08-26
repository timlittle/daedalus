import { Document, Project } from "@prisma/client";
import { SafeUser } from "../types";
import ClientOnly from "./ClientOnly";
import Sidebar from "./sidebar/Sidebar";
import Container from "./Container";
import MobileNavbar from "./mobilenavbar/MobileNavbar";

interface AppContainerProps {
    currentUser: SafeUser | null;
    projects?: Project[];
    documents?: Document[];
    projectId?: string;
    body: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({
    currentUser,
    projects,
    documents,
    projectId,
    body
}) => {
    return (
        <div className='flex sm:flex-row flex-col gap-2'>
        <ClientOnly>
            <MobileNavbar currentUser={currentUser}/>
            <Sidebar currentUser={currentUser} projects={projects} documents={documents} projectId={projectId}/>
        </ClientOnly>
        <ClientOnly>
          <Container>
            {body}
          </Container>
        </ClientOnly>
      </div>
    );
}
 
export default AppContainer;