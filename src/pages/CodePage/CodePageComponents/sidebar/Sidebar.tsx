import styles from "./sidebar.module.css";
import sidebarStore from "../../../../store/CodePageStore/sidebarStore";
import EditorSettingBtn from "./editorSettingBtn/EditorSettingBtn";
import editorStore from "../../../../store/CodePageStore/editorStore";
import { CreateHandler, Tree, TreeApi } from "react-arborist";
import { useRef, useState } from "react";
import Node from "../../../../globalComponents/node/Node";
import { v4 as uuidv4 } from "uuid";

let treeData = [
  {
    id: uuidv4(),
    name: "node_modules",
    children: [{ id: uuidv4(), name: "bunch_of_files" }],
  },
  {
    id: uuidv4(),
    name: "public",
    children: [{ id: uuidv4(), name: "react.svg" }],
  },
  {
    id: uuidv4(),
    name: "src",
    children: [
      { id: uuidv4(), name: "index.css" },
      { id: uuidv4(), name: "main.tsx" },
    ],
  },
  { id: uuidv4(), name: ".gitignore" },
  { id: uuidv4(), name: "index.html" },
  { id: uuidv4(), name: "package.json" },
  { id: uuidv4(), name: "README.md" },
];

function Sidebar() {
  const { sidebar, expandStatus, expandToggle } = sidebarStore();
  const { rightSpace, toggleRightSpace, terminal, toggleTerminal } =
    editorStore();

  const [term, setTerm] = useState("");

  interface leafType {
    id: string;
    name: string;
    type: string;
    content: string;
    // parentId: string;
  }

  const treeRef = useRef<TreeApi<string>>(null);

  const onCreate: CreateHandler<leafType> = ({ type }) => {
    const newNode: leafType = {
      id: uuidv4(),
      name: "",
      type: type === "internal" ? "DIRECTORY" : "FILE",
      ...(type === "internal" && { children: [] }),
      // parentId: parentId === null ? "root" : parentId,
      content: "",
    };
    addNode(newNode);
    return newNode;
  };

  const addNode = (newNode: leafType) => {
    treeData = [...treeData, newNode];
  };

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
            <div className={styles.TitleSpace} onClick={expandToggle}>
              <div
                className={`material-symbols-outlined ${
                  expandStatus ? styles.expandStatusT : styles.expandStatusF
                }`}
              >
                {expandStatus ? "chevron_right" : "expand_more"}
              </div>
              <p className={styles.filesTitle}>Files</p>
            </div>
            <div className={styles.filesAddSpace}>
              <div
                className={`material-symbols-outlined ${styles.addFile}`}
                onClick={() => treeRef.current?.createLeaf()}
                title="New Files..."
              >
                note_add
              </div>
              <div
                className={`material-symbols-outlined ${styles.addFolder}`}
                onClick={() => treeRef.current?.createInternal()}
                title="New Folders..."
              >
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
              ref={treeRef}
              className={styles.react_arborist}
              rowClassName={styles.arborist_row}
              width={"100%"}
              height={1000}
              indent={17}
              data={treeData}
              searchTerm={term}
              searchMatch={(node, term) =>
                node.data.name.toLowerCase().includes(term.toLowerCase())
              }
              // onRename={}
              onCreate={onCreate}
            >
              {Node}
            </Tree>
          </div>
        </div>
        <div className={styles.sidebarBottom}>
          <div className={styles.sidebarBottomInner}>
            <EditorSettingBtn />
            <i
              className={`${styles.bottomIcons1} material-symbols-outlined`}
              style={rightSpace ? { opacity: 0.5 } : undefined}
              onClick={toggleRightSpace}
            >
              forum
            </i>
            <i
              className={`${styles.bottomIcons2} material-symbols-outlined`}
              style={terminal ? { opacity: 0.5 } : undefined}
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
