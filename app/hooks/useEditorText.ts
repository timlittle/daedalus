import { create } from "zustand";

interface EditorTextStore {
  content: string;
  setContent: (content: string) => void;
}

const useEditorText = create<EditorTextStore>((set) => ({
  content: "",
  setContent: (content) => set(() => ({ content: content })),
}));

export default useEditorText;
