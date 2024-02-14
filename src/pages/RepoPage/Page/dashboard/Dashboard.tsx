import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import RepoPage from "../../RepoPage";
import Recommend from "../../Component/recommend/Recommend";
import Repositories from "../../Component/Repositories/RepoComponent";
import Recent from "../../Component/Recent/Recent";
import RepoPageStore from "../../../../store/RepoPageStore/repoPageStore";
import ReactModal from "react-modal";
import useModalStore from "../../../../store/ModalStore/ModalStore";
import Dropdown from "../../Component/Dropdown/Dropdown";
import templateDescriptionStore from "../../../../store/TemplateDescriptionStore/templateDescriptionStore";
import axios from "axios";

const Dashboard = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const { isModalOpen, toggleCreateModal } = useModalStore();
  const { repositories } = RepoPageStore();
  const isEmpty = Object.keys(repositories).length === 0;
  const [isDropdownView, setDropdownView] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string | null>(null);
  const templates = templateDescriptionStore((state) => state.template);

  const handleTemplateSelection = (key: string) => {
    setSelectedTemplateKey(key);
  };
  const selectedTemplate = selectedTemplateKey ? templates[selectedTemplateKey] : null;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputValue);
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
    setSelectedTemplateKey(key); // 선택된 템플릿의 key 상태 업데이트
  };

  const handleCreateNewrepo = async () => {
    const data = {
      name: inputValue, // 사용자가 입력한 타이틀
      programmingLanguage: selectedTemplateKey, // 선택된 템플릿의 key
    };
    try {
      const response = await axios.post(`https://localhost:8080/api/repos`, data);
      console.log(response.data);
    } catch (error) {
      console.log("Error creating new repository:", error);
    }
  };

  return (
    <RepoPage>
      {isEmpty ? (
        <div className={`${isAnimated ? styles.fadeIn : styles.dashboardContainer}`}>
          <div className={styles.repositoriescontainer_empty}>
            <h1>Home</h1>
            <p>New on Happiness Meta</p>
            <div className={styles.imgContainer}>
              <div className={styles.imgcontext}>
                <div className={styles.p_box}>
                  <h3>Notion</h3>
                  <p>Jan 05. 2024</p>
                </div>
                <img src="https://blog.kakaocdn.net/dn/b096ff/btsEnS31kpu/JWqbMNxuxz4rJL5h8nMsVk/img.jpg"></img>
                <div className={styles.textContainer}>
                  This is the notice page of Happiness meta. We usually record, organize, and plan
                  our studies here.
                </div>
              </div>
              <div className={styles.imgcontext}>
                <div className={styles.p_box}>
                  <h3>Personalization</h3>
                  <p>Jan 05. 2024</p>
                </div>
                <img src="https://blog.kakaocdn.net/dn/cd7E76/btsEttWjzlw/vgy6gbezenkYhcMqXPh1nK/img.jpg"></img>

                <div className={styles.textContainer}>
                  Click to go to Yang Jae-sun's personal production page.
                </div>
              </div>
              <div className={styles.imgcontext}>
                <div className={styles.p_box}>
                  <h3>Notion</h3>
                  <p>Jan 05. 2024</p>
                </div>
                <img src="https://blog.kakaocdn.net/dn/6fWwh/btsEqwFL7Vv/IAqXIGwlpKnabANPzI7Ww1/img.jpg"></img>
                <div className={styles.textContainer}>
                  Last month, we released many new features and improvements designed to boost your
                  productivity, collaboration, and coding experience on Replit. Some of the key
                  highlights include:
                </div>
              </div>
            </div>

            <div className={styles.startbuttoncontainer}>
              <h2>It's empty now. Let's make a new repository!🚀</h2>
              <button onClick={toggleCreateModal} className={styles.newrepobutton}>
                CREATE REPOSITORY
              </button>
            </div>
          </div>
          <div className={styles.repositoriescontainer_empty_text}>
            <div className={styles.recommendcontainer}>
              <div className={styles.recommend}>
                <h2>Recommend</h2>
              </div>
              <div className={styles.recommendComponent}>
                <Recommend />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${isAnimated ? styles.fadeIn : styles.dashboardContainer}`}>
          <div>
            <button onClick={toggleCreateModal} className={styles.newrepobutton}>
              CREATE REPOSITORY
            </button>
          </div>
          <div className={`${styles.recentContaier}`}>
            <div className={styles.recommendcontainer_fill}>
              <h2>Recent</h2>
              <Recent />
            </div>
          </div>
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
      )}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={toggleCreateModal}
        contentLabel="Create New Repository"
        className={styles.createRepoModal}
        overlayClassName={styles.createRepoOverlay}
      >
        <h2>Create New Repository🚀</h2>
        <div className={styles.DropdownMenucontainer} onBlur={handleBlurContainer}>
          <button onClick={handleClickContainer}>Language{isDropdownView ? "▲" : "▼"}</button>
          {isDropdownView && (
            <Dropdown onSelectTemplate={handleSelectTemplate} isDropdownView={isDropdownView} />
          )}
          <div className={styles.explainContainer}>여기에 설명</div>
        </div>
        <div className={styles.submitContainer}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your title..."
              value={inputValue}
              onChange={handleChange}
            />
          </form>
        </div>
        <button onClick={handleCreateNewrepo}> Create New Repository</button>
        <button onClick={toggleCreateModal}>Close</button>
      </ReactModal>
    </RepoPage>
  );
};

export default Dashboard;
