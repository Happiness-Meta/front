import globalStore from "@/store/globalStore/globalStore";
import styles from "../editorSpace.module.css";
import editorStore from "@/store/CodePageStore/editorStore";

const FilePathSpace = () => {
  const { mode } = globalStore();
  const { tabs, filePath } = editorStore();
  return (
    <div
      className={styles.filePathSpace}
      style={
        mode ? { backgroundColor: "white" } : { backgroundColor: "#1e1e1e" }
      }
    >
      <span style={{ marginLeft: "10px", color: "#a9a9a9", fontSize: "13px" }}>
        {tabs.length === 0 ? null : filePath.slice(1)}
      </span>
    </div>
  );
};

export default FilePathSpace;
