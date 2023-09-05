import useGithubSyncModal from "@/app/hooks/useGithubSyncModal";
import { useCallback } from "react";
import { PiGithubLogoFill } from "react-icons/pi";
import { snakeCase } from "snake-case";

interface SyncDocumentToGitProps {
  documentTitle: string;
  githubOwner: string | undefined;
  githubRepos: string[] | undefined;
}

const SyncDocumentToGit: React.FC<SyncDocumentToGitProps> = ({ documentTitle, githubOwner = "", githubRepos = [] }) => {
  const githubSyncModal = useGithubSyncModal();

  const onOpen = useCallback(() => {
    githubSyncModal.setGithubOwner(githubOwner);
    githubSyncModal.setGithubPath(`docs/${snakeCase(documentTitle.toLowerCase())}.md`);
    githubSyncModal.setGithubRepos(githubRepos);
    githubSyncModal.onOpen();
  }, [githubSyncModal, githubOwner, githubRepos, documentTitle]);

  return (
    <div className="btn btn-primary" onClick={onOpen}>
      <PiGithubLogoFill />
      <div>Sync</div>
    </div>
  );
};

export default SyncDocumentToGit;
