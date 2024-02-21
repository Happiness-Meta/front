import React, { useEffect, useState } from "react";
import styles from "./Repositories.module.css";
import RepoPage from "../../RepoPage";
import Recommend from "../../Component/recommend/Recommend";
import Recent from "../../Component/Recent/Recent";
import RepoPageStore from "../../../../store/RepoPageStore/repoPageStore";
import ReactModal from "react-modal";
import useModalStore from "../../../../store/ModalStore/ModalStore";
import DropdownBtn from "../../Component/Dropdown/DropdownBtn";
import renderLanguageDescription from "../../Component/Dropdown/SelectedLanguageDescription";
import Repositories from "../../Component/Repositories/RepoComponent";
import userAxiosWithAuth from "../../../../utils/useAxiosWIthAuth";

const RepositoriesPage = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const { isModalOpen, toggleCreateModal } = useModalStore();
  const { repositories } = RepoPageStore();
  const isEmpty = Object.keys(repositories).length === 0;
  const [isDropdownView, setDropdownView] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("language");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedTemplateKey) {
      alert("프로그래밍 언어를 선택해주세요.");
      return;
    }
    // 비동기 요청을 통해 새 저장소 생성
    const data = {
      name: inputValue, // 사용자가 입력한 타이틀
      programmingLanguage: selectedTemplateKey, // 선택된 템플릿의 key
    };

    try {
      const response = await userAxiosWithAuth.post(`api/repos`, data);
      console.log(response.data);
      // 저장소 생성 후 필요한 상태 업데이트나 UI 반응
      toggleCreateModal(); // 모달 닫기
      setInputValue(""); // 입력 필드 초기화
    } catch (error) {
      console.error("Error creating new repository:", error);
    }
    setInputValue("");
  };

  const handleClickContainer = () => {
    setDropdownView(!isDropdownView);
  };

  const handleBlurContainer = () => {
    setTimeout(() => {
      setDropdownView(false);
    }, 200);
  };
  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const handleSelectTemplate = (key: string) => {
    setSelectedLanguage(key);
    setSelectedTemplateKey(key); // 선택된 템플릿의 key 상태 업데이트
  };

  return (
    <RepoPage>
      <div className={`${isAnimated ? styles.fadeIn : styles.dashboardContainer}`}>
        <div>
          <button onClick={toggleCreateModal} className={styles.newrepobutton2}>
            CREATE REPOSITORY
          </button>
        </div>
        {/* <div className={`${styles.recentContaier}`}>
            <div className={styles.recommendcontainer_fill}>
              <h2>Recent</h2>
              <Recent />
            </div>
          </div> */}
        <div className={styles.repositoriescontainer}>
          <div className={styles.recommendcontainer_fill}>
            <h2>Recommend</h2>
          </div>
          <div className={styles.recommend_fill}>
            <Recommend />
          </div>
          <h2>All</h2>
          <Repositories />
        </div>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={toggleCreateModal}
        contentLabel="Create New Repository"
        className={styles.createRepoModal}
        overlayClassName={styles.createRepoOverlay}
      >
        <form onSubmit={handleSubmit} className={styles.MenuWrapper}>
          <div className={styles.titleAndCloseContainer}>
            <h2>Create New Repository🚀</h2>
            <button type="button" className={styles.closeButton} onClick={toggleCreateModal}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className={styles.DropdownAndsubmitWrapper}>
            <div className={styles.DropdownMenucontainer} onBlur={handleBlurContainer}>
              <button type="button" onClick={handleClickContainer}>
                <p>{selectedLanguage}</p>
                {isDropdownView ? (
                  <span className="material-symbols-outlined">expand_less</span>
                ) : (
                  <span className="material-symbols-outlined">expand_more</span>
                )}
              </button>
              {isDropdownView && (
                <DropdownBtn
                  onSelectTemplate={handleSelectTemplate}
                  isDropdownView={isDropdownView}
                />
              )}
              <div className={styles.explainContainer}>
                {renderLanguageDescription(selectedLanguage)}
              </div>
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
          </div>
        </form>
      </ReactModal>
    </RepoPage>
  );
};
export default RepositoriesPage;
