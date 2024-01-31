import React from "react";
import styles from "./homePage.module.css";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  const createStars = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className={styles.star}
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 3 + 1}s`,
        }}
      ></div>
    ));
  };

  return (
    <div className={styles.backSky}>
      {createStars(200)}
      <div className={styles.homePageContainer}>
        <header className={styles.homepageheader}>
          <div className={styles.homePageHeader_guest} onClick={() => navigate("/CodePage")}>
            Guest
          </div>
          <div className={styles.homePageHeader_sign} onClick={() => navigate("/LoginPage")}>
            SIGN IN
          </div>
          <div className={styles.homePageHeader_start} onClick={() => navigate("/RepoPage")}>
            Get started
          </div>
        </header>
        <div className={styles.homePage}>
          <div className={styles.homePage_earth}>지구상 어디든 접근하는</div>
          <div className={styles.homePage_earth}>웹 IDE의 새로운 모습</div>
          <div className={styles.homePage_ide}>Earth-IDE-N</div>
          <div className={styles.imgcontainer}>
            <img
              src="https://blog.kakaocdn.net/dn/2sdHV/btsEdHtN2Px/V0a6TqK2tXooCXhLKKDMk0/img.png"
              className={styles.homePage_image}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
