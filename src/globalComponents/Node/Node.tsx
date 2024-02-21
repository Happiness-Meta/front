import { NodeApi, TreeApi } from "react-arborist";
import styles from "./node.module.css";
import { CSSProperties, RefObject, useRef, useState } from "react";
import editorStore from "../../store/CodePageStore/editorStore";
import SetFileTreeIcon from "../SetFileTreeIcon";
import FileTreeStore from "../../store/FileTreeStore/FileTreeStore";
import { useMutation } from "@tanstack/react-query";
import userAxiosWithAuth from "../../utils/useAxiosWIthAuth";
import { useParams } from "react-router-dom";

interface NodeRendererProps {
  node: NodeApi;
  tree: TreeApi<() => void>;
  style: CSSProperties;
}

const Node: React.FC<NodeRendererProps> = ({ node, style }) => {
  const { addTab, deleteTab, showContent } = editorStore();
  const { setParentId, deleteNode } = FileTreeStore();
  const { repoId } = useParams();
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  // const postCreate = useMutation({
  //   mutationFn: async () => {
  //     const body = {};
  //     try {
  //       const response = await userAxiosWithAuth.post(
  //         `/api/files/${repoId}`,
  //         body
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       // console.log(error);
  //     }
  //   },
  // });

  // const deleteDelete = useMutation({
  //   mutationFn: async () => {
  //     const body = {
  //       repoId: repoId,
  //       filePath: node.data.filePath
  //     };
  //     try {
  //       const response = await userAxiosWithAuth.delete(
  //         `/api/files/${repoId}`,
  //         body
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       // console.log(error);
  //     }
  //   },
  // });

  return (
    <div
      className={styles.node_container}
      style={style}
      onClick={() => {
        console.log(node.data.parentId);
        node.isInternal && node.toggle();
        node.isInternal && setParentId(node.data.id);
        !node.isInternal && setParentId(node.data.parentId);
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
          type="text"
          className={styles.isEditInput}
          defaultValue={node.data.name}
          onFocus={(e) => e.currentTarget.select()}
          onBlur={() => node.reset()}
          onKeyDown={(e) => {
            if (e.key === "Escape") node.reset();
            if (e.key === "Enter") node.submit(e.currentTarget.value);
          }}
          autoFocus
        />
      ) : (
        <div className={styles.nodeNameContainer}>
          <span>{node.data.name}</span>
          {/* <input
            ref={inputRef}
            className={styles.input}
            onChange={(e) => e.currentTarget.value}
            defaultValue={node.data.name}
          ></input> */}
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
                deleteNode(node.data);
                deleteTab(node.data);
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
