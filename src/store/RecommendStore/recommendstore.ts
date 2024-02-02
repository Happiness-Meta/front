import { create } from "zustand";

export interface Repository {
  name: string;
  description: string;
  url: string;
  image: string;
}

interface repoStoreState {
  repositories: { [key: string]: Repository };
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
      description: "repo2 description",
      url: "repo2 url",
      image: "/svg/React-icon.svg",
    },
    repo3: {
      name: "Next.js",
      description: "repo3 description",
      url: "repo3 url",
      image: "/svg/nextjs.svg",
    },
    repo4: {
      name: "Next.js",
      description: "repo4 description",
      url: "repo4 url",
      image: "/svg/nextjs.svg",
    },
  },
  editMode: null,
}));

export default RecommendStore;
