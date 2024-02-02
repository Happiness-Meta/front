import { create } from "zustand";

interface aboutLogin {
  inUp: boolean;
  inUpToggle: () => void;
  isVisible: boolean;
  visibleToggle: () => void;
}

const LoginPageStore = create<aboutLogin>((set) => ({
  inUp: false,
  inUpToggle: () => set((state) => ({ inUp: !state.inUp })),
  isVisible: false,
  visibleToggle: () => set((state) => ({ isVisible: !state.isVisible })),
}));

export default LoginPageStore;
