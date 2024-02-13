import { create } from "zustand";

interface aboutSignIn {
  signInErrorMessage: string;
  signInErrorMessageStatus: (message: string) => void;
  signInErrorMessageAni: boolean;
  signInErrorMessageAniToggle: () => void;
}

const SignInStore = create<aboutSignIn>((set) => ({
  signInErrorMessage: "",
  signInErrorMessageStatus: (message: string) =>
    set(() => ({ signInErrorMessage: message })),
  signInErrorMessageAni: false,
  signInErrorMessageAniToggle: () =>
    set((state) => ({ signInErrorMessageAni: !state.signInErrorMessageAni })),
}));

export default SignInStore;
