import { Resizable } from "re-resizable";
import styles from "./codePage.module.css";
import Header from "./CodePageComponents/header/Header";
import Sidebar from "./CodePageComponents/sidebar/Sidebar";
import EditorSpace from "./CodePageComponents/editorSpace/EditorSpace";
import sidebarStore from "../../store/CodePageStore/sidebarStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import userAxiosWithAuth from "../../utils/useAxiosWIthAuth";
import SpaceForInvite from "./CodePageComponents/spaceForInvite/SpaceForInvite";
import editorStore from "../../store/CodePageStore/editorStore";
// import LoadingPage from "../../globalComponents/loadingPage/LoadingPage";

function CodePage() {
  const { sidebar } = sidebarStore();
  const { repoId } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const { inviteSpace } = editorStore();

  useEffect(() => {
    const fetchData = async () => {
      if (!cookies.token) {
        navigate("/");
        return;
      }

      try {
        const response = await userAxiosWithAuth.get(`/api/repos/${repoId}`);
        console.log(response.data);
        // 요청 성공 후 처리할 로직을 여기에 추가합니다.
      } catch (error) {
        console.error("Error:", error);
        navigate("/");
        //패스워드 입력하라는 컴포넌트를 추가
        // 요청 실패 처리 로직을 여기에 추가합니다.
      }
    };

    fetchData();
  }, [cookies, navigate]);

  return (
    <div className={styles.codePage}>
      {/* <LoadingPage /> */}
      {inviteSpace ? <SpaceForInvite /> : undefined}
      <Header />
      <div className={styles.codePage_body}>
        <Resizable
          defaultSize={{
            width: "250",
            height: "calc(100vh - 50px)",
          }}
          enable={{ top: false, bottom: false, right: true, left: false }}
          className={`${sidebar ? styles.sidebarToggle : ""} ${
            styles.sidebarResizable
          }`}
          handleClasses={{ right: "resizeHandle1" }}
        >
          <Sidebar />
        </Resizable>
        <EditorSpace />
      </div>
    </div>
  );
}

export default CodePage;
