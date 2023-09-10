"use client";

import useDocumentModal from "@/app/hooks/useDocumentModal";
import useProjectModal from "@/app/hooks/useProjectModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "../Button";
import MenuItem from "../navbar/MenuItem";

interface FooterProps {
  currentUser?: SafeUser | null;
  projectId?: string;
}

const Footer: React.FC<FooterProps> = ({ currentUser, projectId }) => {
  // Component for displaying the footer of the sidebar
  // Will change depending on if the user is logged in

  // Setup the modals for the "new" buttons displayed above the user section
  const projectModal = useProjectModal();
  const documentModal = useDocumentModal();
  const router = useRouter();

  // Default state for the creation button
  let createButton = <Button label="New Project" onClick={projectModal.onOpen} />;

  // Default menu items used in the dropdown when clicking the user
  let menuItems = [
    <MenuItem key="projects" action={() => router.push("/projects")} actionLabel="Projects" />,
    <MenuItem key="documents" action={() => router.push("/documents")} actionLabel="Documents" />,
    <MenuItem key="shared" action={() => router.push("/documents/shared")} actionLabel="Shared Documents" />,
    <MenuItem key="profile" action={() => router.push("/profile")} actionLabel="Profile" />,
    <MenuItem key="help" action={() => router.push("/help")} actionLabel="Help" />,
    <MenuItem key="logout" action={() => signOut()} actionLabel="Logout" />,
  ];

  // If the page view is for a project, prompt the user to create documents in the project
  if (projectId) {
    createButton = <Button label="New Document" onClick={documentModal.onOpen} />;
  }

  // If the user is not logged in, display a placeholder section
  if (!currentUser) {
    return (
      <section className="sidebar-footer h-full justify-end bg-gray-2 pt-2">
        <div className="divider my-0" />
        <div className="dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-4">
          <label className="whites mx-2 flex h-fit w-full cursor-pointer p-0 hover:bg-gray-4" tabIndex={0}>
            <div className="flex flex-row gap-4 p-4">
              <div className="avatar avatar-md">
                <Image alt="avatar" width={30} height={30} src="/images/placeholder.jpg" />
              </div>
            </div>
          </label>
        </div>
      </section>
    );
  }

  // Render the footer
  // Uses the currentUser to pull the avatar for the user and details to customise the section
  // Loops through the menu-items to display them in the dropdown menu
  return (
    <section className="sidebar-footer h-full justify-end bg-gray-2 pt-2">
      {createButton}

      <div className="divider my-0" />
      <div data-cy="footer-menu" className="dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-4">
        <label className="whites mx-2 flex h-fit w-full cursor-pointer p-0 hover:bg-gray-4" tabIndex={0}>
          <div className="flex flex-row gap-4 p-4">
            <div className="avatar avatar-md">
              <Image alt="avatar" width={30} height={30} src={currentUser?.image || "/images/placeholder.jpg"} />
            </div>
            <div className="flex flex-col">
              <div>{currentUser?.name}</div>
              <div className="text-xs font-normal text-content2">{currentUser?.email}</div>
            </div>
          </div>
        </label>
        <div className="dropdown-menu dropdown-menu-right-top ml-2">{menuItems.map((menuItem) => menuItem)}</div>
      </div>
    </section>
  );
};

export default Footer;
