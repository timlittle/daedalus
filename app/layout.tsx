import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import ClientOnly from "./components/ClientOnly";
import DocumentModal from "./components/modals/DocumentModal";
import GithubSyncModal from "./components/modals/GithubSyncModal";
import LoginModal from "./components/modals/LoginModal";
import ProjectModal from "./components/modals/ProjectModal";
import RegisterModal from "./components/modals/RegisterModal";
import ShareModal from "./components/modals/ShareModal";
import "./globals.css";
import ToasterProvider from "./providers/ToastProvider";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daedalus",
  description: "Collaborative markdown documentation as code platform",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <ProjectModal />
          <DocumentModal />
          <GithubSyncModal />
          <ShareModal />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
