import { create } from "zustand";

interface aboutHeader {
  mode: boolean;
  modeToggle: () => void;
}

const headerStore = create<aboutHeader>((set) => ({
  mode: false,
  modeToggle: () => set((state) => ({ mode: !state.mode })),
}));

export default headerStore;
