import { create } from "zustand";

interface aboutHeader {
  mode: boolean;
  modeToggle: () => void;
  settings: boolean;
  settingsToggle: () => void;
  codeFontSize: number;
  incCodeFontSize: () => void;
  decCodeFontSize: () => void;
}

const headerStore = create<aboutHeader>((set) => ({
  mode: false,
  modeToggle: () => set((state) => ({ mode: !state.mode })),
  settings: false,
  settingsToggle: () => set((state) => ({ settings: !state.settings })),
  codeFontSize: 16,
  incCodeFontSize: () =>
    set((state) => ({ codeFontSize: Math.min(state.codeFontSize + 1, 24) })),
  decCodeFontSize: () =>
    set((state) => ({ codeFontSize: Math.max(state.codeFontSize - 1, 12) })),
}));

export default headerStore;
