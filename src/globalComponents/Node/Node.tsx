import { NodeApi } from "react-arborist";
import styles from "./node.module.css";
import { CSSProperties } from "react";
import editorStore from "../../store/CodePageStore/editorStore";
import SetFileTreeIcon from "../../pages/CodePage/CodePageComponents/sidebar/SetFileTreeIcon";

interface NodeRendererProps {
  style: CSSProperties;
  node: NodeApi;
}

const Node: React.FC<NodeRendererProps> = ({ node, style }) => {
  const { addTab } = editorStore();

  return (
    <div
      className={styles.node_container}
      style={style}
      onClick={() => {
        node.isInternal && node.toggle();
        !node.isInternal && addTab(node.data);
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
                src="svg/openFolder.svg"
                alt="of"
              />
            </>
          ) : (
            <>
              <span className={`material-symbols-outlined`}>chevron_right</span>
              <img
                className={styles.directoryIcon}
                src="svg/closedFolder.svg"
                alt="cf"
              />
            </>
          )}
        </>
      )}
      <span>{node.data.name}</span>
    </div>
  );
};

export default Node;
