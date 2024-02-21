import { nodeType } from "../../types/typesForFileTree";
import { create } from "zustand";

interface aboutFileTree {
  fileTree: nodeType[];
  // fileTree: backDataType[];
  parentId?: string;
  setParentId: (parentId: string | undefined) => void;
  getNodes: (T: nodeType[]) => void;
  // getNodes: (T: backDataType[]) => void;
  addNode: (newNode: nodeType) => void;
  // addNode: (newNode: backDataType) => void;
  deleteNode: (tabToDelete: nodeType) => void;
  // deleteNode: (tabToDelete: backDataType) => void;
}

const FileTreeStore = create<aboutFileTree>((set) => ({
  fileTree: [
    {
      id: "a",
      parentId: "root",
      name: "directory",
      type: "internal",
      // key: "/",
      // uuid: "",
      children: [
        {
          id: "b",
          parentId: "a",
          name: "script.js",
          type: "leaf",
          content: "//hello",
          filePath: "/directory/script.js",
          // uuid: "",
        },
        {
          id: "c",
          parentId: "a",
          name: "style.css",
          type: "leaf",
          content: "/* css */",
          filePath: "/directory/style.css",
          // uuid: "",
        },
      ],
    },
    {
      id: "d",
      parentId: "root",
      name: "package.json",
      type: "leaf",
      content: "",
      filePath: "/package.json",
      // uuid: "",
    },
    {
      id: "e",
      parentId: "root",
      name: "README.md",
      type: "leaf",
      content: "# This is the title",
      filePath: "/README.md",
      // uuid: "",
    },
  ],
  parentId: undefined,
  setParentId: (parentId) => set({ parentId: parentId }),
  getNodes: (nodes) =>
    set((state) => ({
      fileTree: state.fileTree ? [...state.fileTree, ...nodes] : nodes,
    })),
  addNode: (newNode: nodeType) => {
    console.log("노드 추가 중:", newNode);
    if (newNode.type === "directory") {
      newNode.children = [];
    }
    const findAndAddNode = (nodes: nodeType[]): nodeType[] => {
      const updatedNodes = nodes.map((node) => {
        if (node.id === newNode.parentId) {
          return {
            ...node,
            children: [...(node.children || []), newNode],
          };
        } else if (node.children) {
          return {
            ...node,
            children: findAndAddNode(node.children),
          };
        }
        return node;
      });

      return updatedNodes;
    };

    set((state) => ({
      fileTree: findAndAddNode(state.fileTree),
    }));
  },

  deleteNode: (tabToDelete) =>
    set((state) => {
      const treeAfterDelete = state.fileTree.filter(
        (node) => node.id !== tabToDelete.id
      );
      if (treeAfterDelete === state.fileTree) {
        const childrenFiltered = state.fileTree.map((node) => {
          if (node.children) {
            node.children.filter((node) => node.id !== tabToDelete.id);
          }
        });
        console.log(childrenFiltered);
      }
      return { fileTree: treeAfterDelete };
    }),
}));

export default FileTreeStore;
