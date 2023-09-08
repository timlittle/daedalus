"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from "@/app/types";
import { Document, Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { AiOutlineFolder } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";

interface UserMenuProps {
  currentUser?: SafeUser | null;
  projects?: Project[];
  documents?: Document[];
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser, projects, documents }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  let menuContent = (
    <ul className="menu-items">
      <li data-cy="sidebar-button-project" className="menu-item" onClick={() => router.push("/projects")}>
        <AiOutlineFolder size={16} />
        <div>My Projects</div>
      </li>
      <li data-cy="sidebar-button-documents" className="menu-item" onClick={() => router.push("/documents")}>
        <HiOutlineDocumentText size={16} />
        <div>My Documents</div>
      </li>
      <li data-cy="sidebar-button-shared-documents" className="menu-item" onClick={() => router.push("/documents/shared")}>
        <HiOutlineDocumentText size={16} />
        <div>Shared documents</div>
      </li>
    </ul>
  );

  let pageContent;

  if (projects) {
    pageContent = (
      <div className="menu-section overflow-scroll max-h-10 md:max-h-30 lg:max-h-40 xl:max-h-52 2xl:max-h-full">
        <div className="menu-tile">Projects</div>
        <ul className="menu-items">
          {projects?.splice(0, 5).map((project) => (
            <li data-cy={`sidebar-button-recent-projects-${project.title.split(' ').join('-').toLowerCase()}`} className="menu-item" onClick={() => router.push(`/projects/${project.id}`)} key={project.id}>
              <AiOutlineFolder size={16} />
              <div>{project.title}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (documents) {
    pageContent = (
      <div className="menu-section overflow-scroll max-h-full">
        <div className="menu-tile">Documents</div>
        <ul className="menu-items">
          {documents?.splice(0, 5).map((document) => (
            <li data-cy={`sidebar-button-recent-documents-${document.title.split(' ').join('-').toLowerCase()}`} className="menu-item" onClick={() => router.push(`/documents/${document.id}`)} key={document.id}>
              <HiOutlineDocumentText size={16} />
              <div>{document.title}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!currentUser) {
    menuContent = (
      <ul className="menu-items">
        <li data-cy="sidebar-button-login" className="menu-item" onClick={loginModal.onOpen}>
          <div>Log in</div>
        </li>
        <li data-cy="sidebar-button-register" className="menu-item" onClick={registerModal.onOpen}>
          <div>Register</div>
        </li>
      </ul>
    );
  }

  return (
    <section className="sidebar-content max-h-fit overflow-visible py-0">
      <div className="divider my-0" />
      <nav className="nav rounded-md my-2">
        <section className="menu-section px-4">
          {menuContent}
          <div className="divider my-2" />
          {pageContent}
        </section>
      </nav>
    </section>
  );
};

export default UserMenu;
