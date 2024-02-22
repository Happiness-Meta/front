import { create } from "zustand";

interface aboutSignUp {
  signUpErrorMessage: string;
  signUpErrorMessageStatus: (message: string) => void;
  signUpErrorMessageAni: boolean;
  signUpErrorMessageAniToggle: () => void;
}

const SignUpStore = create<aboutSignUp>((set) => ({
  signUpErrorMessage: "",
  signUpErrorMessageStatus: (message: string) =>
    set(() => ({ signUpErrorMessage: message })),
  signUpErrorMessageAni: false,
  signUpErrorMessageAniToggle: () =>
    set((state) => ({ signUpErrorMessageAni: !state.signUpErrorMessageAni })),
}));

export default SignUpStore;
