import React from "react";
import styles from "./Dashboard.module.css";
import RepoPage from "../../RepoPage";
import Recommend from "../../Component/recommend/Recommend";
import Repositories from "../../Component/Repositories/RepoComponent";
import Recent from "../../Component/Recent/Recent";

const Dashboard = () => {
  return (
    <RepoPage>
      <div className={styles.dashboardContainer}>
        <Recent />
        <Repositories />
        <Recommend />
      </div>
    </RepoPage>
  );
};

export default Dashboard;
