import { create } from "zustand";

// Shared state for the document modal
// Contains the boolean for displaying the modal
// Contains the state of the document for the edit function
interface DocumentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;

  onEdit: () => void;
  isEdit: boolean;
  documentTitle: string;
  documentId: string;
  projectId: string;
  documentDescription: string;

  setDocumentTitle: (documentTitle: string) => void;
  setDocumentId: (documentId: string) => void;
  setProjectId: (projectId: string) => void;
  setDocumentDescription: (documentDescription: string) => void;
}

const useDocumentModal = create<DocumentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () =>
    set({
      isOpen: false,
      isEdit: false,
    }),
  isEdit: false,
  onEdit: () => set({ isOpen: true, isEdit: true }),
  documentTitle: "",
  documentId: "",
  projectId: "",
  documentDescription: "",
  setDocumentTitle: (title) => set(() => ({ documentTitle: title })),
  setDocumentId: (documentId) => set(() => ({ documentId: documentId })),
  setProjectId: (projectId) => set(() => ({ projectId: projectId })),
  setDocumentDescription: (description) => set(() => ({ documentDescription: description })),
}));

export default useDocumentModal;
