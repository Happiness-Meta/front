import React from "react";
import styles from "./Projects.module.css";
import RepoPage from "../../RepoPage";

const Projects = () => {
  return (
    <RepoPage>
      <div className={styles.RepositoriesContainer}>Projects</div>
    </RepoPage>
  );
};

export default Projects;
