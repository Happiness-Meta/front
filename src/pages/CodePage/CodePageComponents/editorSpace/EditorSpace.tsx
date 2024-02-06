import styles from "./editorSpace.module.css";
import sidebarStore from "../../../../store/CodePageStore/sidebarStore";
import Editor from "@monaco-editor/react";
import { Resizable } from "re-resizable";
import globalStore from "../../../../store/globalStore/globalStore";
import editorStore from "../../../../store/CodePageStore/editorStore";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";

function EditorSpace() {
  const { sidebar, codeFontSize } = sidebarStore();
  const { mode } = globalStore();
  const { tabs } = editorStore();

  // const ydocHtml = new Y.Doc();
  // const providerHtml = new WebrtcProvider("html", ydocHtml);
  // const typeHtml = ydocHtml.getText("monaco");
  // const bindingHtml = new MonacoBinding(
  //   typeHtml,
  //   editorRefHtml.current.getModel(),
  //   providerHtml.awareness
  // );

  // const ydocJs = new Y.Doc();
  // const providerJs = new WebrtcProvider("javascript", ydocJs);
  // const typeJs = ydocJs.getText("monaco");
  // const bindingJs = new MonacoBinding(
  //   typeJs,
  //   editorRefJs.current.getModel(),
  //   providerJs.awareness
  // );

  // providerHtml.awareness.setLocalStateField("user", {
  //   name: "YourUsername",
  // });

  // providerJs.awareness.setLocalStateField("user", {
  //   name: "YourUsername",
  // });

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
        <Editor
          height="calc(100% - 56px)"
          width="100%"
          theme={mode ? "vs-light" : "vs-dark"}
          defaultLanguage="html"
          defaultValue="<!-- paint your own world! 🌎 -->"
          options={{
            selectOnLineNumbers: true,
            fontSize: codeFontSize,
            // model: bindingHtml.awareness,
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
          height="calc(100% - 56px)"
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
