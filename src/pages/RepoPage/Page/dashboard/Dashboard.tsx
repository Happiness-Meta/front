import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import RepoPage from "../../RepoPage";
import Recommend from "../../Component/recommend/Recommend";
import RepoComponent from "../../Component/Repositories/RepoComponent";
import RepoPageStore, { Repository } from "../../../../store/RepoPageStore/repoPageStore";
import ReactModal from "react-modal";
import useModalStore from "../../../../store/ModalStore/ModalStore";
import DropdownBtn from "../../Component/Dropdown/DropdownBtn";
import renderLanguageDescription from "../../Component/Dropdown/SelectedLanguageDescription";
import userAxiosWithAuth from "../../../../utils/useAxiosWIthAuth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const { isModalOpen, toggleCreateModal } = useModalStore();
  const { deleteRepository } = RepoPageStore();
  const [repositoryArray, setRepositoryArray] = useState<Repository[]>([]);
  const [isDropdownView, setDropdownView] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("language");
  const [cookies] = useCookies(["token", "nickname"]);
  const [myRepositories, setMyRepositories] = useState<Repository[]>([]);
  const [sharedRepositories, setSharedRepositories] = useState<Repository[]>([]);
  const navigate = useNavigate();

  // 처음 렌더링 될 때 레포지토리만 불러오기
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await userAxiosWithAuth.get(`/api/repos/all`);
        const fetchedRepositories = response.data.data;
        setRepositoryArray(fetchedRepositories);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepositories();
  }, []);

  // 내 레포지토리 요소들 상태 넣어주기
  useEffect(() => {
    const myRepos = repositoryArray.filter(
      (repo) => repo.creatorNickname?.creator === cookies.nickname
    );
    setMyRepositories(myRepos);
  }, [repositoryArray, cookies.nickname]);

  // 공유된 레포지토리 요소들 상태 넣어주기
  useEffect(() => {
    const sharedRepos = repositoryArray.filter(
      (repo) => repo.creatorNickname.creator !== cookies.nickname
    );
    setSharedRepositories(sharedRepos);
  }, [repositoryArray]);

  console.log("myrepo:", myRepositories);
  console.log("sharedrepo:", sharedRepositories);
  console.log("repositoryArray:", repositoryArray);

  // 쿠키가 없으면 튕겨져 나감
  useEffect(() => {
    if (!cookies.token) {
      navigate("/");
    }
  }, [cookies.token, cookies]);

  //레포지토리 지우는 props를 내려주는 함수.
  const onDeleteRepository = (repoId: string) => {
    console.log("onDeleteRepository called with ID:", repoId);
    const updatedRepositories = repositoryArray.filter((repo) => repo.id !== repoId);
    console.log("Updated repositories:", updatedRepositories); // 업데이트된 배열 로깅
    setRepositoryArray(updatedRepositories);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  // 레포지토리 정보 설정 후 생성 버튼 클릭 시 실행 되는 이벤트 리스터 함수
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
      console.log("response.data.data:", response.data.data);
      // 저장소 생성

      const newRepo = response.data.data;

      // 새로운 레포지토리를 myRepositories에 추가
      setMyRepositories((prevMyRepos) => [...prevMyRepos, newRepo]);

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

  const handleSelectTemplate = (key: string) => {
    setSelectedLanguage(key);
    setSelectedTemplateKey(key); // 선택된 템플릿의 key 상태 업데이트
  };

  return (
    <RepoPage>
      {repositoryArray.length === 0 ? (
        <div className={styles.dashboardContainer}>
          <div className={styles.repositoriescontainer_empty}>
            <h1>Home</h1>
            <p>New on Happiness Meta</p>
            <div className={styles.imgContainer}>
              <div className={styles.imgcontext}>
                <a
                  href="https://www.notion.so/aaef50c8b3524ae9a29cf6449e744897?pvs=4"
                  target="_blank"
                >
                  <div className={styles.p_box}>
                    <h3>Notion</h3>
                    <p>Jan 05. 2024</p>
                  </div>
                  <img src="https://blog.kakaocdn.net/dn/b096ff/btsEnS31kpu/JWqbMNxuxz4rJL5h8nMsVk/img.jpg"></img>
                  <div className={styles.textContainer}>
                    This is the notice page of Happiness meta. We usually record, organize, and plan
                    our studies here.
                  </div>
                </a>
              </div>
              <div className={styles.imgcontext}>
                <a
                  href="https://jaeseon-yang-tree.notion.site/jaeseon-yang-tree/06e2f2d35dd741b1b136f1d0f43487a5"
                  target="_blank"
                >
                  <div className={styles.p_box}>
                    <h3>Personalization</h3>
                    <p>Jan 05. 2024</p>
                  </div>
                  <img src="https://blog.kakaocdn.net/dn/cd7E76/btsEttWjzlw/vgy6gbezenkYhcMqXPh1nK/img.jpg"></img>

                  <div className={styles.textContainer}>
                    Click to go to Yang Jae-sun's personal production page.
                  </div>
                </a>
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
        <div className={styles.dashboardContainer}>
          <div>
            <button onClick={toggleCreateModal} className={styles.newrepobutton2}>
              CREATE REPOSITORY
            </button>
          </div>
          <div className={styles.repositoriescontainer}>
            <div className={styles.recommendcontainer_fill}>
              <h2>Recommendation</h2>
            </div>
            <div className={styles.recommend_fill}>
              <Recommend />
            </div>
            <div className={styles.repositories_fill}>
              <h2>My Repositories</h2>
              <RepoComponent
                AllandSharedrepositories={myRepositories}
                onDeleteRepository={onDeleteRepository}
              />
            </div>
            <div className={styles.sharingRepo_fill}>
              <h2>Shared Repositories</h2>
              <RepoComponent
                AllandSharedrepositories={sharedRepositories}
                onDeleteRepository={onDeleteRepository}
              />
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
