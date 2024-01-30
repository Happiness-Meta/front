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
          height="90vh"
          defaultLanguage="javascript"
          defaultValue="// let's write some broken code 😈"
          // onValidate={handleEditorValidation}
        />
      </div>
      <div className={styles.rightSpace}>
        <Editor defaultLanguage="javascript" />
      </div>
    </div>
  );
}

export default EditorSpace;
