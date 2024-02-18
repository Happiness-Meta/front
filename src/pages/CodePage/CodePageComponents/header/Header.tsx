import styles from "./header.module.css";
import sidebarStore from "../../../../store/CodePageStore/sidebarStore";
import ModeToggleBtn from "../../../../globalComponents/modeToggleBtn/ModeToggleBtn";
import ExploreBtn from "../../../../globalComponents/exploreBtn/ExploreBtn";
import globalStore from "../../../../store/globalStore/globalStore";
import AccountBtn from "../../../../globalComponents/accountBtn/AccountBtn";
import { useCookies } from "react-cookie";

function Header() {
  const { sidebar, sidebarToggle } = sidebarStore();
  const { mode } = globalStore();
  const [cookies] = useCookies(["token"]);

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
        <div className={styles.saveBtn}>
          <i className={`${styles.saveIcon} material-symbols-outlined`}>save</i>{" "}
          <div className={styles.saveText}>Save</div>
        </div>
      </div>
      <div className={styles.rightSide_header}>
        <ModeToggleBtn />
        {cookies.token ? <AccountBtn /> : undefined}
      </div>
    </div>
  );
}

export default Header;
