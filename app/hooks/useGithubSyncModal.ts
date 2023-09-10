import { create } from "zustand";

// Shared state for the github sync modal
// Contains boolean for displaying the modal
// Contains state used to prepopulate the modal when it is opened
interface GithubSyncModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  githubOwner: string;
  setGithubOwner: (githubOwner: string) => void;
  githubRepos: string[];
  setGithubRepos: (githubRepos: string[]) => void;
  githubPath: string;
  setGithubPath: (githubPath: string) => void;
}

const useGithubSyncModal = create<GithubSyncModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  githubOwner: "",
  setGithubOwner: (githubOwner) => set(() => ({ githubOwner: githubOwner })),
  githubRepos: [],
  setGithubRepos: (githubRepos) => set(() => ({ githubRepos: githubRepos })),
  githubPath: "",
  setGithubPath: (githubPath) => set(() => ({ githubPath: githubPath })),
}));

export default useGithubSyncModal;
