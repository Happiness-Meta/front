import styles from "./header.module.css";
import sidebarStore from "../../../../store/CodePageStore/sidebarStore";
import ModeToggleBtn from "../../../../globalComponents/modeToggleBtn/ModeToggleBtn";
import ExploreBtn from "../../../../globalComponents/exploreBtn/ExploreBtn";
import globalStore from "../../../../store/globalStore/globalStore";
import editorStore from "../../../../store/CodePageStore/editorStore";
import AccountBtn from "../../../../globalComponents/AccountBtn/AccountBtn";
import FileTreeStore from "../../../../store/FileTreeStore/FileTreeStore";
import userAxiosWithAuth from "../../../../utils/useAxiosWIthAuth";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useGetData from "../../../../utils/useGetData";

function Header() {
  const { sidebar, sidebarToggle } = sidebarStore();
  const { mode } = globalStore();
  const {
    nodeContent,
    updateTabContent,
    toggleInviteSpace,
    setTerminalContent,
  } = editorStore();
  const { selectedNode } = FileTreeStore();
  const { repoId } = useParams();
  const [isSaved, setIsSaved] = useState(false);

  const getDataMutation = useGetData();

  const handleSaveRequest = async () => {
    if (!selectedNode) {
      alert("저장할 파일을 선택해주세요.");
      return;
    }

    let sendFilePath;

    const parentPath = FileTreeStore.getState().findNodePath(
      selectedNode.parentId!
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
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 1000);
      getDataMutation.mutate();
      updateTabContent(selectedNode, nodeContent[1]!);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRun = async () => {
    if (!nodeContent[1]) {
      alert("실행할 파일을 선택해주세요.");
      return;
    }

    const body = {
      code: nodeContent[1],
    };

    try {
      const response = await userAxiosWithAuth.post(`/api/run`, body);
      setTerminalContent(response.data.data);
      handleSaveRequest();
    } catch (error) {
      console.log(error);
      console.log(nodeContent[1]);
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
        <div
          className={styles.saveBtn}
          onClick={() => handleSaveRequest()}
          style={{ width: isSaved ? "80px" : "70px" }}
        >
          <i className={`${styles.middleBtnIcon} material-symbols-outlined`}>
            {isSaved ? "done" : "save"}
          </i>{" "}
          <div className={styles.middleBtnText}>
            {isSaved ? "Saved!" : "Save"}
          </div>
        </div>

        <div
          className={styles.runBtn}
          onClick={() => handleRun()}
          style={{ width: "65px" }}
        >
          <i className={`${styles.middleBtnIcon} material-icons`}>play_arrow</i>{" "}
          <div className={styles.middleBtnText}>Run</div>
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
