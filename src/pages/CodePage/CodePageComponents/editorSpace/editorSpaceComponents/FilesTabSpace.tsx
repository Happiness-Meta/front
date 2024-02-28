import globalStore from "@/store/globalStore/globalStore";
import styles from "../editorSpace.module.css";
import FileTreeStore from "@/store/FileTreeStore/FileTreeStore";
import editorStore from "@/store/CodePageStore/editorStore";
import useFuncAboutFiles from "@/utils/useFuncAboutFiles";

const FilesTabSpace = () => {
  const { mode } = globalStore();
  const { setSelectedNode } = FileTreeStore();
  const { tabs, deleteTab, showContent, nodeContent } = editorStore();

  const SetFileTreeIcon = useFuncAboutFiles().SetFileTreeIcon;

  return (
    <div className={styles.filesTabSpace}>
      {tabs.map((tab) => {
        return (
          <div
            key={tab.id}
            className={styles.tab}
            style={{
              backgroundColor: mode ? "white" : "#1e1e1e",
              opacity: tab.id === nodeContent[0] ? "1" : undefined,
              borderTop:
                tab.id === nodeContent[0] ? "1px solid #068fff" : undefined,
            }}
          >
            <button
              className={styles.tabEach}
              onClick={() => {
                showContent(tab);
                setSelectedNode(tab);
              }}
            >
              {SetFileTreeIcon(tab.name)}
              <span className={styles.tabName}>{tab.name}</span>
            </button>
            <button
              className={`${styles.tabRemove} material-symbols-outlined`}
              onClick={() => deleteTab(tab)}
            >
              close
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FilesTabSpace;
