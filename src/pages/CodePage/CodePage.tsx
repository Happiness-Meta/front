import React from "react";
import styles from "./codePage.module.css";
import Header from "./CodePageComponents/header/Header";
import Sidebar from "./CodePageComponents/sidebar/Sidebar";
import EditorSpace from "./CodePageComponents/editorSpace/EditorSpace";

function CodePage() {
  return (
    <div className={styles.codePage}>
      <Header />
      <div className={styles.codePage_body}>
        <Sidebar />
        <EditorSpace />
      </div>
    </div>
  );
}

export default CodePage;
