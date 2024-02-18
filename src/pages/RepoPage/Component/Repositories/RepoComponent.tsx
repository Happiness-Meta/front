import React, { useEffect, useRef, useState } from "react";
import styles from "./Repositories.module.css";
import RepoPage from "../../RepoPage";
import { Link } from "react-router-dom";
import RepoPageStore from "../../../../store/RepoPageStore/repoPageStore";
import headerStore from "../../../../../src/store/globalStore/globalStore";
import ReactModal from "react-modal";
import userAxiosWithAuth from "../../../../utils/useAxiosWIthAuth";
import { Repository } from "../../../../store/RepoPageStore/repoPageStore";
interface RepoComponent {
  name: string;
  description?: string;
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
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  const handleNameUpdate = async (repoId: string, newName: string) => {
    try {
      const response = await userAxiosWithAuth.patch(`/api/repos/${repoId}`, {
        updatedName: newName, // 요청 본문에 새 이름을 'updatedName' 키로 전달
      });
      console.log("Repository name updated successfully:", response.data);

      // Zustand 스토어 업데이트
      const updatedRepositories = { ...repositories };
      updatedRepositories[repoId].name = newName;
      setRepositories(updatedRepositories);

      // 편집 모드 해제
      setEditMode(null);
    } catch (error) {
      console.error("Error updating repository name:", error);
    }
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

  const handleRepoDelete = async (repoId: string) => {
    try {
      const response = await userAxiosWithAuth.delete(`/api/repos/${repoId}`);
      console.log("Deleted repository:", response.data);

      // 저장소 삭제 후 스토어의 상태 업데이트
      const updatedRepositories = Object.entries(RepoPageStore.getState().repositories)
        .filter(([key, _]) => key !== repoId) // 삭제하려는 repoId가 아닌 항목만 필터링
        .reduce((acc, [key, repo]) => {
          acc[key] = repo; // 필터링된 항목을 새 객체에 추가
          return acc;
        }, {} as { [key: string]: Repository }); // 올바른 타입 지정

      RepoPageStore.getState().setRepositories(updatedRepositories);
    } catch (error) {
      console.error("Error deleting repository:", error);
    }
  };

  // 외부 클릭 시 드롭다운 메뉴 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdownKey(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const { mode } = headerStore();

  return (
    <div>
      <div className={styles.recommendcontainer}>
        {isEmpty ? (
          <></>
        ) : (
          Object.values(repositories).map((repo, index) => (
            <div
              key={index}
              className={`${mode ? styles.repo_wrapperSun : styles.repo_wrapperNight}`}
            >
              <div className={styles.repocontainer}>
                <div className={styles.reponame_container}>
                  <div className={styles.repoimageContainer}>
                    <img src={repo.image} alt="repo" className={styles.repoimage}></img>
                  </div>
                  <div className={styles.reponame}>
                    {editMode === repo.name ? (
                      <div className={styles.reponame_input_container}>
                        <input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleNameUpdate(repo.id, editName)
                          }
                          onBlur={() => handleNameUpdate(repo.id, editName)}
                          autoFocus
                          className={styles.reponame_input}
                        />
                      </div>
                    ) : (
                      <h3 onClick={() => handleNameClick({ key: repo.name, name: repo.name })}>
                        {repo.name}
                      </h3>
                    )}
                    <div onClick={() => toggleDropdown(repo.id)}>
                      <span className="material-symbols-outlined">more_horiz</span>
                    </div>
                    {activeDropdownKey === repo.id && (
                      <div
                        className={mode ? styles.dropdownMenuSun : styles.dropdownMenuNight}
                        ref={dropdownRef}
                      >
                        <button
                          onClick={() => {
                            setCurrentEditingRepoKey(repo.name); // 현재 편집 중인 레포지토리 키 설정
                            toggleModal();
                          }}
                        >
                          Edit
                        </button>
                        <button onClick={() => handleRepoDelete(repo.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.repodescription_container}>
                  <p>{repo.createdAt}</p>
                </div>
                <div className={styles.repoLinkContainer}>
                  <Link to={`codePage/${repo.id}`}>View Repository</Link>
                </div>
                <div className={styles.dateContainer}>
                  <p>Created at: {repo.createdAt}</p>
                  <p>Last modified: {repo.modifiedAt}</p>
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
