import styles from "./sidebar.module.css";
import { Tree, TreeApi } from "react-arborist";
import { useEffect, useRef, useState } from "react";
import sidebarStore from "@/store/CodePageStore/sidebarStore";
import FileTreeStore from "@/store/FileTreeStore/FileTreeStore";
import { nodeType } from "@/types/TypesForFileTree";
import Node from "@/globalComponents/Node/Node";
import useFuncAboutFiles from "@/utils/useFuncAboutFiles";
import TitleSpace from "./sidebarComponents/TitleSpace";
import SidebarBottom from "./sidebarComponents/sidebarBottom/SidebarBottom";
import CreateBtnSpace from "./sidebarComponents/CreateBtnSpace";
import SearchForm from "./sidebarComponents/SearchForm";

function Sidebar() {
  const { sidebar, expandStatus } = sidebarStore();
  const { fileTree } = FileTreeStore();

  const [term, setTerm] = useState("");

  const treeRef = useRef<TreeApi<nodeType>>();

  const handleGetData = useFuncAboutFiles().getData;
  const handleCreate = useFuncAboutFiles().onCreate;
  const handleDelete = useFuncAboutFiles().onDelete;

  useEffect(() => {
    handleGetData.mutate();
  }, []);

  return (
    <div
      className={`${sidebar ? styles.sidebarToggle : undefined} ${
        styles.sidebarSpace
      }`}
    >
      <SearchForm term={term} setTerm={setTerm} />
      <div className={styles.sidebarSpace_inner}>
        <div className={styles.filesSpace}>
          <div className={styles.filesHeader}>
            <TitleSpace />
            <CreateBtnSpace treeRef={treeRef} />
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
              data={fileTree}
              onCreate={handleCreate}
              onDelete={handleDelete}
              openByDefault={false}
              searchTerm={term}
              searchMatch={(node, term) =>
                node.data.name.toLowerCase().includes(term.toLowerCase())
              }
            >
              {Node}
            </Tree>
          </div>
        </div>
        <SidebarBottom />
      </div>
    </div>
  );
}

export default Sidebar;
