import sidebarStore from "@/store/CodePageStore/sidebarStore";
import styles from "../sidebar.module.css";

const TitleSpace = () => {
  const { expandStatus, expandToggle } = sidebarStore();

  return (
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
  );
};

export default TitleSpace;
