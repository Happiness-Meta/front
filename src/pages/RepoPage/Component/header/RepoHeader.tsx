import styles from "./header.module.css";
import sidebarStore from "../../../../store/CodePageStore/sidebarStore";
import headerStore from "../../../../store/CodePageStore/headerStore";
import { Link } from "react-router-dom";
import Profile from "../../Component/profile/Profile";
import ModeToggleBtn from "../../../../globalComponents/modeToggleBtn/ModeToggleBtn";
import ExploreBtn from "../../../../globalComponents/exploreBtn/ExploreBtn";

function Header() {
  const { sidebar, sidebarToggle } = sidebarStore();
  const { mode } = headerStore();

  return (
    <div className={styles.headerSpace}>
      <div className={styles.leftSide_header}>
        <i
          className={styles.sidebarToggle}
          onClick={sidebarToggle}
          style={mode ? { borderColor: "black" } : { borderColor: "white" }}
        >
          <div
            className={`${sidebar ? styles.sidebarToggleInnerT : styles.sidebarToggleInnerF}`}
            style={
              sidebar
                ? { backgroundColor: "black", borderColor: "white" }
                : { backgroundColor: "white", borderColor: "black" }
            }
          ></div>
        </i>

        <ExploreBtn />
        <Link
          to="/"
          className={styles.IDE_name}
          style={mode ? { color: "black" } : { color: "white" }}
        >
          Earth-IDE-N
        </Link>
      </div>

      <div className={styles.rightSide_header}>
        <ModeToggleBtn />
        <div className={styles.accountSpace}>
          <Profile />
          <div className={`${styles.accountExpand} material-icons`}>expand_more</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
