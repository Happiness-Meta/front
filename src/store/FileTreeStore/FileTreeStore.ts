import { LeafType } from "../../types/typesForFileTree";
import { create } from "zustand";

interface aboutFileTree {
  fileTree: LeafType[];
  getNodes: (T: LeafType[]) => void;
  addNode: (newNode: LeafType, parentId?: string) => void;
}

const FileTreeStore = create<aboutFileTree>((set) => ({
  fileTree: [
    {
      id: "id2",
      name: "h2",
      type: "internal",
      content: "//hisContent",
      filePath: "h2 ",
      parentId: "root",
      children: [
        {
          id: "id4",
          name: "hhoho.ts",
          type: "leaf",
          content: "//타입스크립트 기본 내용",
          filePath: "h2 > hhoho.ts",
          parentId: "root",
        },
      ],
    },
    {
      id: "id",
      name: "hi.js",
      type: "leaf",
      content: "//자바스크립트 기본 내용",
      filePath: "ht.js ",
      parentId: "root",
    },
    {
      id: "id3",
      name: "hehe.html",
      type: "leaf",
      content: "//HTML 기본 내용",
      filePath: "hehe.html ",
      parentId: "root",
    },
  ],
  getNodes: (nodes) => set((state) => ({ ...state, nodes })),
  addNode: (newNode) =>
    set((state) => {
      [...state.fileTree, newNode];
    }),
}));

export default FileTreeStore;
