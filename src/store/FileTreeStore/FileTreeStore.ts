import { LeafType } from "../../types/typesForFileTree";
import { create } from "zustand";

interface aboutFileTree {
  fileTree: LeafType[];
  parentId?: string;
  setParentId: (parentId: string | undefined) => void;
  getNodes: (T: LeafType[]) => void;
  addNode: (newNode: LeafType) => void;
  deleteNode: (tabToDelete: LeafType) => void;
}

const FileTreeStore = create<aboutFileTree>((set) => ({
  fileTree: [
    {
      id: "id2",
      name: "h2",
      type: "internal",
      filePath: "h2 ",
      parentId: "root",
      children: [
        {
          id: "id4",
          name: "hhoho.ts",
          type: "leaf",
          content: "//타입스크립트 기본 내용",
          filePath: "h2 > hhoho.ts",
          parentId: "id2",
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
  parentId: undefined,
  setParentId: (parentId) => set({ parentId: parentId }),
  getNodes: (nodes) =>
    set((state) => ({
      fileTree: [
        // ...state.fileTree,
        ...nodes,
      ],
    })),
  addNode: (newNode: LeafType) => {
    console.log("노드 추가 중:", newNode);
    if (newNode.type === "internal") {
      newNode.children = [];
    }
    if (newNode.parentId !== "root") {
      // console.log("no root way");

      console.log(newNode.id);
      set((state) => ({
        fileTree: state.fileTree.map((node) =>
          node.id === newNode.parentId
            ? {
                ...node,
                children: [...(node.children || []), newNode],
              }
            : node
        ),
      }));
    } else
      set((state) => ({
        fileTree: [...state.fileTree, newNode],
      }));
  },
  deleteNode: (tabToDelete) => {
    // const treeAfterDelete =
  },
}));

export default FileTreeStore;
