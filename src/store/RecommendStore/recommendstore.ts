import { create } from "zustand";

export interface Repository {
  name: string;
  description: string;
  url: string;
  image: string;
}

//위에 인터페이스 이거 어떤 식으로 보내야 하는지 준수님한테 물어보기
//예를들어 repoPageStore처럼 보낸다든가

interface repoStoreState {
  repositories: { [key: string]: Repository };
  setRepositories: (newRepositories: { [key: string]: Repository }) => void;
}

const RecommendStore = create<repoStoreState>((set) => ({
  repositories: {
    repo1: {
      name: "Spring",
      description: "Let's make a project with EarthIDEN!",
      url: "repo1 url",
      image: "/svg/spring.svg",
    },
    repo2: {
      name: "To-do apps",
      description: "Let's make simple todo app",
      url: "repo2 url",
      image: "/svg/javascript.svg",
    },
    repo3: {
      name: "Next.js",
      description: "Let's make simple todo app",
      url: "repo3 url",
      image: "/svg/nextjs.svg",
    },
    repo4: {
      name: "Next.js",
      description: "Let's make simple todo app",
      url: "repo4 url",
      image: "/svg/nextjs.svg",
    },
  },
  setRepositories: (newRepositories) => set(() => ({ repositories: newRepositories })),
  editMode: null,
}));

export default RecommendStore;
