import globalStore from "../../store/globalStore/globalStore";
import styles from "./exploreBtn.module.css";
import { Link } from "react-router-dom";

function ExploreBtn() {
  const { exploreBtn, exploreBtnToggle } = globalStore();

  return (
    <div
      className={`${exploreBtn ? styles.exploreBtnOn : undefined} ${
        styles.exploreSpace
      }`}
    >
      <div className={styles.explore_left}>
        <i
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
        </i>
      </div>
      <div className={styles.explore_right}>
        <Link to={"/"} className={styles.exploreHome}>
          <i className={`material-symbols-outlined`}>home</i>
        </Link>
        <Link to={"/dashboard"} className={styles.exploreRepo}>
          <i className={`material-symbols-outlined`}>grid_view</i>
        </Link>
        <Link to={"/CodePage"} className={styles.exploreCode}>
          <i className={`material-symbols-outlined`}>code</i>
        </Link>
      </div>
    </div>
  );
}

export default ExploreBtn;
