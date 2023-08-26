'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GiMaze } from "react-icons/gi";

interface MobileNavbarProps {
  currentUser?: SafeUser | null;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ currentUser }) => {

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();

  if (!currentUser){
    return (
      <div className="navbar sm:hidden">
        <div className="navbar-start">
          <GiMaze size={30} />
          <div>Daedalus</div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item" onClick={loginModal.onOpen}>Sign In</div>
          <div className="navbar-item" onClick={registerModal.onOpen}>Register</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="navbar sm:hidden">
        <div className="navbar-start">
          <GiMaze size={30} />
          <div>Daedalus</div>
        </div>
      <div className="navbar-end">
        <div className="navbar-item dropdown">
          <div tabIndex={0}>Home</div>
          <div className="dropdown-menu">
            <div tabIndex={-1} className="dropdown-item" onClick={() => router.push('/projects')}>Projects</div>
            <div tabIndex={-1} className="dropdown-item">Profile</div>
            <div tabIndex={-1} className="dropdown-item" onClick={() => signOut()}>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
