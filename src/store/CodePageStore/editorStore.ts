import { create } from "zustand";

interface Tab {
  key: string;
  title: string;
}

interface aboutEditor {
  tabs: Tab[];
  addTab: (newTab: Tab) => void;
}

const editorStore = create<aboutEditor>((set) => ({
  tabs: [],
  addTab: (newTab) => set((state) => ({ tabs: [...state.tabs, newTab] })),
}));

export default editorStore;
