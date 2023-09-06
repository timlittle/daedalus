import { create } from "zustand";
import { SafeUser } from "../types";

interface ShareModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  documentId: string;
  userId: string;
  allUsers: SafeUser[];
  setUserId: (userId: string) => void;
  setDocumentId: (documentId: string) => void;
  sharedUsers: SafeUser[];
  setAllUsers: (allUsers: SafeUser[]) => void;
  setSharedUsers: (sharedUsers: SafeUser[]) => void;
}

const useShareModal = create<ShareModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  sharedUsers: [],
  documentId: "",
  userId: "",
  allUsers: [],
  setSharedUsers: (sharedUsers) => set(() => ({ sharedUsers: sharedUsers })),
  setAllUsers: (allUsers) => set(() => ({ allUsers: allUsers })),
  setDocumentId: (documentId) => set(() => ({ documentId: documentId })),
  setUserId: (userId) => set(() => ({ userId: userId })),
}));

export default useShareModal;
