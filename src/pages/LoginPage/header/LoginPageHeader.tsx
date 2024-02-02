import styles from "./loginPageHeader.module.css";
import { Link } from "react-router-dom";
import ModeToggleBtn from "../../../globalComponents/modeToggleBtn/ModeToggleBtn";

function LoginPageHeader() {
  return (
    <div className={styles.headerSpace}>
      <div className={styles.leftSide_header}>
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

export default LoginPageHeader;
