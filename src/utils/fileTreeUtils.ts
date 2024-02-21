import { nodeType } from "../types/typesForFileTree";

export const findAndAddNode = (
  nodes: nodeType[],
  newNode: nodeType
): nodeType[] => {
  return nodes.map((node) => {
    if (node.id === newNode.parentId) {
      return {
        ...node,
        children: [...(node.children || []), newNode],
      };
    } else {
      return {
        ...node,
        children: node.children
          ? findAndAddNode(node.children, newNode)
          : node.children,
      };
    }
  });
};

export const removeNodeById = (nodes: nodeType[], tabToDeleteId: string) => {
  return nodes.reduce((acc: nodeType[], node: nodeType) => {
    if (tabToDeleteId !== node.id) {
      const newNode = { ...node };
      if (node.children) {
        newNode.children = removeNodeById(node.children, tabToDeleteId);
      }
      acc.push(newNode);
    }
    return acc;
  }, []);
};
