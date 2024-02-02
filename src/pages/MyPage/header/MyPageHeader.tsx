import styles from "./myPageHeader.module.css";
import { Link } from "react-router-dom";
import ModeToggleBtn from "../../../globalComponents/modeToggleBtn/ModeToggleBtn";

function MyPageHeader() {
  return (
    <div className={styles.headerSpace}>
      <div className={styles.leftSide_header}>
        <i className={`${styles.pageShiftingBtn} material-symbols-outlined`}>
          explore
        </i>
        <Link to="/" className={styles.IDE_name}>
          Earth-IDE-N
        </Link>
      </div>

      <div className={styles.rightSide_header}>
        <ModeToggleBtn />
      </div>
    </div>
  );
}

export default MyPageHeader;
