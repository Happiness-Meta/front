import { LeafType } from "../../types/typesForFileTree";
import { create } from "zustand";

interface aboutFileTree {
  fileTree: LeafType[];
  getNodes: (T: LeafType[]) => void;
  addNode: (T: LeafType) => void;
}

const FileTreeStore = create<aboutFileTree>((set) => ({
  fileTree: [
    {
      id: "id",
      name: "hi.js",
      type: "leaf",
      content: "//hisContent",
      parentId: "/",
    },
  ],
  getNodes: (nodes) => set((state) => ({ ...state, nodes })),
  addNode: (newNode) =>
    set((state) => {
      return [...state.fileTree, newNode];
    }),
}));

export default FileTreeStore;
