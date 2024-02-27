import React, { useState } from "react";
import styles from "./Recommend.module.css";
import RepoPageStore from "@/store/RepoPageStore/repoPageStore";
import RecommendStore, { Repository } from "@/store/RecommendStore/recommendstore";
import useModalStore from "@/store/ModalStore/ModalStore";
import ReactModal from "react-modal";
import userAxiosWithAuth from "@/utils/useAxiosWIthAuth";
import headerStore from "@/store/CodePageStore/headerStore";

const Recommend = () => {
  const { mode } = headerStore();
  const { repositories } = RecommendStore();
  const { isRecommendModalOpen, toggleRecommendedModal } = useModalStore();
  const [inputValue, setInputValue] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);

  const handleRepoClick = (repoKey: string) => {
    const repoInfo = repositories[repoKey];
    setSelectedRepo(repoInfo);
    toggleRecommendedModal();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const isEmpty = Object.keys(repositories).length === 0;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 비동기 요청을 통해 새 저장소 생성
    const data = {
      name: inputValue, // 사용자가 입력한 타이틀
    };

    try {
      const response = await userAxiosWithAuth.post(`/api/repos/template`, data);
      console.log("프로그래밍 랭귀지:", response.data);

      RepoPageStore.getState().setRepositories({
        ...RepoPageStore.getState().repositories, // 기존 저장소 유지
        [response.data.data.id]: {
          // 새로운 저장소 추가
          name: response.data.data.name,
          id: response.data.data.id,
          createdAt: response.data.data.createdAt,
          modifiedAt: response.data.data.modifiedAt,
          url: `/codePage/${response.data.data.id}`,
          image: `/svg/${response.data.data.programmingLanguage.toLowerCase()}.svg`,
          programmingLanguage: response.data.data.programmingLanguage,
        },
      });

      toggleRecommendedModal(); // 모달 닫기
      setInputValue(""); // 입력 필드 초기화
      setSelectedRepo(null); //선택된 레포정보 초기화
    } catch (error) {
      console.error("Error creating new repository:", error);
    }
    setInputValue("");
  };
  return (
    <div>
      <div className={styles.recommendcontainer}>
        {isEmpty ? (
          <></>
        ) : (
          Object.entries(repositories).map(([key, repo]) => (
            <div
              key={key}
              className={`${mode ? styles.repo_wrapperSun : styles.repo_wrapperNight}`}
            >
              <div key={key} className={styles.repocontainer} onClick={() => handleRepoClick(key)}>
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
              </div>
            </div>
          ))
        )}
      </div>
      <ReactModal
        isOpen={isRecommendModalOpen}
        onRequestClose={toggleRecommendedModal}
        contentLabel="Create Recommend Repository"
        className={styles.createRecommendModal}
        overlayClassName={styles.createRecommendOverlay}
      >
        <form onSubmit={handleSubmit} className={styles.MenuWrapper}>
          <div className={styles.titleAndCloseContainer}>
            <h2>Create New Repository🚀</h2>
            <button type="button" className={styles.closeButton} onClick={toggleRecommendedModal}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className={styles.selectedRepoContainer}>
            <img src={selectedRepo?.image} />
            <h3>{selectedRepo?.name}</h3>
            <p>{selectedRepo?.description}</p>
          </div>
          <div className={styles.submitAndButtonContainer}>
            <div className={styles.submitContainer}>
              <input
                type="text"
                placeholder="Enter your title..."
                value={inputValue}
                onChange={handleChange}
                className={styles.titleinput}
                required
              />
            </div>
            <button type="submit">Create🚀</button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
};

export default Recommend;
