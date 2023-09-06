'use client';

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { GiMaze } from "react-icons/gi";

interface NavbarProps {
  currentUser?: SafeUser | null;
  menuItems: React.ReactNode[]
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, menuItems }) => {

  const router = useRouter()
  
  return (
    <div className="navbar sm:hidden">
          <div className="navbar-start gap-4 hover:cursor-pointer" onClick={() => router.push("/")}>
            <GiMaze size={30} />
            <div>Daedalus</div>
          </div>
      <div className="navbar-end">
        <div className="navbar-item dropdown">
          <div tabIndex={0}>Home</div>
          <div className="dropdown-menu">
            {menuItems.map((menuItem)=>(menuItem))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
