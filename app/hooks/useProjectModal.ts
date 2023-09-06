import { create } from "zustand";

interface ProjectModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isEdit: boolean;
  onEdit: () => void;
  projectTitle: string;
  projectId: string;
  projectDescription: string;
  setProjectTitle: (projectTitle: string) => void;
  setProjectId: (projectId: string) => void;
  setProjectDescription: (projectDescription: string) => void;
}

const useProjectModal = create<ProjectModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () =>
    set({
      isOpen: false,
      isEdit: false,
    }),
  isEdit: false,
  onEdit: () => set({ isOpen: true, isEdit: true }),
  projectTitle: "",
  projectId: "",
  projectDescription: "",
  setProjectTitle: (title) => set(() => ({ projectTitle: title })),
  setProjectId: (id) => set(() => ({ projectId: id })),
  setProjectDescription: (description) => set(() => ({ projectDescription: description })),
}));

export default useProjectModal;
