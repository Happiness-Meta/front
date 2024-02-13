import { create } from "zustand";
export interface UserInfo {
  email: string;
  name: string;
  userImg: string;
}

interface UserInfoState {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const userStore = create<UserInfoState>((set) => ({
  userInfo: {
    email: "",
    name: "",
    userImg: "",
  },
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
}));

export default userStore;
