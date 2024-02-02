import { create } from "zustand";

export interface Repository {
  name: string;
  description: string;
  url: string;
  image: string;
}

interface repoStoreState {
  repositories: { [key: string]: Repository };
  editMode: string | null;
  setEditMode: (key: string | null) => void;
  setRepositories: (newRepositories: { [key: string]: Repository }) => void;
}

const RepoPageStore = create<repoStoreState>((set) => ({
  repositories: {
    repo1: {
      name: "repo1",
      description: "repo1 description",
      url: "repo1 url",
      image: "/svg/spring.svg",
    },
    repo2: {
      name: "repo2",
      description: "repo2 description",
      url: "repo2 url",
      image: "/svg/React-icon.svg",
    },
    repo3: {
      name: "repo3",
      description: "repo3 description",
      url: "repo3 url",
      image: "/svg/nextjs.svg",
    },
    repo4: {
      name: "repo4",
      description: "repo4 description",
      url: "repo4 url",
      image: "/svg/nextjs.svg",
    },
  },
  editMode: null,
  setEditMode: (key) => set(() => ({ editMode: key })),
  setRepositories: (newRepositories) => set(() => ({ repositories: newRepositories })),
}));

export default RepoPageStore;
