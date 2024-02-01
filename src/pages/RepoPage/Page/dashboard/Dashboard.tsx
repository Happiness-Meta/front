import React from "react";
import styles from "./Dashboard.module.css";
import RepoPage from "../../RepoPage";
import Recommend from "../../Component/recommend/Recommend";

const Dashboard = () => {
  return (
    <RepoPage>
      <div className={styles.dashboardContainer}>대시보드</div>
      <Recommend />
    </RepoPage>
  );
};

export default Dashboard;
