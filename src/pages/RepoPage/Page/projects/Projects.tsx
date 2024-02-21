import { useEffect, useState } from "react";
import styles from "./Projects.module.css";
import RepoPage from "../../RepoPage";
import Recommend from "../../Component/recommend/Recommend";
import Repositories from "../../Component/Repositories/RepoComponent";
// import Recent from "../../Component/Recent/Recent";

const Projects = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <RepoPage>
      <div
        className={`${isAnimated ? styles.fadeIn : styles.dashboardContainer}`}
      >
        <div className={`${styles.recentContaier}`}>{/* <Recent /> */}</div>
        <div className={styles.repositoriescontainer}>
          <Repositories />
          <Recommend />
        </div>
      </div>
    </RepoPage>
  );
};

export default Projects;
