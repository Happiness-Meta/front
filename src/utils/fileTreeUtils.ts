import { nodeType } from "@/types/TypesForFileTree";

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

export const nameAndRenameChildren = (
  nodes: nodeType[],
  id: string,
  value: string
): nodeType[] => {
  return nodes.map((node) => {
    if (node.id === id) {
      // 해당 노드일 경우 이름 업데이트
      return { ...node, name: value };
    }

    if (node.children) {
      // 자식 노드가 있다면 재귀적으로 nameAndRenameChildren 호출
      return {
        ...node,
        children: nameAndRenameChildren(node.children, id, value),
      };
    }

    // 자식 노드가 없는 경우 현재 노드 그대로 반환
    return node;
  });
};

export const setFilePath = (
  nodes: nodeType[],
  nodeId: string,
  path = ""
): string | null | number => {
  for (const node of nodes) {
    const currentPath = path === "" ? "/" + node.name : path + "/" + node.name;

    if (node.id === nodeId) {
      return currentPath;
    }

    if (node.children) {
      const foundPath: string | null | number = setFilePath(
        node.children,
        nodeId,
        currentPath
      );
      if (foundPath) return foundPath;
    }
  }
  return null;
};

export function removeLeadingSlash(input: string): string {
  let result = "";
  let foundNonSlash = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === "/" && !foundNonSlash) {
      continue;
    }
    foundNonSlash = true;
    result += char;
  }

  return result;
}
