import { create } from "zustand";

export interface Repository {
  name: string;
  createdAt: string;
  id: string;
  modifiedAt: string;
  url?: string;
  image?: string;
  creatorNickname: {
    creator: string;
  };
  programmingLanguage: string;
}
// interface Repositories {
//   [key: string]: Repository;
// }
interface repoStoreState {
  repositories: { [key: string]: Repository };
  myRepositories: Repository[]; // 여기에 myRepositories 상태 추가
  allRepositories: Repository[];
  sharedRepositories: Repository[];
  editMode: string | null;
  setEditMode: (key: string | null) => void;
  setRepositories: (newRepositories: { [key: string]: Repository }) => void;
  show: boolean;
  toggleModal: () => void;
  setMyRepositories: (repos: Repository[]) => void; // myRepositories를 설정하는 액션 추가
  // setAllRepositories: (repos: Repository[]) => void;
  setSharedRepositories: (repos: Repository[]) => void;
  deleteRepository: (repoId: string) => void;
  updateRepositoryName: (repoId: string, newName: string) => void;
}

const RepoPageStore = create<repoStoreState>((set) => ({
  repositories: {},
  myRepositories: [],
  allRepositories: [],
  sharedRepositories: [],
  editMode: null,
  setEditMode: (key: string | null) => set(() => ({ editMode: key })),
  setRepositories: (newRepositories) => set(() => ({ repositories: newRepositories })),
  show: false,
  toggleModal: () => set((state) => ({ show: !state.show })),
  setMyRepositories: (myRepos) => set(() => ({ myRepositories: myRepos })),
  // setAllRepositories: (repos) => set(() => ({ allRepositories: repos })),
  setSharedRepositories: (repos) => set(() => ({ sharedRepositories: repos })),
  deleteRepository: (repoId: string) =>
    set((state) => {
      const newState = { ...state.repositories };
      delete newState[repoId];
      return {
        ...state,
        repositories: newState,
        myRepositories: state.myRepositories.filter((repo) => repo.id !== repoId),
        sharedRepositories: state.sharedRepositories.filter((repo) => repo.id !== repoId),
      };
    }),
  updateRepositoryName: (repoId: string, newName: string) => {
    set((state) => ({
      ...state,
      myRepositories: state.myRepositories.map((repo) =>
        repo.id === repoId ? { ...repo, name: newName } : repo
      ),
      sharedRepositories: state.sharedRepositories.map((repo) =>
        repo.id === repoId ? { ...repo, name: newName } : repo
      ),
    }));
  },
}));

export default RepoPageStore;
