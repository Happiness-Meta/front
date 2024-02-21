import { NodeApi, TreeApi } from "react-arborist";
import styles from "./node.module.css";
import { CSSProperties } from "react";
import editorStore from "../../store/CodePageStore/editorStore";
import SetFileTreeIcon from "../SetFileTreeIcon";
import FileTreeStore from "../../store/FileTreeStore/FileTreeStore";
// import { useMutation } from "@tanstack/react-query";
// import userAxiosWithAuth from "../../utils/useAxiosWIthAuth";
// import { useParams } from "react-router-dom";

interface NodeRendererProps {
  node: NodeApi;
  tree: TreeApi<() => void>;
  style: CSSProperties;
}

const Node: React.FC<NodeRendererProps> = ({ node, tree, style }) => {
  const { addTab, deleteTab, showContent } = editorStore();
  const { setParentId } = FileTreeStore();
  // const { repoId } = useParams();

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

  const checkValue = (value: string) => {
    if (value === "") {
      alert("한 글자 이상 입력해 주세요.");
      return false;
    } else if (value === "." || value === "..") {
      alert("올바르지 않은 이름입니다.");
      return false;
    }
    return true;
  };

  const nameAndRename = (id: string, value: string) => {
    if (checkValue(value)) {
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
            if (e.key === "Enter")
              nameAndRename(node.data.id, e.currentTarget.value);
          }}
          autoFocus
        />
      ) : (
        <div className={styles.nodeNameContainer}>
          <span>{node.data.name}</span>

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
