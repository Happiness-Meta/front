import React, { ChangeEvent, useState } from "react";
import styles from "./sidebar.module.css";
import sidebarStore from "../../../../store/CodePageStore/sidebarStore";
import Profile from "../../Component/profile/Profile";
import { Link } from "react-router-dom";

function Sidebar() {
  const { expandStatus, expandToggle } = sidebarStore();
  const { sidebar } = sidebarStore();

  return (
    <div className={`${sidebar ? styles.sidebarToggle : undefined} ${styles.sidebarSpace}`}>
      <form>
        <input type="text" className={styles.search_input} placeholder="Search"></input>
      </form>

      <div className={styles.filesSpace}>
        <div className={styles.filesHeader}>
          <div className={styles.TitleSpace}></div>
        </div>
        <div
          className={`${expandStatus ? styles.FCExpandStatus : undefined} ${styles.fileContainer}`}
        ></div>
      </div>
      <div className={styles.profileContainer}>
        <Link to="/RepoPage" className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <Profile />
          </div>
          <div className={styles.profilename}>
            <h3>@Matilda0730</h3>
            <h5>free plan</h5>
          </div>
        </Link>
      </div>

      <div className={styles.dashboardContainer}>
        <div className={styles.dashboard}>
          <Link to="/dashboard" className={styles.dashboard}>
            <span className="material-symbols-outlined">schedule</span> &nbsp; Dashboard
          </Link>
        </div>
        <div>
          <Link to="/repositories" className={styles.repositories}>
            <span className="material-symbols-outlined">library_books</span> &nbsp;Repositories
          </Link>
        </div>
        <div>
          <Link to="/projects" className={styles.projects}>
            <span className="material-symbols-outlined">list</span> &nbsp;Projects
          </Link>
        </div>
        <div>
          <Link to="/settings" className={styles.settings}>
            <span className="material-symbols-outlined">settings</span> &nbsp; Settings
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
