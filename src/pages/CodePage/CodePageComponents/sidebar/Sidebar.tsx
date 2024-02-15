import styles from "./sidebar.module.css";
import sidebarStore from "../../../../store/CodePageStore/sidebarStore";
import EditorSettingBtn from "./editorSettingBtn/EditorSettingBtn";
import editorStore from "../../../../store/CodePageStore/editorStore";
import { Tree } from "react-arborist";
import { useState } from "react";
import Node from "../../../../globalComponents/Node/Node";
//디렉토리 : 아이디, 경로, 이름, 칠드런 빈 배열
// 12b4p214, /, folder 1, []
//파일 : 아이디, 경로, 이름, 내용
// 1894u50u, folder 1 /, script.js, contents

const treeData = [
  {
    id: "1",
    name: "folder 1",
    children: [
      { id: "1-1", name: "script.ts" },
      { id: "1-2", name: "script2.js" },
      {
        id: "3",
        name: "folder 3",
        children: [
          { id: "3-1", name: "index.html" },
          { id: "3-2", name: "style.css" },
          {
            id: "4",
            name: "file4",
            children: [{ id: "5", name: "file5", children: [] }],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "folder 2",
    children: [
      { id: "2-1", name: "package.json" },
      { id: "2-2", name: "react.tsx" },
    ],
  },
];

function Sidebar() {
  const { sidebar, expandStatus, expandToggle } = sidebarStore();
  const { toggleRightSpace, toggleTerminal } = editorStore();

  const [term, setTerm] = useState("");

  return (
    <div
      className={`${sidebar ? styles.sidebarToggle : undefined} ${
        styles.sidebarSpace
      }`}
    >
      <div className={styles.searchForm}>
        <input
          type="text"
          className={styles.search_input}
          placeholder="Search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        ></input>
      </div>
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
              className={styles.react_arborist}
              rowClassName={styles.arborist_row}
              width={"100%"}
              indent={17}
              data={treeData}
              searchTerm={term}
              searchMatch={(node, term) =>
                node.data.name.toLowerCase().includes(term.toLowerCase())
              }
            >
              {Node}
            </Tree>
          </div>
        </div>
        <div className={styles.sidebarBottom}>
          <div className={styles.sidebarBottomInner}>
            <EditorSettingBtn />
            <i
              className={`${styles.bottomIcons} material-symbols-outlined`}
              onClick={toggleRightSpace}
            >
              forum
            </i>
            <i
              className={`${styles.bottomIcons} material-symbols-outlined`}
              onClick={toggleTerminal}
            >
              terminal
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
