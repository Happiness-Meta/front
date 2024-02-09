import { create } from "zustand";
export interface UserInfo {
  email: string;
  name: string;
  userImg: string;
}

// Zustand 스토어 상태 인터페이스 정의
interface UserInfoState {
  userInfo: UserInfo; // userInfo 객체를 저장하는 상태
  setUserInfo: (userInfo: UserInfo) => void; // userInfo 상태를 업데이트하는 함수
}

// Zustand 스토어 생성
const userStore = create<UserInfoState>((set) => ({
  userInfo: {
    email: "",
    name: "",
    userImg: "",
  },
  // userInfo 상태를 업데이트하는 함수 구현
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
}));

export default userStore;
