import { create } from "zustand";

interface aboutLogin {
  inUp: boolean;
  inUpToggle: () => void;
  isVisible: boolean;
  visibleToggle: () => void;
  signUpMessage: boolean;
  toggleSignUpMessage: () => void;
  signInErrorMessage: string;
  signInErrorMessageStatus: (message: string) => void;
  signInErrorMessageAni: boolean;
  signInErrorMessageAniToggle: () => void;
  signUpErrorMessage: string;
  signUpErrorMessageStatus: (message: string) => void;
  signUpErrorMessageAni: boolean;
  signUpErrorMessageAniToggle: () => void;
}

const LoginPageStore = create<aboutLogin>((set) => ({
  inUp: false,
  inUpToggle: () => set((state) => ({ inUp: !state.inUp })),
  isVisible: false,
  visibleToggle: () => set((state) => ({ isVisible: !state.isVisible })),
  signUpMessage: false,
  toggleSignUpMessage: () =>
    set((state) => ({ signUpMessage: !state.signUpMessage })),
  //로그인
  signInErrorMessage: "",
  signInErrorMessageStatus: (message: string) =>
    set(() => ({ signInErrorMessage: message })),
  signInErrorMessageAni: false,
  signInErrorMessageAniToggle: () =>
    set((state) => ({ signInErrorMessageAni: !state.signInErrorMessageAni })),
  //회원가입
  signUpErrorMessage: "",
  signUpErrorMessageStatus: (message: string) =>
    set(() => ({ signUpErrorMessage: message })),
  signUpErrorMessageAni: false,
  signUpErrorMessageAniToggle: () =>
    set((state) => ({ signUpErrorMessageAni: !state.signUpErrorMessageAni })),
}));

export default LoginPageStore;
