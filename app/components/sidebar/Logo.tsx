"use client";
import { useRouter } from "next/navigation";
import { GiMaze } from "react-icons/gi";

const Logo = () => {
  // Component for displaying the Daedalus log and link back to the homepage

  // Setup the next router
  const router = useRouter();

  // Render the sidebar title section with the logo and link∏
  return (
    <section className="sidebar-title pl-6 py-2 my-0 hover:opacity-80 hover:cursor-pointer" onClick={() => router.push("/")}>
      <GiMaze size={30} />
      <div className="flex flex-col p-4">
        <div>Daedalus</div>
      </div>
    </section>
  );
};

export default Logo;
