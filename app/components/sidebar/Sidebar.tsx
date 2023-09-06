"use client";

import { SafeUser } from "@/app/types";
import { Document, Project } from "@prisma/client";
import Footer from "./Footer";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

interface SideBarProps {
  currentUser?: SafeUser | null;
  projects?: Project[] | undefined;
  documents?: Document[] | undefined;
  projectId?: string;
}

const Sidebar: React.FC<SideBarProps> = ({ currentUser, projects, documents, projectId }) => {
  return (
    <div className="w-full max-w-[18rem] max-h-screen">
      <div className="sidebar sidebar-mobile sidebar-fixed-left justify-start max-sm:fixed max-sm:-translate-x-full">
        <Logo />
        <UserMenu currentUser={currentUser} projects={projects} documents={documents} />
        <Footer currentUser={currentUser} projectId={projectId} />
      </div>
    </div>
  );
};

export default Sidebar;
