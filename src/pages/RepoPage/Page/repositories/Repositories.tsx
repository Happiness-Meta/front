import React from "react";
import styles from "./Repositories.module.css";
import RepoPage from "../../RepoPage";
import RepoComponent from "../../Component/Repositories/RepoComponent";

const Repositories = () => {
  return (
    <RepoPage>
      <div className={styles.repositoriescontainer}>
        <RepoComponent />
      </div>
    </RepoPage>
  );
};

export default Repositories;
