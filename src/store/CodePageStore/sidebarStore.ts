import { create } from "zustand";

interface aboutSidebar {
  sidebar: boolean;
  sidebarToggle: () => void;
  expandStatus: boolean;
  expandToggle: () => void;
  files: string[];
  settings: boolean;
  settingsToggle: () => void;
  codeFontSize: number;
  incCodeFontSize: () => void;
  decCodeFontSize: () => void;
}

const sidebarStore = create<aboutSidebar>((set) => ({
  sidebar: false,
  sidebarToggle: () => set((state) => ({ sidebar: !state.sidebar })),
  expandStatus: false,
  expandToggle: () => set((state) => ({ expandStatus: !state.expandStatus })),
  files: [],
  addFile: () => set((state) => ({ files: [...state.files] })),
  settings: false,
  settingsToggle: () => set((state) => ({ settings: !state.settings })),
  codeFontSize: 16,
  incCodeFontSize: () =>
    set((state) => ({ codeFontSize: Math.min(state.codeFontSize + 1, 24) })),
  decCodeFontSize: () =>
    set((state) => ({ codeFontSize: Math.max(state.codeFontSize - 1, 12) })),
}));

export default sidebarStore;
