import React from "react";
import styles from "./Recommend.module.css";
import RepoPage from "../../RepoPage";

const Repositories = () => {
  const repositories = {
    repo1: {
      name: "spring-repository",
      description: "Spring repository",
      url: "repo1 url",
      image: "/svg/spring.svg",
    },
    repo2: {
      name: "react-repository",
      description: "React repository",
      url: "repo2 url",
      image: "/svg/React-icon.svg",
    },
    repo3: {
      name: "nextJS-repository",
      description: "nextJS-description",
      url: "repo3 url",
      image: "/svg/nextjs.svg",
    },
  };
  const isEmpty = Object.keys(repositories).length === 0;

  return (
    <div>
      {isEmpty ? (
        <p>새 레포지토리 만들기</p>
      ) : (
        Object.entries(repositories).map(([key, repo]) => (
          <div key={key} className={styles.repocontainer}>
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
            <a href={repo.url}>Visit</a>
            <div className={styles.repoimageContaier}>
              <img src={repo.image} className={styles.repoimage}></img>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Repositories;
