"use client";

import Footer from './Footer';
import Logo from './Logo';
import UserMenu from './UserMenu';

const Sidebar = () => {
  return (
    <div className="sidebar min-h-screen justify-start">
        <Logo />
        <UserMenu />
        <Footer />
    </div>
  );
};

export default Sidebar;
