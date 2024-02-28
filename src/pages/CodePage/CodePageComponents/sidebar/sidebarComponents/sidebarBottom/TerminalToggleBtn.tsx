import styles from "@/pages/CodePage/CodePageComponents/sidebar/sidebar.module.css";
import editorStore from "@/store/CodePageStore/editorStore";

const TerminalToggleBtn = () => {
  const { terminal, toggleTerminal } = editorStore();
  return (
    <i
      className={`${styles.bottomIcons2} material-symbols-outlined`}
      style={terminal ? { opacity: 0.5 } : undefined}
      onClick={toggleTerminal}
    >
      terminal
    </i>
  );
};

export default TerminalToggleBtn;
