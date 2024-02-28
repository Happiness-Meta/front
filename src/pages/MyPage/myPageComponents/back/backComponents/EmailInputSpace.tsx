import { useCookies } from "react-cookie";
import styles from "../back.module.css";

const EmailInputSpace = () => {
  const [cookies] = useCookies(["email", "nickname", "token"]);

  return (
    <div className={styles.formEachSpace}>
      <i className={`${styles.inputIcon} material-symbols-outlined`}>person</i>
      <input
        disabled
        type="text"
        name="ID"
        className={styles.IDinput}
        defaultValue={cookies.email}
      />
    </div>
  );
};

export default EmailInputSpace;
