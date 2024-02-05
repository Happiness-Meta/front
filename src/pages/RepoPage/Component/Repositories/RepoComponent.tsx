import React, { useState } from "react";
import styles from "./Repositories.module.css";
import RepoPage from "../../RepoPage";
import { Link } from "react-router-dom";
import RepoPageStore from "../../../../store/RepoPageStore/repoPageStore";
import headerStore from "../../../../store/CodePageStore/headerStore";

interface RepoComponent {
  name: string;
  description: string;
  url: string;
  image: string;
}

interface Repositories {
  [key: string]: RepoComponent;
}

interface NameClickParams {
  key: string;
  name?: string;
}

const Repositories = () => {
  const { repositories, editMode, setEditMode, setRepositories } = RepoPageStore();
  const [editName, setEditName] = useState("");
  const isEmpty = Object.keys(repositories).length === 0;
  const handleNameClick = ({ key, name }: NameClickParams) => {
    setEditMode(key);
    setEditName(name ?? "");
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  const handleSave = ({ key }: NameClickParams) => {
    const newRepositories = {
      ...repositories,
      [key]: { ...repositories[key], name: editName },
    };
    setRepositories(newRepositories);
    setEditMode(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, key: string) => {
    if (e.key === "Enter") {
      handleSave({ key });
    }
  };

  const { mode } = headerStore();

  return (
    <div>
      <h2>All</h2>
      <div className={styles.recommendcontainer}>
        {isEmpty ? (
          <p>It's empty now. Let's make a new repository!</p>
        ) : (
          Object.entries(repositories).map(([key, repo]) => (
            <div
              key={key}
              className={`${mode ? styles.repo_wrapperSun : styles.repo_wrapperNight}`}
            >
              <div className={styles.repocontainer}>
                <div className={styles.reponame_container}>
                  <div className={styles.repoimageContaier}>
                    <img src={repo.image} alt="repo" className={styles.repoimage}></img>
                  </div>
                  <div className={styles.reponame}>
                    {editMode === key ? (
                      <div className={styles.reponame_input_container}>
                        <input
                          value={editName}
                          onChange={handleNameChange}
                          onKeyDown={(e) => handleKeyPress(e, key)}
                          onBlur={() => handleSave({ key })}
                          autoFocus
                          className={styles.reponame_input}
                        />
                      </div>
                    ) : (
                      <h3 onClick={() => handleNameClick({ key, name: repo.name })}>{repo.name}</h3>
                    )}
                    <div>
                      <span className="material-symbols-outlined">more_horiz</span>
                    </div>
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
