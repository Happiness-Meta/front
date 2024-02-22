import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import RepoPage from "../../RepoPage";
import Recommend from "../../Component/recommend/Recommend";
import Repositories from "../../Component/Repositories/RepoComponent";
import RepoPageStore, { Repository } from "../../../../store/RepoPageStore/repoPageStore";
import ReactModal from "react-modal";
import useModalStore from "../../../../store/ModalStore/ModalStore";
import DropdownBtn from "../../Component/Dropdown/DropdownBtn";
import renderLanguageDescription from "../../Component/Dropdown/SelectedLanguageDescription";
import userAxiosWithAuth from "../../../../utils/useAxiosWIthAuth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const { isModalOpen, toggleCreateModal } = useModalStore();
  const { repositories } = RepoPageStore();
  const isEmpty = Object.keys(repositories).length === 0;
  const [isDropdownView, setDropdownView] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("language");
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate("/");
    }
  }, [cookies, navigate]);

  //

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
      const response = await userAxiosWithAuth.post(`/api/repos`, data);
      // console.log("프로그래밍 랭귀지:", response.data.data.programmingLanguage);
      // 저장소 생성 후 필요한 상태 업데이트나 UI 반응

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
        },
      });

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

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await userAxiosWithAuth.get(`/api/repos/all`);
        console.log("Fetched repositories:", response.data); // 변경된 접근 방식 확인

        // API 응답 구조가 { data: { data: [...] } } 형태라고 가정.
        const repositoryArray = response.data.data || []; // response.data.data가 배열이라고 가정
        const fetchedRepositories = repositoryArray.reduce(
          (acc: { [key: string]: Repository }, currentRepo: Repository) => {
            acc[currentRepo.id] = currentRepo;
            return acc;
          },
          {}
        );

        RepoPageStore.getState().setRepositories(fetchedRepositories);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepositories();
  }, []);

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
            <div className={styles.repositories_fill}>
              <h2>All</h2>
              <Repositories />
            </div>
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

export default Dashboard;
