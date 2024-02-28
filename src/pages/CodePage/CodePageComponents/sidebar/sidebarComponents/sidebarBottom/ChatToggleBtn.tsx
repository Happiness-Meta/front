import styles from "@/pages/CodePage/CodePageComponents/sidebar/sidebar.module.css";
import editorStore from "@/store/CodePageStore/editorStore";

const ChatToggleBtn = () => {
  const { rightSpace, toggleRightSpace } = editorStore();
  return (
    <i
      className={`${styles.bottomIcons1} material-symbols-outlined`}
      style={rightSpace ? { opacity: 0.5 } : undefined}
      onClick={toggleRightSpace}
    >
      forum
    </i>
  );
};

export default ChatToggleBtn;
