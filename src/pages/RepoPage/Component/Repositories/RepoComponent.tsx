import React, { useEffect, useState } from "react";
import styles from "./Repositories.module.css";
import RepoPage from "../../RepoPage";
import { Link } from "react-router-dom";
import RepoPageStore from "../../../../store/RepoPageStore/repoPageStore";
import headerStore from "../../../../../src/store/globalStore/globalStore";
import ReactModal from "react-modal";
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
  const { repositories, editMode, setEditMode, setRepositories, show, toggleModal } =
    RepoPageStore();
  const [editName, setEditName] = useState("");
  const isEmpty = Object.keys(repositories).length === 0;
  const [activeDropdownKey, setActiveDropdownKey] = useState<string | null>(null);
  const [currentEditingRepoKey, setCurrentEditingRepoKey] = useState<string | null>(null);
  const handleNameClick = ({ key, name }: NameClickParams) => {
    setEditMode(key);
    setEditName(name ?? "");
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  const toggleDropdown = (key: string) => {
    setActiveDropdownKey(activeDropdownKey === key ? null : key);
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
      {/* <h2>All</h2> */}
      <div className={styles.recommendcontainer}>
        {isEmpty ? (
          <></>
        ) : (
          Object.entries(repositories).map(([key, repo]) => (
            <div
              key={key}
              className={`${mode ? styles.repo_wrapperSun : styles.repo_wrapperNight} `}
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
                    <div onClick={() => toggleDropdown(key)}>
                      <span className="material-symbols-outlined">more_horiz</span>
                    </div>
                    {activeDropdownKey === key && (
                      <div className={styles.dropdownMenu}>
                        <button
                          onClick={() => {
                            setCurrentEditingRepoKey(key); // 현재 편집 중인 레포지토리 키 설정
                            toggleModal();
                          }}
                        >
                          Edit
                        </button>
                        <button onClick={() => console.log("Delete", key)}>Delete</button>
                      </div>
                    )}
                    <ReactModal
                      isOpen={show}
                      onRequestClose={() => {
                        toggleModal();
                        setCurrentEditingRepoKey(null); // 모달 닫을 때 상태 초기화
                      }}
                      contentLabel="Edit Repository"
                      style={{
                        content: {
                          top: "50%",
                          left: "50%",
                          right: "auto",
                          bottom: "auto",
                          marginRight: "-50%",
                          transform: "translate(-50%, -50%)",
                          border: "1px solid #ccc",
                          background: "#1e1e26",
                          overflow: "auto",
                          WebkitOverflowScrolling: "touch",
                          borderRadius: "4px",
                          outline: "none",
                          padding: "20px",
                          zIndex: 100,
                        },
                        overlay: {
                          backgroundColor: "rgba(0, 0, 0, 0.25)",
                          zIndex: 100,
                        },
                      }}
                    >
                      <h2>
                        Edit:{currentEditingRepoKey ? repositories[currentEditingRepoKey].name : ""}
                      </h2>
                      <input></input>
                    </ReactModal>
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
