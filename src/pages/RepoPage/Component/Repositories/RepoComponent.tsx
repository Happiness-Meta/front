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
  repositories: Repository[];
}

interface RepoComponentProps {
  AllandSharedrepositories: Repository[];
  onDeleteRepository: (repoId: string) => void;
}

const RepoComponent = ({ AllandSharedrepositories, onDeleteRepository }: RepoComponentProps) => {
  const { myRepositories, setEditMode, deleteRepository, updateRepositoryName } = RepoPageStore();
  const { isEditModalOpen, toggleEditModal } = useModalStore();
  const [editName, setEditName] = useState("");
  const [activeDropdownKey, setActiveDropdownKey] = useState<string | null>(null);
  const { deleteAllTabs } = editorStore();
  const [currentEditingRepoKey, setCurrentEditingRepoKey] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { mode } = headerStore();

  const toggleDropdown = (key: string, event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setActiveDropdownKey(activeDropdownKey === key ? null : key);
  };

  const handleEditClick = (repoId: string, event: React.MouseEvent) => {
    event.stopPropagation();

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

      // Zustand 스토어를 사용하여 리포지토리 이름 업데이트
      updateRepositoryName(currentEditingRepoKey, editName);

      // 편집 모드 해제 및 모달 닫기
      setEditMode(null);
      toggleEditModal();
    } catch (error) {
      console.error("Error updating repository name:", error);
    }

    setEditName("");
  };

  //레포지토리 삭제하는 함수
  const handleRepoDelete = async (repoId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      const response = await userAxiosWithAuth.delete(`/api/repos/${repoId}`);
      console.log("Repository deleted successfully:", response.data);
      deleteRepository(repoId);
      onDeleteRepository(repoId);
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

  return (
    <div>
      <div className={styles.recommendcontainer}>
        {AllandSharedrepositories.length !== 0 ? (
          AllandSharedrepositories.map((repo, index) => (
            <div
              key={index}
              className={`${mode ? styles.repo_wrapperSun : styles.repo_wrapperNight}`}
              onClick={() => navigate(`/codePage/${repo.id}`)}
            >
              <div
                className={styles.repocontainer}
                onClick={() => {
                  setActiveDropdownKey(repo.id);
                  deleteAllTabs();
                  console.log("repoid:", repo.id);
                }}
              >
                <div className={styles.reponame_container}>
                  <div className={styles.repoimageContainer}>
                    <img
                      src={`/svg/${repo.programmingLanguage.toLowerCase()}.svg`}
                      alt="repo"
                      className={styles.repoimage}
                    ></img>
                  </div>

                  <div className={styles.reponame}>
                    {repo.name}

                    <div>
                      {activeDropdownKey === repo.id && (
                        <div
                          className={mode ? styles.dropdownMenuSun : styles.dropdownMenuNight}
                          ref={dropdownRef}
                        >
                          <button onClick={(event) => handleEditClick(repo.id, event)}>Edit</button>
                          <button onClick={(e) => handleRepoDelete(repo.id, e)}>Delete</button>
                        </div>
                      )}

                      <span
                        className="material-symbols-outlined"
                        onClick={(e) => toggleDropdown(repo.id, e)}
                      >
                        more_horiz
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.repodescription_container}></div>
                <div className={styles.repoLinkContainer}></div>

                <div className={styles.dateContainer}>
                  <p>{repo.creatorNickname?.creator} </p>
                  <p>
                    {new Date(repo.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                  <p>{dayjs(repo.modifiedAt).fromNow()}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>no repositories found</div>
        )}
        <ReactModal
          isOpen={isEditModalOpen}
          onRequestClose={toggleEditModal}
          contentLabel="change your Repository name"
          className={styles.createRepoModal}
          overlayClassName={styles.createRepoOverlay}
        >
          <div className={styles.titleAndCloseContainer}>
            <h2>Change Repo name🚀</h2>
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
                <button type="submit">Edit🚀</button>
              </form>
            </div>
          </div>
        </ReactModal>
      </div>
    </div>
  );
};

export default RepoComponent;
