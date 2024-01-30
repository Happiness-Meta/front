import React from "react";
import styles from "./editor.module.css";
import sidebarStore from "../../../../store/sidebarStore";

function Editor() {
  const { sidebar } = sidebarStore();
  return (
    <div
      className={`${sidebar ? styles.sidebarToggle : undefined} ${
        styles.editorSpace
      }`}
    >
      <div className={styles.leftSpace}>example 1</div>
      <div className={styles.rightSpace}>example 2</div>
    </div>
  );
}

export default Editor;
