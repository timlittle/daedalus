"use client";
import { Document, Project } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiFillQuestionCircle } from "react-icons/ai";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import { SafeUser } from "../types";
import ClientOnly from "./ClientOnly";
import Container from "./Container";
import MenuItem from "./navbar/MenuItem";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

interface AppContainerProps {
  currentUser: SafeUser | null;
  projects?: Project[];
  documents?: Document[];
  projectId?: string;
  body: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ currentUser, projects, documents, projectId, body }) => {
  // Default container for setting up a new page in the management section of the app

  // Fetch the login and register modals for unauthenticate users
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();

  // Setup the default menuitems for the mobile navigation menu
  let navbarMenuItems = [
    <MenuItem key="projects" action={() => router.push("/projects")} actionLabel="Projects" />,
    <MenuItem key="documents" action={() => router.push("/documents")} actionLabel="Documents" />,
    <MenuItem key="shared" action={() => router.push("/documents/shared")} actionLabel="Shared Documents" />,
    <MenuItem key="profile" action={() => router.push("/profile")} actionLabel="Profile" />,
    <MenuItem key="help" action={() => router.push("/help")} actionLabel="Help" />,
    <MenuItem key="logout" action={() => signOut()} actionLabel="Logout" />,
  ];
  // If the user is not logged in, change the menu
  if (!currentUser) {
    navbarMenuItems = [
      <MenuItem key="signIn" action={loginModal.onOpen} actionLabel="Sign In" />,
      <MenuItem key="Register" action={registerModal.onOpen} actionLabel="Register" />,
    ];
  }

  // Setups up the contaimer
  // Uses the Sidebar for desktop and Navbar for mobile. Both toggle when the viewport changes
  // ClientOnly used to prevent hydration issues in the application during load
  // Include a 'help' button on all pages. Making it easy to get help
  return (
    <div className="flex sm:flex-row flex-col gap-2 h-screen">
      <ClientOnly>
        <Navbar currentUser={currentUser} menuItems={navbarMenuItems} mobile />
        <Sidebar currentUser={currentUser} projects={projects} documents={documents} projectId={projectId} />
        <Container>
          <div className="relative">
            <div className="fixed top-3 right-3 flex-row gap-2 items-center btn hidden sm:flex px-3" onClick={() => router.push("/help")}>
              <AiFillQuestionCircle size={16} />
              <div>Help</div>
            </div>
          </div>
          {body}
        </Container>
      </ClientOnly>
    </div>
  );
};

export default AppContainer;
