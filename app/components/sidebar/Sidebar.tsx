"use client";

import { SafeUser } from '@/app/types';
import Footer from './Footer';
import Logo from './Logo';
import UserMenu from './UserMenu';

interface SideBarProps {
  currentUser?: SafeUser | null;
}

const Sidebar: React.FC<SideBarProps> = ({currentUser}) => {
  return (
    <div className="sidebar min-h-screen">
        <Logo />
        <UserMenu currentUser={currentUser}/>
        <Footer currentUser={currentUser}/>
    </div>
  );
};

export default Sidebar;
