import { nodeType } from "../../types/typesForFileTree";
import { create } from "zustand";
import { findAndAddNode, removeNodeById } from "../../utils/fileTreeUtils";

interface aboutFileTree {
  fileTree: nodeType[];
  parentId?: string;
  setParentId: (parentId: string | undefined) => void;
  getNodes: (T: nodeType[]) => void;
  addNode: (newNode: nodeType) => void;
  deleteNode: (tabToDeleteId: string) => void;
}

const FileTreeStore = create<aboutFileTree>((set) => ({
  fileTree: [],
  parentId: undefined,
  // isCreating: false,
  setParentId: (parentId) => set({ parentId: parentId }),
  getNodes: (nodes) =>
    set(() => ({
      fileTree: nodes,
    })),
  addNode: (newNode: nodeType) => {
    console.log("노드 추가 중:", newNode);
    if (newNode.type === "internal") {
      newNode.children = [];
    }
    set((state) => ({
      fileTree: newNode.parentId
        ? findAndAddNode(state.fileTree, newNode)
        : [...state.fileTree, newNode],
    }));
  },

  deleteNode: (tabToDeleteId) =>
    set((state) => ({
      fileTree: removeNodeById(state.fileTree, tabToDeleteId),
    })),
}));

export default FileTreeStore;
