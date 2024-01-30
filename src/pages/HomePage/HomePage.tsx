import React from "react";
import styles from "./homePage.module.css";

function HomePage() {
  return (
    <div className={styles.homePage}>
      <div className={styles.homePage_earth}>지구상 어디든 접근하는</div>
      <div className={styles.homePage_earth}>웹 IDE의 새로운 모습</div>
      <div className={styles.homePage_ide}>Earth-IDE-N</div>

    </div>
  );
}

export default HomePage;
