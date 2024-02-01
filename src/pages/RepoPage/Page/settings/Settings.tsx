import React from "react";
import styles from "./Settings.module.css";
import RepoPage from "../../RepoPage";

const Settings = () => {
  return (
    <RepoPage>
      <div className={styles.RepositoriesContainer}>Settings</div>
    </RepoPage>
  );
};

export default Settings;
