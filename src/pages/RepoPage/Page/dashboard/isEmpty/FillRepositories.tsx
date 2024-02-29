import Recommend from "@/pages/RepoPage/Component/recommend/Recommend";
import styles from "./fillRepositories.module.css";
import RepoComponent from "@/pages/RepoPage/Component/Repositories/RepoComponent";
import useModalStore from "@/store/ModalStore/ModalStore";
import { useEffect } from "react";
import useDashBoardStore from "@/store/dashboardStore/dashboardStore";

export default function FillRepositories() {
  const { toggleCreateModal } = useModalStore();
  const { isAnimated, setIsAnimated } = useDashBoardStore();

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className={`${isAnimated ? styles.fadeIn : styles.dashboardContainer}`}>
      <div className={styles.repositoriescontainer}>
        <div className={styles.recommendcontainer_fill}>
          <h2>Recommendation Templates</h2>
        </div>
        <div className={styles.recommend_fill}>
          <Recommend />
        </div>
        <div className={styles.createRepoContainer}>
          <button onClick={toggleCreateModal} className={styles.newrepobutton2}>
            CREATE REPOSITORY
          </button>
        </div>
        <div className={styles.repositories_fill}>
          <h2>All Repositories</h2>
          <RepoComponent />
        </div>
      </div>
    </div>
  );
}
