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
  // Component to sync the current document to github

  // Fetch the github modal from the custom hook
  const githubSyncModal = useGithubSyncModal();

  const onOpen = useCallback(() => {
    // Populate the modal with state, calculate the path for the file and give options of repos
    githubSyncModal.setGithubOwner(githubOwner);
    githubSyncModal.setGithubPath(`docs/${snakeCase(documentTitle.toLowerCase())}.md`);
    githubSyncModal.setGithubRepos(githubRepos);
    // Open the modal
    githubSyncModal.onOpen();
  }, [githubSyncModal, githubOwner, githubRepos, documentTitle]);

  // Render the menuitem with the callback function
  return <MenuItem action={onOpen} actionLabel="Sync to GitHub" icon={PiGithubLogoFill} />;
};

export default GitSyncMenuItem;
