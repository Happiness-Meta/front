import { NodeApi, TreeApi } from "react-arborist";
import styles from "./node.module.css";
import { CSSProperties } from "react";
import editorStore from "../../store/CodePageStore/editorStore";
import SetFileTreeIcon from "../SetFileTreeIcon";

interface NodeRendererProps {
  node: NodeApi;
  tree: TreeApi<() => void>;
  style: CSSProperties;
}

const Node: React.FC<NodeRendererProps> = ({ node, tree, style }) => {
  const { addTab, showContent } = editorStore();

  return (
    <div
      className={styles.node_container}
      style={style}
      onClick={() => {
        node.isInternal && node.toggle();
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
              <span className={`material-symbols-outlined`}>expand_more</span>
              <img
                className={styles.directoryIcon}
                src="/svg/openFolder.svg"
                alt="of"
              />
            </>
          ) : (
            <>
              <span className={`material-symbols-outlined`}>chevron_right</span>
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
          <div className={styles.nodeActionBtns}>
            <i
              className={`${styles.actionBtn} material-symbols-outlined`}
              onClick={() => node.edit()}
            >
              edit
            </i>
            <i
              className={`${styles.actionBtn} material-symbols-outlined`}
              onClick={() => tree.delete(node.id)}
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
