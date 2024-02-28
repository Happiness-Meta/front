import styles from "@/pages/CodePage/CodePageComponents/sidebar/sidebar.module.css";
import EditorSettingBtn from "../editorSettingBtn/EditorSettingBtn";
import ChatToggleBtn from "./ChatToggleBtn";
import TerminalToggleBtn from "./TerminalToggleBtn";

const SidebarBottom = () => {
  return (
    <div className={styles.sidebarBottom}>
      <div className={styles.sidebarBottomInner}>
        <EditorSettingBtn />
        <ChatToggleBtn />
        <TerminalToggleBtn />
      </div>
    </div>
  );
};

export default SidebarBottom;
