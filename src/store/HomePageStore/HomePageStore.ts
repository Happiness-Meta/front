import { create } from "zustand";

interface aboutHomePageStore {
  isLaunched: boolean;
  setIsLaunched: (T: boolean) => void;
}

const HomePageStore = create<aboutHomePageStore>((set) => ({
  isLaunched: false,
  setIsLaunched: (boolean) => {
    set({ isLaunched: boolean });
    setTimeout(() => {
      set({ isLaunched: false });
    }, 2500);
  },
}));

export default HomePageStore;
