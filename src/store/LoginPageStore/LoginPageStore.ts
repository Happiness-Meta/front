import { create } from "zustand";

interface aboutLogin {
  inUp: boolean;
  inUpToggle: () => void;
}

const LoginPageStore = create<aboutLogin>((set) => ({
  inUp: false,
  inUpToggle: () => set((state) => ({ inUp: !state.inUp })),
}));

export default LoginPageStore;
