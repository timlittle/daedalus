import { create } from "zustand";

// Store the editor state in a custom hook using zustand
interface EditorTextStore {
  content: string;
  setContent: (content: string) => void;
}

const useEditorText = create<EditorTextStore>((set) => ({
  content: "",
  setContent: (content) => set(() => ({ content: content })),
}));

export default useEditorText;
