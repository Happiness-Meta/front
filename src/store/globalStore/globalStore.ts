import { create } from "zustand";

interface aboutGlobalStore {
  mode: boolean;
  modeToggle: () => void;
  exploreBtn: boolean;
  exploreBtnToggle: () => void;
  accountBtn: boolean;
  accountBtnToggle: () => void;
  isSaved: boolean;
  setIsSaved: (T: boolean) => void;
}

const globalStore = create<aboutGlobalStore>((set) => ({
  mode: false,
  modeToggle: () => set((state) => ({ mode: !state.mode })),
  exploreBtn: false,
  exploreBtnToggle: () => set((state) => ({ exploreBtn: !state.exploreBtn })),
  accountBtn: false,
  accountBtnToggle: () => set((state) => ({ accountBtn: !state.accountBtn })),
  isSaved: false,
  setIsSaved: (boolean) => set({ isSaved: boolean }),
}));

export default globalStore;
