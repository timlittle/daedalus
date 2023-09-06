"use client";
import useGithubSyncModal from "@/app/hooks/useGithubSyncModal";
import { useCallback } from "react";
import { PiGithubLogoFill } from "react-icons/pi";
import { snakeCase } from "snake-case";
import MenuItem from "../navbar/MenuItem";

interface GitSyncMenuItemProps {
  documentTitle: string;
  githubOwner: string | undefined;
  githubRepos: string[] | undefined;
}

const GitSyncMenuItem: React.FC<GitSyncMenuItemProps> = ({ documentTitle, githubOwner = "", githubRepos = [] }) => {
  const githubSyncModal = useGithubSyncModal();

  const onOpen = useCallback(() => {
    githubSyncModal.setGithubOwner(githubOwner);
    githubSyncModal.setGithubPath(`docs/${snakeCase(documentTitle.toLowerCase())}.md`);
    githubSyncModal.setGithubRepos(githubRepos);
    githubSyncModal.onOpen();
  }, [githubSyncModal, githubOwner, githubRepos, documentTitle]);

  return <MenuItem action={onOpen} actionLabel="Sync to GitHub" icon={PiGithubLogoFill} />;
};

export default GitSyncMenuItem;
