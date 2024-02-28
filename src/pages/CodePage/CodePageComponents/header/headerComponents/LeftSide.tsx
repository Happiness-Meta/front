import ExploreBtn from "@/globalComponents/exploreBtn/ExploreBtn";
import styles from "../header.module.css";
import sidebarStore from "@/store/CodePageStore/sidebarStore";
import globalStore from "@/store/globalStore/globalStore";

const LeftSide = () => {
  const { sidebar, sidebarToggle } = sidebarStore();
  const { mode } = globalStore();

  return (
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
  );
};

export default LeftSide;
