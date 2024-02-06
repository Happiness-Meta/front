import React from "react";
import RepoPageStore from "../../../../store/RepoPageStore/repoPageStore";
import styles from "../Repositories/Repositories.module.css";
import headerStore from "../../../../../src/store/globalStore/globalStore";
import RepoModal from "../../Modal/Repomodal";

const Recent = () => {
  const { repositories, toggleModal } = RepoPageStore();
  //일단 레포 1과 2만 골라서 넣어놓음(추후 최근 일자별 정렬(아마 sort 메서드 이용)후 2개만 표시로 변경)
  const filteredRepositories = Object.entries(repositories)
    .filter(([key]) => key === "repo1" || key === "repo2")
    .map(([_, value]) => value);
  const { mode } = headerStore();

  return (
    <div>
      {/* <h2>Recent</h2> */}
      <div className={styles.recommendcontainer}>
        {filteredRepositories.map((repo, index) => (
          <div
            key={index}
            className={`${mode ? styles.repo_wrapperSun : styles.repo_wrapperNight}`}
          >
            <div className={styles.repocontainer}>
              <div className={styles.reponame_container}>
                <div className={styles.repoimageContaier}>
                  <img src={repo.image} className={styles.repoimage} alt={repo.name}></img>
                </div>
                <div className={styles.reponame}>
                  <h3>{repo.name}</h3>
                  <div onClick={() => toggleModal()}>
                    <span className="material-symbols-outlined">more_horiz</span>
                  </div>
                  <RepoModal />
                </div>
              </div>
              <div className={styles.repodescription_container}>
                <p>{repo.description}</p>
              </div>

              <div className={styles.daycontainer}>4 days ago</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent;
