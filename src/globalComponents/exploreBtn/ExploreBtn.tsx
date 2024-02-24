import { useRef } from "react";
import globalStore from "../../store/globalStore/globalStore";
import styles from "./exploreBtn.module.css";
import { Link } from "react-router-dom";
import ClickOutsideFalse from "../ClickOutsideFalse";

function ExploreBtn() {
  const { exploreBtn, exploreBtnToggle } = globalStore();
  const exploreBtnRef = useRef<HTMLDivElement>(null);

  ClickOutsideFalse(exploreBtnRef, exploreBtn, exploreBtnToggle);

  return (
    <div
      className={`${exploreBtn ? styles.exploreBtnOn : undefined} ${
        styles.exploreSpace
      }`}
    >
      <div className={styles.explore_left}>
        <div
          ref={exploreBtnRef}
          className={`${styles.pageShiftingBtn} material-symbols-outlined`}
          onClick={exploreBtnToggle}
          style={
            exploreBtn
              ? {
                  backgroundColor: "gray",
                  transform: "rotate(90deg)",
                }
              : undefined
          }
        >
          explore
        </div>
      </div>
      <div className={styles.explore_right}>
        <Link
          to={"/"}
          className={styles.exploreHome}
          onClick={exploreBtnToggle}
        >
          <i className={`material-symbols-outlined`}>home</i>
        </Link>
        <Link
          to={"/dashboard"}
          className={styles.exploreRepo}
          onClick={exploreBtnToggle}
        >
          <i className={`material-symbols-outlined`}>grid_view</i>
        </Link>
        {/* <Link
          to={`/CodePage`}
          className={styles.exploreCode}
          onClick={exploreBtnToggle}
        >
          <i className={`material-symbols-outlined`}>code</i>
        </Link> */}
      </div>
    </div>
  );
}

export default ExploreBtn;
