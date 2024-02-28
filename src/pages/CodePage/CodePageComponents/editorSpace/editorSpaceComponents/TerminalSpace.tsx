import editorStore from "@/store/CodePageStore/editorStore";
import styles from "../editorSpace.module.css";

const TerminalSpace = () => {
  const { terminal, terminalContent, clearTerminal } = editorStore();
  return (
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
  );
};

export default TerminalSpace;
