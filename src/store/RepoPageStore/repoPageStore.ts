import { create } from "zustand";

export interface Repository {
  name: string;
  description: string;
  url: string;
  image: string;
  key: string;
}

interface repoStoreState {
  repositories: { [key: string]: Repository };
  editMode: string | null;
  setEditMode: (key: string | null) => void;
  setRepositories: (newRepositories: { [key: string]: Repository }) => void;
  show: boolean;
  toggleModal: () => void;
}

const RepoPageStore = create<repoStoreState>((set) => ({
  repositories: {
    repo1: {
      name: "repo1",
      description: "repo1 description",
      url: "repo1 url",
      image: "/svg/spring.svg",
      key: "repo1",
    },
    repo2: {
      name: "repo2",
      description: "repo2 description",
      url: "repo2 url",
      image: "/svg/React-icon.svg",
      key: "repo2",
    },
    repo3: {
      name: "repo3",
      description: "repo3 description",
      url: "repo3 url",
      image: "/svg/nextjs.svg",
      key: "repo3",
    },
    repo4: {
      name: "repo4",
      description: "repo4 description",
      url: "repo4 url",
      image: "/svg/nextjs.svg",
      key: "repo4",
    },
    repo5: {
      name: "repo5",
      description: "repo4 description",
      url: "repo4 url",
      image: "/svg/nextjs.svg",
      key: "repo5",
    },
    repo6: {
      name: "repo6",
      description: "repo4 description",
      url: "repo4 url",
      image: "/svg/nextjs.svg",
      key: "repo6",
    },
    repo7: {
      name: "repo7",
      description: "repo4 description",
      url: "repo4 url",
      image: "/svg/nextjs.svg",
      key: "repo7",
    },
    repo8: {
      name: "repo8",
      description: "repo4 description",
      url: "repo4 url",
      image: "/svg/nextjs.svg",
      key: "repo8",
    },
    repo9: {
      name: "repo9",
      description: "repo4 description",
      url: "repo4 url",
      image: "/svg/nextjs.svg",
      key: "repo9",
    },
  },
  editMode: null,
  setEditMode: (key: string | null) => set(() => ({ editMode: key })),
  setRepositories: (newRepositories) => set(() => ({ repositories: newRepositories })),
  show: false,
  toggleModal: () => set((state) => ({ show: !state.show })),
}));

export default RepoPageStore;
