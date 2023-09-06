'use client';
import { Document, Project } from "@prisma/client";
import { SafeUser } from "../types";
import ClientOnly from "./ClientOnly";
import Sidebar from "./sidebar/Sidebar";
import Container from "./Container";
import Navbar from "./navbar/Navbar";
import MenuItem from "./navbar/MenuItem";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";

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

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const router = useRouter();

    let navbarMenuItems = [
      <MenuItem key="projects" action={() => router.push('/projects')} actionLabel="Projects" />,
      <MenuItem key="documents" action={() => router.push('/documents')} actionLabel="Documents" />,
      <MenuItem key="shared" action={() => router.push('/documents/shared')} actionLabel="Shared Documents" />,
      <MenuItem key="profile" action={() => router.push('/profile')} actionLabel="Profile" />,
      <MenuItem key="logout" action={() => signOut()} actionLabel="Logout" />
    ]
    if (!currentUser) {
      navbarMenuItems = [
        <MenuItem key="signIn" action={loginModal.onOpen} actionLabel="Sign In" />,
        <MenuItem key="Register" action={registerModal.onOpen} actionLabel="Register" />,
      ]
    }

    return (
        <div className='flex sm:flex-row flex-col gap-2 h-screen'>
        <ClientOnly>
            <Navbar currentUser={currentUser} menuItems={navbarMenuItems}/>
            <Sidebar currentUser={currentUser} projects={projects} documents={documents} projectId={projectId}/>
          <Container>
            {body}
          </Container>
        </ClientOnly>
      </div>
    );
}
 
export default AppContainer;