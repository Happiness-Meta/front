import { FlipBtnProps } from "@/types/ComponentsProps";
import styles from "../myPage.module.css";

const FlipBtn: React.FC<FlipBtnProps> = ({ isClicked, setIsClicked }) => {
  return (
    <button
      className={styles.flipBtn}
      onClick={() => setIsClicked(!isClicked)}
      style={isClicked ? { width: "50px" } : { width: "100px" }}
    >
      {isClicked ? `FLIP` : `회원정보 변경`}
    </button>
  );
};

export default FlipBtn;
