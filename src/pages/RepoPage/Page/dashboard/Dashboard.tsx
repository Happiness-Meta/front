import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import RepoPage from "../../RepoPage";
import Recommend from "../../Component/recommend/Recommend";
import Repositories from "../../Component/Repositories/RepoComponent";
import Recent from "../../Component/Recent/Recent";
import RepoPageStore from "../../../../store/RepoPageStore/repoPageStore";

const Dashboard = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const { repositories } = RepoPageStore();
  const isEmpty = Object.keys(repositories).length === 0;
  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <RepoPage>
      {isEmpty ? (
        <div className={`${isAnimated ? styles.fadeIn : styles.dashboardContainer}`}>
          <div className={styles.repositoriescontainer_empty}>
            <h1>Home</h1>
            <p>New on Happiness Meta</p>
            <div className={styles.imgContainer}>
              <div className={styles.imgcontext}>
                <div className={styles.p_box}>
                  <h3>Notion</h3>
                  <p>Jan 05. 2024</p>
                </div>
                <img src="https://blog.kakaocdn.net/dn/b096ff/btsEnS31kpu/JWqbMNxuxz4rJL5h8nMsVk/img.jpg"></img>
                <div className={styles.textContainer}>
                  This is the notice page of Happiness meta. We usually record, organize, and plan
                  our studies here.
                </div>
              </div>
              <div className={styles.imgcontext}>
                <div className={styles.p_box}>
                  <h3>Personalization</h3>
                  <p>Jan 05. 2024</p>
                </div>
                <img src="https://blog.kakaocdn.net/dn/cd7E76/btsEttWjzlw/vgy6gbezenkYhcMqXPh1nK/img.jpg"></img>

                <div className={styles.textContainer}>
                  Click to go to Yang Jae-sun's personal production page.
                </div>
              </div>
              <div className={styles.imgcontext}>
                <div className={styles.p_box}>
                  <h3>Notion</h3>
                  <p>Jan 05. 2024</p>
                </div>
                <img src="https://blog.kakaocdn.net/dn/6fWwh/btsEqwFL7Vv/IAqXIGwlpKnabANPzI7Ww1/img.jpg"></img>
                <div className={styles.textContainer}>
                  Last month, we released many new features and improvements designed to boost your
                  productivity, collaboration, and coding experience on Replit. Some of the key
                  highlights include:
                </div>
              </div>
            </div>

            <div className={styles.startbuttoncontainer}>
              <h2>It's empty now. Let's make a new repository!🚀</h2>
              <button className={styles.newrepobutton}>CREATE REPOSITORY</button>
            </div>
          </div>
          <div className={styles.repositoriescontainer_empty_text}>
            <div className={styles.recommendcontainer}>
              <div className={styles.recommend}>
                <h2>Recommend</h2>
              </div>
              <div className={styles.recommendComponent}>
                <Recommend />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${isAnimated ? styles.fadeIn : styles.dashboardContainer}`}>
          <div>
            <button className={styles.newrepobutton}>CREATE REPOSITORY</button>
          </div>
          <div className={`${styles.recentContaier}`}>
            <div className={styles.recommendcontainer_fill}>
              <h2>Recent</h2>
              <Recent />
            </div>
          </div>
          <div className={styles.repositoriescontainer}>
            <div className={styles.recommendcontainer_fill}>
              <h2>Recommend</h2>
            </div>
            <div className={styles.recommend_fill}>
              <Recommend />
            </div>
            <h2>All</h2>
            <Repositories />
          </div>
        </div>
      )}
    </RepoPage>
  );
};

export default Dashboard;
