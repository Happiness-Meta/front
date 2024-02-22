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
  const { addTab, deleteTab, showContent } = editorStore();
  const { setSelectedNode, updateNodeName } = FileTreeStore();
  const { repoId } = useParams();

  const getDataMutation = useGetData();

  //필요한거 : 노드, 새로운 이름, 파일경로
  const handleCreateFileRequest = async (
    node: nodeType,
    newNodeName: string
  ) => {
    if (!newNodeName.includes(".")) {
      newNodeName = newNodeName + ".txt";
    }
    try {
      let sendFilePath;

      const parentPath = FileTreeStore.getState().findNodePath(node.parentId);

      if (parentPath === null) {
        sendFilePath = newNodeName;
      } else {
        sendFilePath = parentPath + "/" + newNodeName;
      }

      if (node.type === "leaf") {
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

    const parentPath = FileTreeStore.getState().findNodePath(node.parentId);

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

  // const handleSaveRequest = async (node: nodeType, newNodeName: string) => {
  //   const originalFilePath = removeLeadingSlash(node.key);
  //   let newFilePath;

  //   const parentPath = FileTreeStore.getState().findNodePath(node.parentId);

  //   if (parentPath === null) {
  //     newFilePath = newNodeName;
  //   } else {
  //     newFilePath = parentPath + "/" + newNodeName;
  //   }
  //   const sendNewFilePath = removeLeadingSlash(newFilePath);

  //   const body = {
  //     originFilepath: originalFilePath,
  //     newFilepath: sendNewFilePath,
  //     content: node.content,
  //   };
  //   try {
  //     const response = await userAxiosWithAuth.put(
  //       `/api/files/${repoId}`,
  //       body
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleCreateFile = async (newNodeName: string, type: string) => {
    if (type === "internal") {
      return;
    }
    const fileNode = {
      ...node.data,
      name: newNodeName,
    };

    await handleCreateFileRequest(fileNode as nodeType, newNodeName);

    if (node.data.name === "") {
      FileTreeStore.getState().deleteNode(node.data.id);
    }
    getDataMutation.mutate();
  };

  const checkValue = (value: string) => {
    if (value === "") {
      return false;
    } else if (value === "." || value === "..") {
      return false;
    }
    return true;
  };

  const nameAndRename = (id: string, type: string, value: string) => {
    if (checkValue(value)) {
      updateNodeName(id, value);
      handleCreateFile(value, type);
      showContent(node.data);
      node.submit(value);
    } else {
      node.reset();
      tree.delete(id);
    }
  };

  return (
    <div
      className={styles.node_container}
      style={style}
      onClick={() => {
        console.log(removeLeadingSlash(node.data.key));
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
          onBlur={() => {
            checkValue(node.data.name);
            tree.delete(node.data.id);
            node.reset();
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") node.reset();
            if (e.key === "Enter")
              nameAndRename(
                node.data.id,
                node.data.type,
                e.currentTarget.value
              );
          }}
          autoFocus
        />
      ) : (
        <div className={styles.nodeNameContainer}>
          <span
            onDoubleClick={() => node.edit()}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") node.edit();
            // }}
          >
            {node.data.name}
          </span>

          <div className={styles.nodeActionBtns}>
            <i
              className={`${styles.actionBtn} material-symbols-outlined`}
              onClick={(e) => {
                e.stopPropagation();
                node.edit();
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
