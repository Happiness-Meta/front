import styles from "./sidebar.module.css";
import sidebarStore from "../../../../store/CodePageStore/sidebarStore";
import EditorSettingBtn from "./editorSettingBtn/EditorSettingBtn";
import Tree, { TreeProps } from "rc-tree";
import "rc-tree/assets/index.css";
import editorStore from "../../../../store/CodePageStore/editorStore";

const treeData = [
  {
    key: "1",
    title: "folder 1",
    children: [
      { key: "1-1", title: "script.ts" },
      { key: "1-2", title: "script2.js" },
      {
        key: "3",
        title: "folder 3",
        children: [
          { key: "3-1", title: "index.html" },
          { key: "3-2", title: "style.css" },
        ],
      },
    ],
  },
  {
    key: "2",
    title: "folder 2",
    children: [
      { key: "2-1", title: "package.json" },
      { key: "2-2", title: "react.tsx" },
    ],
  },
];

function Sidebar() {
  const { expandStatus, expandToggle } = sidebarStore();
  const { sidebar } = sidebarStore();
  // const { tabs, addTab } = editorStore();
  const { toggleRightSpace, toggleTerminal } = editorStore();

  const switcherIcon: TreeProps["switcherIcon"] = (extension) => {
    let icon = extension.title!.toString().split(".").pop();
    const isDirectory = extension.data!.children;
    if (isDirectory) {
      icon = extension.expanded ? "openFolder" : "closedFolder";
    } else if (!extension.title!.toString().includes(".")) {
      icon = "draft";
    }
    let iconSvg = <img src={`/svg/${icon}.svg`} className={styles.fileIcon} />;
    if (icon === "openFolder" || icon === "closedFolder" || icon === "draft") {
      iconSvg = (
        <img src={`/svg/${icon}.svg`} className={styles.directoryIcon} />
      );
    }

    return iconSvg;
  };

  return (
    <div
      className={`${sidebar ? styles.sidebarToggle : undefined} ${
        styles.sidebarSpace
      }`}
    >
      <form className={styles.searchForm}>
        <input
          type="text"
          className={styles.search_input}
          placeholder="Search"
        ></input>
      </form>
      <div className={styles.sidebarSpace_inner}>
        <div className={styles.filesSpace}>
          <div className={styles.filesHeader}>
            <div className={styles.TitleSpace}>
              <div
                className={`material-symbols-outlined ${
                  expandStatus ? styles.expandStatusT : styles.expandStatusF
                }`}
                onClick={expandToggle}
              >
                {expandStatus ? "chevron_right" : "expand_more"}
              </div>
              <p className={styles.filesTitle}>Files</p>
            </div>
            <div className={styles.filesAddSpace}>
              <div className={`material-symbols-outlined ${styles.addFile}`}>
                note_add
              </div>
              <div className={`material-symbols-outlined ${styles.addFolder}`}>
                create_new_folder
              </div>
            </div>
          </div>
          <div
            className={`${expandStatus ? styles.FC_ExpandStatus : undefined} ${
              styles.fileContainer
            }`}
          >
            <Tree
              treeData={treeData}
              switcherIcon={switcherIcon}
              showIcon={false}
              selectable={true}
              draggable={true}
              allowDrop={() => true}
              expandAction={"click"}
            ></Tree>
          </div>
        </div>
        <div className={styles.sidebarBottom}>
          <EditorSettingBtn />
          <i className={`material-symbols-outlined`} onClick={toggleRightSpace}>
            chat
          </i>
          <i className={`material-symbols-outlined`} onClick={toggleTerminal}>
            terminal
          </i>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
