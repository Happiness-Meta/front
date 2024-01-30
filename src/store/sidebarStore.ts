import { create } from "zustand";

interface aboutSidebar {
  sidebar: boolean;
  sidebarToggle: () => void;
  expandStatus: boolean;
  expandToggle: () => void;
  files: string[];
}

const sidebarStore = create<aboutSidebar>((set) => ({
  sidebar: false,
  sidebarToggle: () => set((state) => ({ sidebar: !state.sidebar })),
  expandStatus: false,
  expandToggle: () => set((state) => ({ expandStatus: !state.expandStatus })),
  files: [],
  addFile: () => set((state) => ({ files: [...state.files] })),
}));

export default sidebarStore;
