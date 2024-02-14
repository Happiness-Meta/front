import { create } from "zustand";

export interface Repository {
  name: string;
  description: string;
  image: string;
  key: string;
}

interface repoStoreState {
  template: { [key: string]: Repository };
}

const templateDescriptionStore = create<repoStoreState>((set) => ({
  template: {
    repo1: {
      name: "Java",
      description: "Java는 강력한 타입 체크를 제공하는 객체 지향 프로그래밍 언어입니다.",
      image: "/svg/spring.svg",
      key: "Java",
    },
    repo2: {
      name: "Python",
      description: "Python은 읽기 쉽고 배우기 쉬운 다목적 프로그래밍 언어입니다.",
      image: "/svg/python.svg",
      key: "Python",
    },
    repo3: {
      name: "JavaScript",
      description: "JavaScript는 웹 페이지를 동적으로 만들기 위해 사용되는 스크립팅 언어입니다.",
      image: "/svg/javascript.svg",
      key: "JavaScript",
    },
  },
}));

export default templateDescriptionStore;
