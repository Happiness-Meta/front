import { create } from "zustand";

interface Tab {
  key: string;
  title: string;
}

interface aboutEditor {
  tabs: Tab[];
  addTab: (newTab: Tab) => void;
  rightSpace: boolean;
  toggleRightSpace: () => void;
  terminal: boolean;
  toggleTerminal: () => void;
}

const editorStore = create<aboutEditor>((set) => ({
  tabs: [],
  addTab: (newTab) =>
    set((state) => {
      console.log(newTab.title);
      return { tabs: [...state.tabs, newTab] };
    }),
  rightSpace: false,
  toggleRightSpace: () => set((state) => ({ rightSpace: !state.rightSpace })),
  terminal: false,
  toggleTerminal: () => set((state) => ({ terminal: !state.terminal })),
}));

export default editorStore;
