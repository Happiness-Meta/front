import React, { useEffect, useRef, useState } from "react";
import RepoPageStore from "../../../../store/RepoPageStore/repoPageStore";
import styles from "../Repositories/Repositories.module.css";
import headerStore from "../../../../../src/store/globalStore/globalStore";
import RepoModal from "../../Modal/Repomodal";

const Recent = () => {
  const { repositories, toggleModal } = RepoPageStore();
  const [activeDropdownKey, setActiveDropdownKey] = useState<string | null>(null);
  //일단 레포 1과 2만 골라서 넣어놓음(추후 최근 일자별 정렬(아마 sort 메서드 이용)후 2개만 표시로 변경)
  const filteredRepositories = Object.entries(repositories)
    .filter(([key]) => key === "repo1" || key === "repo2")
    .map(([_, value]) => value);
  const { mode } = headerStore();
  const dropdownRef = useRef<HTMLDivElement>(null); // 참조용(드롭다운)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeDropdownKey !== null &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdownKey(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdownKey]);

  const toggleDropdown = (key: string) => {
    setActiveDropdownKey(activeDropdownKey === key ? null : key);
  };

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
              <div className={styles.reponame_container} ref={dropdownRef}>
                <div className={styles.repoimageContaier}>
                  <img src={repo.image} className={styles.repoimage} alt={repo.name}></img>
                </div>
                <div className={styles.reponame}>
                  <h3>{repo.name}</h3>
                  <div onClick={() => toggleDropdown(repo.key)}>
                    <span className="material-symbols-outlined">more_horiz</span>
                  </div>
                  {activeDropdownKey === repo.key && (
                    <div className={styles.dropdownMenu}>
                      <button onClick={() => console.log("Edit", repo.key)}>Edit</button>
                      <button onClick={() => console.log("Delete", repo.key)}>Delete</button>
                    </div>
                  )}
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
