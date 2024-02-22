import React, { useEffect, useRef, useState } from "react";
import styles from "./Repositories.module.css";
import { useNavigate } from "react-router-dom";
import RepoPageStore from "../../../../store/RepoPageStore/repoPageStore";
import headerStore from "../../../../../src/store/globalStore/globalStore";
import ReactModal from "react-modal";
import userAxiosWithAuth from "../../../../utils/useAxiosWIthAuth";
import { Repository } from "../../../../store/RepoPageStore/repoPageStore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useModalStore from "../../../../store/ModalStore/ModalStore";
import editorStore from "../../../../store/CodePageStore/editorStore";

dayjs.extend(relativeTime);
interface RepoComponent {
  name: string;
  description?: string;
  url: string;
  image: string;
}

// interface Repositories {
//   [key: string]: RepoComponent;
// }

// interface NameClickParams {
//   key: string;
//   name?: string;
// }

const RepoComponent = () => {
  const { repositories, setEditMode, setRepositories } = RepoPageStore();
  const { isEditModalOpen, toggleEditModal } = useModalStore();
  const [editName, setEditName] = useState("");
  const isEmpty = Object.keys(repositories).length === 0;
  const [activeDropdownKey, setActiveDropdownKey] = useState<string | null>(null);
  const { deleteAllTabs } = editorStore();
  const [currentEditingRepoKey, setCurrentEditingRepoKey] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const [, setRepoImg] = useState(undefined);
  const navigate = useNavigate();
  const [, setSelectedRepo] = useState<Repository | null>(null);

  const toggleDropdown = (key: string, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setActiveDropdownKey(activeDropdownKey === key ? null : key);
  };

  const handleEditClick = (repoId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const repoInfo = repositories[repoId];
    setSelectedRepo(repoInfo);
    setCurrentEditingRepoKey(repoId);
    toggleEditModal();
    setEditMode;
  };

  const handleNameUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 이벤트의 기본 동작 방지

    if (!currentEditingRepoKey || !editName) {
      console.error("Repository ID or new name is missing");
      return;
    }
    try {
      const response = await userAxiosWithAuth.patch(`/api/repos/${currentEditingRepoKey}`, {
        updatedName: editName,
      });
      console.log("Repository name updated successfully:", response.data);
      // setRepoImg(response.data.data.programmingLanguage.toLowerCase());
      // Zustand 스토어 업데이트
      const updatedRepositories = { ...repositories };
      updatedRepositories[currentEditingRepoKey].name = editName;
      setRepositories(updatedRepositories);

      // 편집 모드 해제
      setEditMode(null);
      toggleEditModal();
    } catch (error) {
      console.error("Error updating repository name:", error);
    }
    setEditName("");
  };

  // const handleSave = ({ key }: NameClickParams) => {
  //   const newRepositories = {
  //     ...repositories,
  //     [key]: { ...repositories[key], name: editName },
  //   };
  //   setRepositories(newRepositories);
  //   setEditMode(null);
  // };

  const handleRepoDelete = async (repoId: string, event: React.MouseEvent) => {
    event.stopPropagation();
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
              onClick={() => navigate(`/codePage/${repo.id}`)}
            >
              <div className={styles.repocontainer} onClick={deleteAllTabs}>
                <div className={styles.reponame_container}>
                  <div className={styles.repoimageContainer}>
                    <span className="material-symbols-outlined">public</span>
                    {/* <img src={repo.image} alt="repo" className={styles.repoimage}></img> */}
                  </div>

                  <div className={styles.reponame}>
                    {repo.name}

                    <div
                      className={styles.moreHorizContainer}
                      onClick={(e) => toggleDropdown(repo.id, e)}
                    >
                      <span className="material-symbols-outlined">more_horiz</span>
                    </div>
                    {activeDropdownKey === repo.id && (
                      <div
                        className={mode ? styles.dropdownMenuSun : styles.dropdownMenuNight}
                        ref={dropdownRef}
                      >
                        <button onClick={(event) => handleEditClick(repo.id, event)}>Edit</button>
                        <button onClick={(e) => handleRepoDelete(repo.id, e)}>Delete</button>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.repodescription_container}>
                  <p>
                    {new Date(repo.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
                <div className={styles.repoLinkContainer}></div>
                <div className={styles.dateContainer}>
                  <p>{dayjs(repo.modifiedAt).fromNow()}</p>
                </div>
              </div>
            </div>
          ))
        )}
        <ReactModal
          isOpen={isEditModalOpen}
          onRequestClose={toggleEditModal}
          contentLabel="change your Repository name"
          className={styles.createRepoModal}
          overlayClassName={styles.createRepoOverlay}
        >
          <div className={styles.titleAndCloseContainer}>
            <h2>Change your Repository name🚀</h2>
            <button type="button" className={styles.closeButton} onClick={toggleEditModal}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className={styles.selectedRepoContainer}></div>
          <div className={styles.submitAndButtonContainer}>
            <div className={styles.submitContainer}>
              <form onSubmit={handleNameUpdate} className={styles.MenuWrapper}>
                <input
                  type="text"
                  placeholder="change your repo name..."
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  autoFocus
                  className={styles.changeInput}
                ></input>
              </form>
            </div>
            <button type="submit">Create🚀</button>
          </div>
        </ReactModal>
      </div>
    </div>
  );
};

export default RepoComponent;
