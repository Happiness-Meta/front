import React from "react";
import styles from "./editorSpace.module.css";
import sidebarStore from "../../../../store/sidebarStore";
import Editor from "@monaco-editor/react";

function EditorSpace() {
  const { sidebar } = sidebarStore();

  // function handleEditorValidation(markers) {
  //   // model markers
  //   markers.forEach((marker) => console.log("onValidate:", marker.message));
  // }

  return (
    <div
      className={`${sidebar ? styles.sidebarToggle : undefined} ${
        styles.editorSpace
      }`}
    >
      <div className={styles.leftSpace}>
        <Editor
          height="100%"
          width="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="// let's write some broken code 😈"
          options={{
            selectOnLineNumbers: true,
            fontSize: 16, // 여기서 폰트 크기를 변경할 수 있습니다.
          }}
        />
      </div>
      <div className={styles.rightSpace}>
        <Editor
          height="100%"
          width="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="// let's write some broken code 😈"
          options={{
            selectOnLineNumbers: true,
            fontSize: 16, // 여기서 폰트 크기를 변경할 수 있습니다.
          }}
        />
      </div>
    </div>
  );
}

export default EditorSpace;
