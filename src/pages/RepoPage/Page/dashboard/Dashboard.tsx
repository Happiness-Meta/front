import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import RepoPage from "../../RepoPage";
import Recommend from "../../Component/recommend/Recommend";
import Repositories from "../../Component/Repositories/RepoComponent";
import Recent from "../../Component/Recent/Recent";
import RepoPageStore from "../../../../store/RepoPageStore/repoPageStore";
import ReactModal from "react-modal";
import useModalStore from "../../../../store/ModalStore/ModalStore";
import DropdownBtn from "../../Component/Dropdown/DropdownBtn";
import templateDescriptionStore from "../../../../store/TemplateDescriptionStore/templateDescriptionStore";
import axios from "axios";
import renderLanguageDescription from "../../Component/Dropdown/SelectedLanguageDescription";

const Dashboard = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const { isModalOpen, toggleCreateModal } = useModalStore();
  const { repositories } = RepoPageStore();
  const isEmpty = Object.keys(repositories).length === 0;
  const [isDropdownView, setDropdownView] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string | null>(null);
  const templates = templateDescriptionStore((state) => state.template);
  const [selectedLanguage, setSelectedLanguage] = useState("Language");

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
    setSelectedLanguage(key);
    setSelectedTemplateKey(key); // 선택된 템플릿의 key 상태 업데이트
  };

  const handleCreateNewrepo = async () => {
    const data = {
      name: inputValue, // 사용자가 입력한 타이틀
      // userEmail : userEmail: 로그인하면서 userEmail이 보내지는데 그걸 어떻게 캐치해서 여기에 저장하는지
      programmingLanguage: selectedTemplateKey, // 선택된 템플릿의 key
    };
    try {
      const response = await axios.post(`https://localhost:8080/api/repos`, data);
      console.log(response.data);
    } catch (error) {
      console.log("Error creating new repository:", error);
    }
    setInputValue("");
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
        <div className={styles.MenuWrapper}>
          <div className={styles.titleAndCloseContainer}>
            <h2>Create New Repository🚀</h2>
          </div>
          <button className={styles.closeButton} onClick={toggleCreateModal}>
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className={styles.DropdownAndsubmitWrapper}>
            <div className={styles.DropdownMenucontainer} onBlur={handleBlurContainer}>
              <button onClick={handleClickContainer}>
                {selectedLanguage}
                {isDropdownView ? "▲" : "▼"}
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
                <form onSubmit={handleSubmit}>
                  Title
                  <input
                    type="text"
                    placeholder="Enter your title..."
                    value={inputValue}
                    onChange={handleChange}
                  />
                </form>
              </div>

              <button onClick={handleCreateNewrepo}> Create New Repository</button>
            </div>
          </div>
        </div>
      </ReactModal>
    </RepoPage>
  );
};

export default Dashboard;
