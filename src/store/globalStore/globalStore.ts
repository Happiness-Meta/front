import { create } from "zustand";

interface aboutGlobalStore {
  mode: boolean;
  modeToggle: () => void;
  exploreBtn: boolean;
  exploreBtnToggle: () => void;
}

const globalStore = create<aboutGlobalStore>((set) => ({
  mode: false,
  modeToggle: () => set((state) => ({ mode: !state.mode })),
  exploreBtn: false,
  exploreBtnToggle: () => set((state) => ({ exploreBtn: !state.exploreBtn })),
}));

export default globalStore;
