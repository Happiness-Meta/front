import { Resizable } from "re-resizable";
import styles from "./codePage.module.css";
import Header from "./CodePageComponents/header/Header";
import Sidebar from "./CodePageComponents/sidebar/Sidebar";
import EditorSpace from "./CodePageComponents/editorSpace/EditorSpace";
import sidebarStore from "../../store/CodePageStore/sidebarStore";
import { useParams } from "react-router-dom";
// import LoadingPage from "../../globalComponents/loadingPage/LoadingPage";

function CodePage() {
  const { sidebar } = sidebarStore();
  let { repoId } = useParams();

  return (
    <div className={styles.codePage}>
      {/* <LoadingPage /> */}
      <Header />
      <div className={styles.codePage_body}>
        <Resizable
          defaultSize={{
            width: "250",
            height: "calc(100vh - 50px)",
          }}
          enable={{ top: false, bottom: false, right: true, left: false }}
          className={`${sidebar ? styles.sidebarToggle : ""} ${styles.sidebarResizable}`}
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
