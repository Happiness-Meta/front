import styles from "./editorSpace.module.css";
import { Resizable } from "re-resizable";
import sidebarStore from "@/store/CodePageStore/sidebarStore";
import editorStore from "@/store/CodePageStore/editorStore";
import ChatSpace from "@/pages/CodePage/CodePageComponents/chatSpace/ChatSpace";
import WelcomeText from "./editorSpaceComponents/WelcomeText";
import MonacoEditor from "./editorSpaceComponents/MonacoEditor";
import FilesTabSpace from "./editorSpaceComponents/FilesTabSpace";
import FilePathSpace from "./editorSpaceComponents/FilePathSpace";
import TerminalSpace from "./editorSpaceComponents/TerminalSpace";

function EditorSpace() {
  const { sidebar } = sidebarStore();
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
        defaultSize={{ width: "70%", height: "100%" }}
        enable={{ top: false, bottom: false, right: true, left: false }}
        handleClasses={{ right: "resizeHandle2" }}
      >
        <FilesTabSpace />
        <FilePathSpace />
        <div className={styles.editorAndTerminal}>
          <Resizable
            defaultSize={{ width: "100%", height: "calc(100% - 56px)" }}
            className={`${terminal ? styles.withTerminal : undefined} ${
              styles.editorWrapper
            }`}
            enable={{ top: false, bottom: true, right: false, left: false }}
            handleClasses={{ bottom: "resizeHandle3" }}
          >
            {tabs.length === 0 ? <WelcomeText /> : <MonacoEditor />}
          </Resizable>
          <TerminalSpace />
        </div>
      </Resizable>
      <ChatSpace />
    </div>
  );
}

export default EditorSpace;
