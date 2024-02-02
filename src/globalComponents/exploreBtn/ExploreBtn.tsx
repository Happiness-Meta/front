import { useEffect } from "react";
import globalStore from "../../store/globalStore/globalStore";
import styles from "./exploreBtn.module.css";
import { Link } from "react-router-dom";

function ExploreBtn() {
  const { exploreBtn, exploreBtnToggle } = globalStore();

  const handleOutsideClick = (event: MouseEvent) => {
    // explore 창 외부를 클릭했을 때의 동작을 정의합니다.
    if (
      exploreBtn &&
      !(event.target as HTMLElement).closest(".exploreWindow")
    ) {
      exploreBtnToggle;
    }
  };

  // 다른 곳에서도 클릭 이벤트를 감지하도록 이벤트 리스너를 추가합니다.
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    // 컴포넌트가 언마운트되면 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [exploreBtn]);

  return (
    <div className={styles.exploreSpace}>
      <i
        className={`${styles.pageShiftingBtn} material-symbols-outlined`}
        onClick={exploreBtnToggle}
        style={
          exploreBtn
            ? { backgroundColor: "gray", transform: "rotate(90deg)" }
            : undefined
        }
      >
        explore
      </i>
      <div
        className={styles.exploreWindow}
        style={exploreBtn ? { visibility: "visible" } : undefined}
      >
        <Link to={"/"}>
          <i className={`material-symbols-outlined`}>home</i>홈
        </Link>
        <Link to={"/RepoPage"}>
          <i className={`material-symbols-outlined`}>lists</i>레포지토리
        </Link>
      </div>
    </div>
  );
}

export default ExploreBtn;
