"use client";

import { SafeUser } from '@/app/types';
import Footer from './Footer';
import Logo from './Logo';
import UserMenu from './UserMenu';
import { Project } from '@prisma/client';

interface SideBarProps {
  currentUser?: SafeUser | null;
  projects?: Project[] | undefined;
}

const Sidebar: React.FC<SideBarProps> = ({
  currentUser,
  projects
}) => {
  return (
    <div className="sidebar min-h-screen max-sm:-translate-x-full sidebar-mobile">
        <Logo />
        <UserMenu currentUser={currentUser} projects={projects}/>
        <Footer currentUser={currentUser}/>
    </div>
  );
};

export default Sidebar;
