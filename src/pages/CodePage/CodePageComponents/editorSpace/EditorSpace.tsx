import React from "react";
import styles from "./editorSpace.module.css";
import sidebarStore from "../../../../store/CodePageStore/sidebarStore";
import Editor from "@monaco-editor/react";
import { Resizable } from "re-resizable";
import globalStore from "../../../../store/globalStore/globalStore";

function EditorSpace() {
  const { sidebar, codeFontSize } = sidebarStore();
  const { mode } = globalStore();

  return (
    <div
      className={`${sidebar ? styles.sidebarToggle : undefined} ${
        styles.editorSpace
      }`}
    >
      <Resizable
        className={styles.leftSpace}
        defaultSize={{ width: "50%", height: "100%" }}
        enable={{ top: false, bottom: false, right: true, left: false }}
        handleClasses={{ right: "resizeHandle2" }}
      >
        <div className={styles.filesTabSpace}>
          {/* 나중에 map으로 돌리기 */}
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
              <span className={styles.tabName}>index.html</span>
            </button>
            <button className={`${styles.tabRemove} material-symbols-outlined`}>
              close
            </button>
          </div>
        </div>
        <div
          className={styles.filePathSpace}
          style={
            mode ? { backgroundColor: "white" } : { backgroundColor: "#1e1e1e" }
          }
        ></div>
        <Editor
          height="calc(100% - 70px)"
          width="100%"
          theme={mode ? "vs-light" : "vs-dark"}
          defaultLanguage="html"
          defaultValue="<!-- paint your own world! 🌎 -->"
          options={{
            selectOnLineNumbers: true,
            fontSize: codeFontSize,
          }}
        />
      </Resizable>
      <div className={styles.rightSpace}>
        <div className={styles.filesTabSpace}></div>
        <div
          className={styles.filePathSpace}
          style={
            mode ? { backgroundColor: "white" } : { backgroundColor: "#1e1e1e" }
          }
        ></div>
        <Editor
          height="calc(100% - 70px)"
          width="100%"
          theme={mode ? "vs-light" : "vs-dark"}
          defaultLanguage="javascript"
          defaultValue="// paint your own world! 🌎"
          options={{
            selectOnLineNumbers: true,
            fontSize: codeFontSize,
          }}
        />
      </div>
    </div>
  );
}

export default EditorSpace;
