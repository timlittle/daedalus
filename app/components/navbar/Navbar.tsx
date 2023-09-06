"use client";

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { GiMaze } from "react-icons/gi";

interface NavbarProps {
  currentUser?: SafeUser | null;
  menuItems: React.ReactNode[];
  mobile?: boolean;
  badgeLabel?: string;
  badgeAction?: () => void;
  documentTitle?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, mobile, menuItems, badgeLabel, badgeAction, documentTitle }) => {
  const router = useRouter();

  return (
    <div className={`navbar ${mobile ? "sm:hidden" : ""}`}>
      <div className="navbar-start gap-4">
        <div className="flex flex-row gap-4 hover:cursor-pointer items-center" onClick={() => router.push("/")}>
          <GiMaze size={30} />
          <div>Daedalus</div>
        </div>
        {badgeLabel && (
          <div className="badge badge-flat-primary hover:cursor-pointer hidden sm:block" onClick={badgeAction}>
            {badgeLabel}
          </div>
        )}
      </div>
      {documentTitle && (
        <div className="gap-4 navbar-center">
          <div className="title">{documentTitle}</div>
        </div>
      )}
      <div className="navbar-end">
        <div className="navbar-item dropdown">
          <div tabIndex={0}>Menu</div>
          <div className="dropdown-menu">{menuItems.map((menuItem) => menuItem)}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
