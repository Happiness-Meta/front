import { nodeType } from "@/types/TypesForFileTree";
import { create } from "zustand";
import {
  findAndAddNode,
  nameAndRenameChildren,
  removeNodeById,
  setFilePath,
} from "@/utils/fileTreeUtils";

interface aboutFileTree {
  fileTree: nodeType[];
  selectedNode?: nodeType;
  nameOrRename: boolean;
  setNameOrRename: (T: boolean) => void;
  setSelectedNode: (selectedNode: nodeType) => void;
  getNodes: (T: nodeType[]) => void;
  addNode: (newNode: nodeType) => void;
  updateNodeName: (id: string, value: string) => void;
  deleteNode: (tabToDeleteId: string) => void;
  findNodePath: (nodeId: string) => string | null | number;
}

const FileTreeStore = create<aboutFileTree>((set) => ({
  fileTree: [],
  selectedNode: undefined,
  nameOrRename: true,

  setNameOrRename: (value) => set({ nameOrRename: value }),
  setSelectedNode: (selectedNode) => set({ selectedNode: selectedNode }),
  getNodes: (nodes) =>
    set(() => ({
      fileTree: nodes,
    })),
  addNode: (newNode: nodeType) => {
    if (newNode.type === "internal") {
      newNode.children = [];
    }
    set((state) => ({
      fileTree: newNode.parentId
        ? findAndAddNode(state.fileTree, newNode)
        : [...state.fileTree, newNode],
    }));
  },
  updateNodeName: (id: string, value: string) =>
    set((state) => ({
      fileTree: nameAndRenameChildren(state.fileTree, id, value),
    })),
  deleteNode: (tabToDeleteId) =>
    set((state) => ({
      fileTree: removeNodeById(state.fileTree, tabToDeleteId),
    })),
  findNodePath: (nodeId) => {
    const state: aboutFileTree = FileTreeStore.getState();
    return setFilePath(state.fileTree, nodeId);
  },
}));

export default FileTreeStore;
