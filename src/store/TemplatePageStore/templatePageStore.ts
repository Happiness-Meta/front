import { create } from "zustand";

interface aboutTemplatePage {
  choseReact: boolean;
  toggleChoseReact: () => void;
}

const templatePageStore = create<aboutTemplatePage>((set) => ({
  choseReact: false,
  toggleChoseReact: () => set((state) => ({ choseReact: !state.choseReact })),
}));

export default templatePageStore;
