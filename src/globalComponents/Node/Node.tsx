import { NodeApi } from "react-arborist";
import styles from "./node.module.css";
import { CSSProperties, useRef } from "react";
import editorStore from "../../store/CodePageStore/editorStore";
import SetFileTreeIcon from "../SetFileTreeIcon";

interface NodeRendererProps {
  style: CSSProperties;
  node: NodeApi;
}

const Node: React.FC<NodeRendererProps> = ({ node, style }) => {
  const { addTab } = editorStore();
  const spanRef = useRef(null);

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
        <span
          ref={spanRef}
          // onKeyDown={(e) => {

          //   if (spanRef.current?.focus && e.key === "Enter") node.edit();
          // }}
          // onClick={() => node.edit()}
        >
          {node.data.name}
        </span>
      )}
    </div>
  );
};

export default Node;
