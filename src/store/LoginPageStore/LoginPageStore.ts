import { create } from "zustand";

interface aboutLogin {
  inUp: boolean;
  inUpToggle: () => void;
  isVisible: boolean;
  visibleToggle: () => void;
  signUpMessage: boolean;
  toggleSignUpMessage: () => void;
}

const LoginPageStore = create<aboutLogin>((set) => ({
  inUp: false,
  inUpToggle: () => set((state) => ({ inUp: !state.inUp })),
  isVisible: false,
  visibleToggle: () => set((state) => ({ isVisible: !state.isVisible })),
  signUpMessage: false,
  toggleSignUpMessage: () =>
    set((state) => ({ signUpMessage: !state.signUpMessage })),
}));

export default LoginPageStore;
