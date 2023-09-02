"use client";

import { SafeUser } from '@/app/types';
import Footer from './Footer';
import Logo from './Logo';
import UserMenu from './UserMenu';
import { Document, Project } from '@prisma/client';

interface SideBarProps {
  currentUser?: SafeUser | null;
  projects?: Project[] | undefined;
  documents?: Document[] | undefined;
  projectId?: string;
}

const Sidebar: React.FC<SideBarProps> = ({
  currentUser,
  projects,
  documents,
  projectId
}) => {
  return (
    <div className="sidebar sidebar-mobile h-screen justify-start max-sm:fixed max-sm:-translate-x-full">
        <Logo />
        <UserMenu currentUser={currentUser} projects={projects} documents={documents}/>
        <Footer currentUser={currentUser} projectId={projectId}/>
    </div>
  );
};

export default Sidebar;
