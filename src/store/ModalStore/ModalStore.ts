import { create } from "zustand";

interface AboutModalStore {
  isModalOpen: boolean;
  toggleCreateModal: () => void;
  isRecommendModalOpen: boolean;
  toggleRecommendedModal: () => void;
  isEditModalOpen: boolean;
  toggleEditModal: () => void;
}

const useModalStore = create<AboutModalStore>((set) => ({
  isModalOpen: false,
  toggleCreateModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  isRecommendModalOpen: false,
  toggleRecommendedModal: () =>
    set((state) => ({ isRecommendModalOpen: !state.isRecommendModalOpen })),
  isEditModalOpen: false,
  toggleEditModal: () => set((state) => ({ isEditModalOpen: !state.isEditModalOpen })),
}));

export default useModalStore;
