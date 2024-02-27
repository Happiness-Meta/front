import styles from "./editorSpace.module.css";
import Editor from "@monaco-editor/react";
import TypeIt from "typeit-react";
import { Resizable } from "re-resizable";
import sidebarStore from "@/store/CodePageStore/sidebarStore";
import editorStore from "@/store/CodePageStore/editorStore";
import globalStore from "@/store/globalStore/globalStore";
import FileTreeStore from "@/store/FileTreeStore/FileTreeStore";
import SetFileTreeIcon from "@/globalComponents/SetFileTreeIcon";
import ChatSpace from "@/pages/CodePage/CodePageComponents/chatSpace/ChatSpace";

function EditorSpace() {
  const { sidebar, codeFontSize } = sidebarStore();
  const { terminalContent, clearTerminal } = editorStore();
  const { mode } = globalStore();
  const { setSelectedNode } = FileTreeStore();
  const {
    tabs,
    deleteTab,
    showContent,
    setContent,
    nodeContent,
    filePath,
    language,
    rightSpace,
    terminal,
  } = editorStore();

  const textStyle = {
    backgroundImage: "linear-gradient(to right, pink, skyblue)",
    WebkitBackgroundClip: "text", // 텍스트 색깔을 그라데이션에 맞추기 위한 설정
    color: "transparent", // 텍스트 자체의 색깔을 투명하게 설정
    fontSize: "20px",
    fontWeight: "bold",
  };

  const extension = language.toString().split(".").pop();
  let setLanguage = "";
  if (extension === "txt") setLanguage = "";
  if (extension === "html") setLanguage = "html";
  if (extension === "css") setLanguage = "css";
  if (extension === "js" || extension === "jsx") setLanguage = "javascript";
  if (extension === "ts" || extension === "tsx") setLanguage = "typescript";
  if (extension === "json") setLanguage = "json";
  if (extension === "md") setLanguage = "markdown";

  const getValue = (value: string | undefined) => {
    if (value === undefined) {
      return;
    }
    setContent(value);
  };

  return (
    <div
      className={`${sidebar ? styles.sidebarToggle : undefined} ${
        styles.editorSpace
      }`}
    >
      <Resizable
        className={`${rightSpace ? styles.leftWidthFull : undefined} ${
          styles.leftSpace
        }`}
        defaultSize={{ width: "70%", height: "100%" }}
        enable={{ top: false, bottom: false, right: true, left: false }}
        handleClasses={{ right: "resizeHandle2" }}
      >
        <div className={styles.filesTabSpace}>
          {tabs.map((tab) => {
            return (
              <div
                key={tab.id}
                className={styles.tab}
                style={{
                  backgroundColor: mode ? "white" : "#1e1e1e",
                  opacity: tab.id === nodeContent[0] ? "1" : undefined,
                  borderTop:
                    tab.id === nodeContent[0] ? "1px solid #068fff" : undefined,
                }}
              >
                <button
                  className={styles.tabEach}
                  onClick={() => {
                    showContent(tab);
                    setSelectedNode(tab);
                  }}
                >
                  {SetFileTreeIcon(tab.name)}
                  <span className={styles.tabName}>{tab.name}</span>
                </button>
                <button
                  className={`${styles.tabRemove} material-symbols-outlined`}
                  onClick={() => deleteTab(tab)}
                >
                  close
                </button>
              </div>
            );
          })}
        </div>

        <div
          className={styles.filePathSpace}
          style={
            mode ? { backgroundColor: "white" } : { backgroundColor: "#1e1e1e" }
          }
        >
          <span
            style={{ marginLeft: "10px", color: "#a9a9a9", fontSize: "13px" }}
          >
            {tabs.length === 0 ? null : filePath.slice(1)}
          </span>
        </div>
        <div className={styles.editorAndTerminal}>
          <Resizable
            defaultSize={{ width: "100%", height: "calc(100% - 56px)" }}
            className={`${terminal ? styles.withTerminal : undefined} ${
              styles.editorWrapper
            }`}
            enable={{ top: false, bottom: true, right: false, left: false }}
            handleClasses={{ bottom: "resizeHandle3" }}
          >
            {tabs.length === 0 ? (
              <div
                className={styles.hideCodeEditor}
                style={
                  mode
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "#1e1e1e" }
                }
              >
                <TypeIt
                  style={textStyle}
                  options={{ loop: true }}
                  getBeforeInit={(instance) => {
                    instance
                      .type(`Welcome to Earth-IDE-N`)
                      .pause(500)
                      .delete(100)
                      .type(`You can start coding with us!`)
                      .pause(500)
                      .delete(100)
                      .type(`Chat with your friends while coding!`)
                      .pause(500)
                      .delete(100)
                      .pause(200);

                    return instance;
                  }}
                />
              </div>
            ) : (
              <Editor
                width="100%"
                height="100%"
                className={styles.editor}
                theme={mode ? "vs-light" : "vs-dark"}
                language={setLanguage}
                value={nodeContent[1]}
                onChange={getValue}
                options={{
                  selectOnLineNumbers: true,
                  fontSize: codeFontSize,
                }}
              />
            )}
          </Resizable>
          <div
            className={`${terminal ? styles.terminalOn : undefined} ${
              styles.terminalSpace
            }`}
          >
            <div className={styles.console_header}>
              <div className={styles.console_header_left}>
                <i className={`material-symbols-outlined`}>terminal</i>
                <p>Console</p>
              </div>
              <div
                className={`${styles.console_clear} material-symbols-outlined`}
                onClick={() => clearTerminal()}
              >
                delete
              </div>
            </div>
            <div className={styles.consoleContent}>{terminalContent}</div>
          </div>
        </div>
      </Resizable>
      <ChatSpace />
    </div>
  );
}

export default EditorSpace;
