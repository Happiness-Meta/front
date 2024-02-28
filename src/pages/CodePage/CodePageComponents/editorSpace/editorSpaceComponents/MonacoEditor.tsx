import { Editor } from "@monaco-editor/react";
import styles from "../editorSpace.module.css";
import globalStore from "@/store/globalStore/globalStore";
import sidebarStore from "@/store/CodePageStore/sidebarStore";
import editorStore from "@/store/CodePageStore/editorStore";

const MonacoEditor = () => {
  const { codeFontSize } = sidebarStore();
  const { mode } = globalStore();
  const {
    setContent,
    nodeContent,

    language,
  } = editorStore();

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
  );
};

export default MonacoEditor;
