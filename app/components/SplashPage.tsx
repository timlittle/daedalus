"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { GiMaze } from "react-icons/gi";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import MenuItem from "./navbar/MenuItem";

const SplashPage = () => {
  // Main splash page for unauthenticated users
  // Displays information about the application
  // Uses a different navbar design and hardcoded narrative with images to demo the sites

  // Fetch the login and register modal for users wishing to sign in or sign up
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();

  // Setup the menu
  const navbarMenuItems = [
    <MenuItem key="signIn" action={loginModal.onOpen} actionLabel="Sign In" />,
    <MenuItem key="Register" action={registerModal.onOpen} actionLabel="Register" />,
    <MenuItem key="help" action={() => router.push("/help")} actionLabel="Help" />,
  ];

  // Render the page, highlighing the purpose of Daedalus and its features.
  return (
    <div className="flex flex-col">
      <header className="top-0 w-full clearNav z-50">
        <div className="navbar navbar-sticky max-w-5xl mx-auto navbar-no-boxShadow">
          <div className="navbar-start gap-4">
            <div className="flex flex-row gap-4 hover:cursor-pointer items-center" onClick={() => router.push("/")}>
              <GiMaze size={30} />
              <div>Daedalus</div>
            </div>
          </div>
          <div className="navbar-end">
            <div data-cy="navbar-menu-login" className="btn btn-primary hidden sm:inline-flex" onClick={loginModal.onOpen}>
              Sign in
            </div>
            <div data-cy="navbar-menu-register" className="btn btn-outline-primary hidden sm:inline-flex" onClick={registerModal.onOpen}>
              Register
            </div>
            <div data-cy="navbar-menu-help" className="btn btn-solid-primary hidden sm:inline-flex" onClick={() => router.push("/help")}>
              Help
            </div>
            <div className="dropdown inline-flex sm:hidden">
              <FiMenu size={30} tabIndex={0} data-cy="navbar-menu" />
              <div className="dropdown-menu">{navbarMenuItems.map((menuItem) => menuItem)}</div>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-5xl mx-auto flex flex-wrap p-5 flex-col md:flex-row">
        <div data-cy="header-title" className="text-center font-bold text-white mb-6 text-6xl pt-24 w-full">
          Daedalus
        </div>
        <div className="text-center text-xl font-semibold text-gray-500 w-full flex items-center flex-row justify-center pt-4">
          <div data-cy="header-subtitle" className="max-w-3xl">
            A collaborative documentation as code platform enabling designers to create narratives and diagrams in the same tool
          </div>
        </div>
        <div className="flex flex-row w-full items-center justify-center gap-8 pt-8">
          <div data-cy="splash-login" className="btn btn-primary" onClick={loginModal.onOpen}>
            Sign in
          </div>
          <div data-cy="splash-register" className="btn btn-outline-primary" onClick={registerModal.onOpen}>
            Register
          </div>
        </div>
        <h2 className="pt-24 mb-1 text-2xl font-semibold tracking-tighter text-center text-gray-200 lg:text-5xl md:text-4xl w-full">Features</h2>
        <div className="flex flex-col w-full items-center justify-center gap-8 pt-8 sm:flex-row">
          <div className="card card-image-cover">
            <Image src="/images/collaborate.png" width={400} height={200} alt="Photo" />
            <div className="card-body">
              <h2 className="card-header">Real-time collaboration</h2>
              <p className="text-content2">Collaborate with your peers on the same document, seeing updates to text and a diagrams in real-time</p>
              <div className="card-footer">
                <button className="btn-primary btn" onClick={() => router.push("/help")}>
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="card card-image-cover">
            <Image src="/images/gitsync.png" width={400} height={200} alt="Photo" />
            <div className="card-body">
              <h2 className="card-header">Syncronise with GitHub</h2>
              <p className="text-content2">Store you documents alongside your code using github syncronisation</p>
              <div className="card-footer">
                <button className="btn-primary btn" onClick={() => router.push("/help")}>
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="card card-image-cover">
            <Image src="/images/uml.png" width={400} height={200} alt="Photo" />
            <div className="card-body">
              <h2 className="card-header">Mermaid and PlantUML suppoer</h2>
              <p className="text-content2">Use Markdown, MermaidJS and PlantUML to build your document</p>
              <div className="card-footer">
                <button className="btn-primary btn" onClick={() => router.push("/help")}>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
