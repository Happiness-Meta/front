import React from "react";
import styles from "./editorSpace.module.css";
import sidebarStore from "../../../../store/CodePageStore/sidebarStore";
import Editor from "@monaco-editor/react";
import headerStore from "../../../../store/CodePageStore/headerStore";
import { Resizable } from "re-resizable";

function EditorSpace() {
  const { sidebar, codeFontSize } = sidebarStore();
  const { mode } = headerStore();

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
        <div className={styles.filesMenuSpace}></div>
        <div className={styles.filePathSpace}></div>
        <Editor
          height="calc(100% - 60px)"
          width="100%"
          theme={mode ? "vs-light" : "vs-dark"}
          defaultLanguage="html"
          defaultValue="// paint your own world! 🌎"
          options={{
            selectOnLineNumbers: true,
            fontSize: codeFontSize,
          }}
        />
      </Resizable>
      <div className={styles.rightSpace}>
        <div className={styles.filesMenuSpace}></div>
        <div className={styles.filePathSpace}></div>
        <Editor
          height="calc(100% - 60px)"
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
