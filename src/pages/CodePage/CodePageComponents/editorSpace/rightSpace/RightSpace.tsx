import editorStore from "../../../../../store/CodePageStore/editorStore";
import styles from "./rightSpace.module.css";

function RightSpace() {
  const { rightSpace } = editorStore();
  return (
    <div
      className={`${rightSpace ? styles.rightSpaceOn : undefined} ${
        styles.rightSpace
      }`}
    >
      <div className={styles.filesTabSpace}> 채팅</div>
      <div className={` ${styles.chattingSpace}`}></div>
    </div>
  );
}

export default RightSpace;
