import { create } from "zustand";

interface AboutModalStore {
  isModalOpen: boolean;
  toggleCreateModal: () => void;
}

const useModalStore = create<AboutModalStore>((set) => ({
  isModalOpen: false,
  toggleCreateModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));

export default useModalStore;
