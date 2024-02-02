import React from "react";
import styles from "./Dashboard.module.css";
import RepoPage from "../../RepoPage";
import Recommend from "../../Component/recommend/Recommend";
import Repositories from "../../Page/repositories/RepoComponent";

const Dashboard = () => {
  return (
    <RepoPage>
      <div className={styles.dashboardContainer}>
        <Recommend />
        <Repositories />
      </div>
    </RepoPage>
  );
};

export default Dashboard;
