import styles from "./header.module.css";
import LeftSide from "./headerComponents/LeftSide";
import MiddleSide from "./headerComponents/MiddleSide";
import RightSide from "./headerComponents/RightSide";

function Header() {
  return (
    <div className={styles.headerSpace}>
      <LeftSide />
      <MiddleSide />
      <RightSide />
    </div>
  );
}

export default Header;
