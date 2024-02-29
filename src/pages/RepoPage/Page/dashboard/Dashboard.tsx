import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import ReactModal from "react-modal";
import RepoPage from "../../RepoPage";
import DropdownBtn from "@/pages/RepoPage/Component/Dropdown/DropdownBtn";
import RepoPageStore, { Repository } from "@/store/RepoPageStore/repoPageStore";
import useModalStore from "@/store/ModalStore/ModalStore";
import renderLanguageDescription from "../../Component/Dropdown/SelectedLanguageDescription";
import userAxiosWithAuth from "@/utils/useAxiosWIthAuth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import EmptyRepositories from "./isEmpty/EmptyRepositories";
import FillRepositories from "./isEmpty/fillRepositories";

const Dashboard = () => {
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
          programmingLanguage: response.data.data.programmingLanguage,
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

  const handleSelectTemplate = (key: string) => {
    setSelectedLanguage(key);
    setSelectedTemplateKey(key); // 선택된 템플릿의 key 상태 업데이트
  };

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await userAxiosWithAuth.get(`/api/repos/all`);

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
      {isEmpty ? <EmptyRepositories /> : <FillRepositories />}
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
