import { useCookies } from "react-cookie";
import styles from "../back.module.css";
import { NicknameInputSpaceProps } from "@/types/ComponentsProps";

const NicknameInputSpace: React.FC<NicknameInputSpaceProps> = ({
  nicknameRef,
}) => {
  const [cookies] = useCookies(["email", "nickname", "token"]);

  return (
    <div className={styles.formEachSpace}>
      <i className={`${styles.inputIcon} material-symbols-outlined`}>
        account_circle
      </i>
      <input
        ref={nicknameRef}
        type="text"
        name="nickname"
        className={styles.input}
        defaultValue={cookies.nickname}
      />
    </div>
  );
};

export default NicknameInputSpace;
