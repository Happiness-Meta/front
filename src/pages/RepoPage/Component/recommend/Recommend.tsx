import React from "react";
import styles from "./Recommend.module.css";
import RepoPage from "../../RepoPage";
import headerStore from "../../../../store/CodePageStore/headerStore";

const Repositories = () => {
  const { mode } = headerStore();
  const repositories = {
    repo1: {
      name: "spring",
      description: "Let's create Spring with EarthIDEN!",
      url: "repo1 url",
      image: "/svg/spring.svg",
    },
    repo2: {
      name: "React",
      description: "Let's create React apps with EarthIDEN!",
      url: "repo2 url",
      image: "/svg/React-icon.svg",
    },
    repo3: {
      name: "nextJS",
      description: "nextJS-description",
      url: "repo3 url",
      image: "/svg/nextjs.svg",
    },

    repo4: {
      name: "nextJS",
      description: "nextJS-description",
      url: "repo3 url",
      image: "/svg/nextjs.svg",
    },
  };
  const isEmpty = Object.keys(repositories).length === 0;

  return (
    <div>
      <h1>Recommend</h1>
      <div className={styles.recommendcontainer}>
        {isEmpty ? (
          <p>새 레포지토리 만들기</p>
        ) : (
          Object.entries(repositories).map(([key, repo]) => (
            <div className={styles.repo_wrapper}>
              <div key={key} className={styles.repocontainer}>
                <div className={styles.reponame_container}>
                  <h2>{repo.name}</h2>
                  <div className={styles.repoimageContaier}>
                    <img src={repo.image} className={styles.repoimage}></img>
                  </div>
                </div>
                <div className={styles.repodescription_container}>
                  <p>{repo.description}</p>
                </div>
                <div className={styles.buttoncontainer}>
                  <button className={mode ? styles.buttonSun : styles.buttonNight}>
                    Use This Template
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Repositories;
