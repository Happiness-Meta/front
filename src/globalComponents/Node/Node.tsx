import { NodeApi, TreeApi } from "react-arborist";
import styles from "./node.module.css";
import { CSSProperties } from "react";
import editorStore from "../../store/CodePageStore/editorStore";
import SetFileTreeIcon from "../SetFileTreeIcon";
import FileTreeStore from "../../store/FileTreeStore/FileTreeStore";
import { useParams } from "react-router-dom";
import userAxiosWithAuth from "../../utils/useAxiosWIthAuth";
import { nodeType } from "../../types/typesForFileTree";
import useGetData from "../../utils/useGetData";
import { removeLeadingSlash } from "../../utils/fileTreeUtils";

interface NodeRendererProps {
  node: NodeApi;
  tree: TreeApi<() => void>;
  style: CSSProperties;
}

const Node: React.FC<NodeRendererProps> = ({ node, tree, style }) => {
  const { addTab, deleteTab, showContent, updateTabName } = editorStore();
  const { setSelectedNode, updateNodeName, findNodePath } = FileTreeStore();
  const { repoId } = useParams();
  const { nameOrRename, setNameOrRename } = FileTreeStore();

  const getDataMutation = useGetData();

  const handleCreateFileRequest = async (
    newNode: nodeType,
    newNodeName: string
  ) => {
    if (!newNodeName.includes(".")) {
      newNodeName = newNodeName + ".txt";
    }
    try {
      let sendFilePath;

      const parentPath = findNodePath(newNode.parentId!);

      if (parentPath === null) {
        sendFilePath = newNodeName;
      } else {
        sendFilePath = parentPath + "/" + newNodeName;
      }

      if (newNode.type === "leaf") {
        const body = {
          filepath: sendFilePath,
        };
        const response = await userAxiosWithAuth.post(
          `/api/files/${repoId}`,
          body
        );
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
    return handleCreateFileRequest;
  };

  const handleDeleteFileRequest = async (node: nodeType) => {
    let sendFilePath;

    const parentPath = FileTreeStore.getState().findNodePath(node.parentId!);

    if (parentPath === null) {
      sendFilePath = node.name;
    } else {
      sendFilePath = parentPath + "/" + node.name;
    }
    try {
      const response = await userAxiosWithAuth.delete(
        `/api/files/${repoId}?filePath=${sendFilePath}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRenameFile = async (nodeData: nodeType, newName: string) => {
    let originalFilePath;
    let sendNewFilePath;

    if (!newName.includes(".")) {
      newName = newName + ".txt";
    }

    const parentPath = FileTreeStore.getState().findNodePath(
      nodeData!.parentId!
    );
    let newFilePath;
    if (parentPath === null) {
      newFilePath = newName;
      originalFilePath = removeLeadingSlash(nodeData!.key);
      sendNewFilePath = removeLeadingSlash(newFilePath);
    } else {
      newFilePath = parentPath + "/" + newName;
      originalFilePath = "/" + removeLeadingSlash(nodeData!.key);
      sendNewFilePath = "/" + removeLeadingSlash(newFilePath);
    }

    const body = {
      content: nodeData!.content,
      newFilepath: sendNewFilePath,
      originFilepath: originalFilePath,
    };

    try {
      console.log(body);
      const response = await userAxiosWithAuth.put(
        `/api/files/${repoId}`,
        body
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateFile = async (newNodeName: string, type: string) => {
    if (type === "internal") {
      return;
    } else if (node.data.name === "") {
      node.reset();
    }

    const fileNode = {
      ...node.data,
      name: newNodeName,
    };

    await handleCreateFileRequest(fileNode as nodeType, newNodeName);

    getDataMutation.mutate();
  };

  const checkValue = (value: string) => {
    if (value === "" || value === "." || value === "..") {
      return false;
    }
    return true;
  };

  const name = (id: string, type: string, name: string) => {
    if (checkValue(name)) {
      updateNodeName(id, name);
      handleCreateFile(name, type);
      showContent(node.data);
      node.submit(name);
    } else {
      node.reset();
    }
  };

  const rename = (nodeData: nodeType, newName: string) => {
    if (checkValue(nodeData.name)) {
      console.log(nodeData.name, newName);
      updateNodeName(node.id, newName);
      handleRenameFile(nodeData, newName);
      updateTabName(nodeData, newName);
      showContent(nodeData);
      node.submit(nodeData.name);
    } else {
      node.reset();
    }
  };

  return (
    <div
      className={styles.node_container}
      style={style}
      onClick={() => {
        node.isInternal && node.toggle();
        !node.isInternal && setSelectedNode(node.data);
        !node.isInternal && addTab(node.data);
        !node.isInternal && showContent(node.data);
      }}
    >
      {node.isLeaf ? (
        <figure className={styles.iconContainer}>
          {SetFileTreeIcon(node.data.name)}
        </figure>
      ) : (
        <>
          {node.isOpen ? (
            <>
              <img
                className={styles.directoryIcon}
                src="/svg/openFolder.svg"
                alt="of"
              />
            </>
          ) : (
            <>
              <img
                className={styles.directoryIcon}
                src="/svg/closedFolder.svg"
                alt="cf"
              />
            </>
          )}
        </>
      )}
      {node.isEditing ? (
        <input
          required
          type="text"
          className={styles.isEditInput}
          defaultValue={node.data.name}
          onFocus={(e) => e.currentTarget.select()}
          onBlur={(e) => {
            checkValue(node.data.name);
            node.reset();
            if (e.currentTarget.value === "") {
              tree.delete(node.id);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") node.reset();
            if (e.key === "Enter") {
              if (nameOrRename) {
                name(node.data.id, node.data.type, e.currentTarget.value);
                return;
              } else {
                rename(node.data, e.currentTarget.value);
              }
            }
          }}
          autoFocus
        />
      ) : (
        <div className={styles.nodeNameContainer}>
          <span
            className={styles.nodeName}
            onDoubleClick={() => {
              node.edit();
              setNameOrRename(false);
            }}
          >
            {node.data.name}
          </span>

          <div className={styles.nodeActionBtns}>
            <i
              className={`${styles.actionBtn} material-symbols-outlined`}
              onClick={(e) => {
                e.stopPropagation();
                node.edit();
                setNameOrRename(false);
              }}
            >
              edit
            </i>
            <i
              className={`${styles.actionBtn} material-symbols-outlined`}
              onClick={(e) => {
                e.stopPropagation();
                tree.delete(node.data.id);
                deleteTab(node.data);
                handleDeleteFileRequest(node.data);
              }}
            >
              delete
            </i>
          </div>
        </div>
      )}
    </div>
  );
};

export default Node;
