import React, { Children } from "react";
import styles from "./repoPage.module.css";

import RepoSidebar from "./Component/sidebar/RepoSidebar";
import RepoHeader from "./Component/header/RepoHeader";

interface LayoutProps {
  children: React.ReactNode;
}
function RepoPage({ children }: LayoutProps) {
  return (
    <div className={styles.repoPageContainer}>
      <RepoHeader />
      <div className={styles.repoPage}>
        <RepoSidebar />
        {children}
      </div>
    </div>
  );
}

export default RepoPage;
