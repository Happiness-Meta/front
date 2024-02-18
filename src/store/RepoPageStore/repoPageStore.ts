import { create } from "zustand";

export interface Repository {
  name: string;
  createdAt: string;
  id: string;
  modifiedAt: string;
  url: string;
  image: string;
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
  repositories: {},
  editMode: null,
  setEditMode: (key: string | null) => set(() => ({ editMode: key })),
  setRepositories: (newRepositories) => set(() => ({ repositories: newRepositories })),
  show: false,
  toggleModal: () => set((state) => ({ show: !state.show })),
}));

export default RepoPageStore;
