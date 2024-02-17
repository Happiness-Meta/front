import { create } from "zustand";

interface Tab {
  id: string;
  name: string;
}

interface aboutEditor {
  tabs: Tab[];
  addTab: (newTab: Tab) => void;
  deleteTab: (tabToDelete: Tab) => void;
  // selectTab: (tabToSelect: Tab) => void;
  rightSpace: boolean;
  toggleRightSpace: () => void;
  terminal: boolean;
  toggleTerminal: () => void;
}

const editorStore = create<aboutEditor>((set) => ({
  tabs: [],
  addTab: (newTab) =>
    set((state) => {
      const alreadyExists = state.tabs.some((tab) => tab.id === newTab.id);
      if (alreadyExists) {
        return { tabs: [...state.tabs] };
      }
      return { tabs: [...state.tabs, newTab] };
    }),
  deleteTab: (tabToDelete) =>
    set((state) => {
      const newTabSpace = state.tabs.filter((tab) => tab.id !== tabToDelete.id);
      return { tabs: newTabSpace };
    }),
  // selectTab: (tabToSelect) => set((state) => {}),
  rightSpace: false,
  toggleRightSpace: () => set((state) => ({ rightSpace: !state.rightSpace })),
  terminal: false,
  toggleTerminal: () => set((state) => ({ terminal: !state.terminal })),
}));

export default editorStore;
