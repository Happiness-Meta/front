import styles from "./editorSpace.module.css";
import sidebarStore from "../../../../store/CodePageStore/sidebarStore";
import Editor from "@monaco-editor/react";
import { Resizable } from "re-resizable";
import globalStore from "../../../../store/globalStore/globalStore";
import editorStore from "../../../../store/CodePageStore/editorStore";
import RightSpace from "./rightSpace/RightSpace";
// import * as Y from "yjs";
// import { WebrtcProvider } from "y-webrtc";
// import { MonacoBinding } from "y-monaco";

function EditorSpace() {
  const { sidebar, codeFontSize } = sidebarStore();
  const { mode } = globalStore();
  const { tabs, rightSpace, terminal } = editorStore();

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
        defaultSize={{ width: "50%", height: "100%" }}
        enable={{ top: false, bottom: false, right: true, left: false }}
        handleClasses={{ right: "resizeHandle2" }}
      >
        <div className={styles.filesTabSpace}>
          {tabs.map((tab) => (
            <div
              className={styles.tab}
              style={
                mode
                  ? { backgroundColor: "white" }
                  : { backgroundColor: "#1e1e1e" }
              }
            >
              <button className={styles.tabEach}>
                <img src="/svg/html.svg" className={styles.tabIcon} />
                <span className={styles.tabName}>{tab.title}</span>
              </button>
              <button
                className={`${styles.tabRemove} material-symbols-outlined`}
              >
                close
              </button>
            </div>
          ))}
        </div>
        <div
          className={styles.filePathSpace}
          style={
            mode ? { backgroundColor: "white" } : { backgroundColor: "#1e1e1e" }
          }
        ></div>
        <div className={styles.editorAndTerminal}>
          <Resizable
            defaultSize={{ width: "100%", height: "calc(100% - 56px)" }}
            className={`${terminal ? styles.withTerminal : undefined} ${
              styles.editorWrapper
            }`}
            enable={{ top: false, bottom: true, right: false, left: false }}
            handleClasses={{ top: "resizeHandle3" }}
          >
            <Editor
              width="100%"
              height="100%"
              theme={mode ? "vs-light" : "vs-dark"}
              defaultLanguage="javascript"
              defaultValue="// paint your own world! 🌎"
              options={{
                selectOnLineNumbers: true,
                fontSize: codeFontSize,
              }}
            />
          </Resizable>
          <div
            className={`${terminal ? styles.terminalOn : undefined} ${
              styles.terminalSpace
            }`}
          >
            <div className={styles.terminal_header}>터미널</div>
          </div>
        </div>
      </Resizable>
      <RightSpace />
    </div>
  );
}

export default EditorSpace;
