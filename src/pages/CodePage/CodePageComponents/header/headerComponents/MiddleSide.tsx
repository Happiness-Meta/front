import globalStore from "@/store/globalStore/globalStore";
import styles from "../header.module.css";
import useFuncAboutFiles from "@/utils/useFuncAboutFiles";

const MiddleSide = () => {
  const { isSaved } = globalStore();

  const handleSaveRequest = useFuncAboutFiles().handleSaveRequest;
  const handleRunRequest = useFuncAboutFiles().handleRunRequest;

  return (
    <div className={styles.middleSide_header}>
      <div
        className={styles.saveBtn}
        onClick={() => handleSaveRequest.mutate()}
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
        onClick={() => handleRunRequest.mutate()}
        style={{ width: "65px" }}
      >
        <i className={`${styles.middleBtnIcon} material-icons`}>play_arrow</i>{" "}
        <div className={styles.middleBtnText}>Run</div>
      </div>
    </div>
  );
};

export default MiddleSide;
