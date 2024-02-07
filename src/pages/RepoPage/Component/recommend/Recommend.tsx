import React from "react";
import styles from "../Repositories/Repositories.module.css";
import RepoPage from "../../RepoPage";
import headerStore from "../../../../../src/store/globalStore/globalStore";
import RecommendStore from "../../../../store/RecommendStore/recommendstore";

const Repositories = () => {
  const { mode } = headerStore();
  const { repositories } = RecommendStore();

  const isEmpty = Object.keys(repositories).length === 0;

  return (
    <div>
      {/* <h2>Recommend</h2> */}
      <div className={styles.recommendcontainer}>
        {isEmpty ? (
          <></>
        ) : (
          Object.entries(repositories).map(([key, repo]) => (
            <div
              key={key}
              className={`${mode ? styles.repo_wrapperSun : styles.repo_wrapperNight}`}
            >
              <div className={styles.repocontainer}>
                <div className={styles.reponame_container}>
                  <div className={styles.repoimageContaier}>
                    <img src={repo.image} className={styles.repoimage}></img>
                  </div>
                  <div className={styles.reponame}>
                    <h3>{repo.name}</h3>
                  </div>
                </div>
                <div className={styles.repodescription_container}>
                  <p>{repo.description}</p>
                </div>

                <div className={styles.daycontainer}>4 days ago</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Repositories;
