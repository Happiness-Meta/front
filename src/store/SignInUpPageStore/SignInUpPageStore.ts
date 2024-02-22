import { create } from "zustand";

interface aboutLogin {
  inUp: boolean;
  inUpToggle: () => void;
  isVisible: boolean;
  visibleToggle: () => void;
  welcomeMessage: boolean;
  toggleWelcomeMessage: () => void;
}

const LoginPageStore = create<aboutLogin>((set) => ({
  inUp: false,
  inUpToggle: () => set((state) => ({ inUp: !state.inUp })),
  isVisible: false,
  visibleToggle: () => set((state) => ({ isVisible: !state.isVisible })),
  welcomeMessage: false,
  toggleWelcomeMessage: () =>
    set((state) => ({ welcomeMessage: !state.welcomeMessage })),
}));

export default LoginPageStore;
