import { create } from "zustand";

interface AboutModalStore {
  isModalOpen: boolean;
  toggleCreateModal: () => void;
  isRecommendModalOpen: boolean;
  toggleRecommendedModal: () => void;
}

const useModalStore = create<AboutModalStore>((set) => ({
  isModalOpen: false,
  toggleCreateModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  isRecommendModalOpen: false,
  toggleRecommendedModal: () =>
    set((state) => ({ isRecommendModalOpen: !state.isRecommendModalOpen })),
}));

export default useModalStore;
