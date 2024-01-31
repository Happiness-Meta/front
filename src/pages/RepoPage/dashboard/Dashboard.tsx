import React from "react";
import styles from "./Dashboard.module.css";
import RepoPage from "../RepoPage";

const Dashboard = () => {
  return (
    <RepoPage>
      <div className={styles.dashboardContainer}>대시보드</div>
    </RepoPage>
  );
};

export default Dashboard;
