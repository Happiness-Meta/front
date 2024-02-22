import styles from "./myPageHeader.module.css";
import ModeToggleBtn from "../../../globalComponents/modeToggleBtn/ModeToggleBtn";
import ExploreBtn from "../../../globalComponents/exploreBtn/ExploreBtn";

function MyPageHeader() {
  return (
    <div className={styles.headerSpace}>
      <div className={styles.leftSide_header}>
        <ExploreBtn />
      </div>
      <div className={styles.middleSide_header}> </div>

      <div className={styles.rightSide_header}>
        <ModeToggleBtn />
      </div>
    </div>
  );
}

export default MyPageHeader;
