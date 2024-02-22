import styles from "./header.module.css";
import sidebarStore from "../../../../store/CodePageStore/sidebarStore";
import ModeToggleBtn from "../../../../globalComponents/modeToggleBtn/ModeToggleBtn";
import ExploreBtn from "../../../../globalComponents/exploreBtn/ExploreBtn";
import globalStore from "../../../../store/globalStore/globalStore";
import editorStore from "../../../../store/CodePageStore/editorStore";
import AccountBtn from "../../../../globalComponents/accountBtn/AccountBtn";
import FileTreeStore from "../../../../store/FileTreeStore/FileTreeStore";
// import { removeLeadingSlash } from "../../../../utils/fileTreeUtils";
import userAxiosWithAuth from "../../../../utils/useAxiosWIthAuth";
import { useParams } from "react-router-dom";

function Header() {
  const { sidebar, sidebarToggle } = sidebarStore();
  const { mode } = globalStore();
  const { nodeContent, toggleInviteSpace } = editorStore();
  const { selectedNode } = FileTreeStore();
  const { repoId } = useParams();

  const handleSaveRequest = async () => {
    if (!selectedNode) {
      alert("저장할 파일을 선택해주세요.");
      return;
    }

    let sendFilePath;

    const parentPath = FileTreeStore.getState().findNodePath(
      selectedNode.parentId
    );

    if (parentPath === null) {
      sendFilePath = selectedNode.name;
    } else {
      sendFilePath = parentPath + "/" + selectedNode.name;
    }

    const body = {
      originFilepath: sendFilePath,
      newFilepath: sendFilePath,
      content: nodeContent[1],
    };
    try {
      console.log(body);
      const response = await userAxiosWithAuth.put(
        `/api/files/${repoId}`,
        body
      );
      console.log(response.data);
      console.log(nodeContent[1]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.headerSpace}>
      <div className={styles.leftSide_header}>
        <i
          className={styles.sidebarToggle}
          onClick={sidebarToggle}
          style={mode ? { borderColor: "black" } : { borderColor: "white" }}
        >
          <div
            className={`${
              sidebar ? styles.sidebarToggleInnerT : styles.sidebarToggleInnerF
            }`}
            style={
              sidebar
                ? { backgroundColor: "black", borderColor: "white" }
                : { backgroundColor: "white", borderColor: "black" }
            }
          ></div>
        </i>
        <ExploreBtn />
        <div className={styles.IDE_name}>Earth-IDE-N</div>
      </div>
      <div className={styles.middleSide_header}>
        <div className={styles.saveBtn} onClick={() => handleSaveRequest()}>
          <i className={`${styles.saveIcon} material-symbols-outlined`}>save</i>{" "}
          <div className={styles.saveText}>Save</div>
        </div>
      </div>
      <div className={styles.rightSide_header}>
        <i
          className={`${styles.inviteKeyBtn} material-symbols-outlined`}
          onClick={toggleInviteSpace}
        >
          person_add
        </i>
        <ModeToggleBtn />
        <AccountBtn />
      </div>
    </div>
  );
}

export default Header;
