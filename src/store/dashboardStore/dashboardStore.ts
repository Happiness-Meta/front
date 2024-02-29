import { create } from "zustand";

interface aboutDashboardStore {
  isAnimated: boolean;
  setIsAnimated: (isAnimated: boolean) => void;
}

const useDashBoardStore = create<aboutDashboardStore>((set) => ({
  isAnimated: false,
  setIsAnimated: (isAnimated) => set({ isAnimated }),
}));

export default useDashBoardStore;
