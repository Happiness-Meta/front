import { useCookies } from "react-cookie";
import styles from "./front.module.css";

const Front = () => {
  const [cookies] = useCookies(["email", "nickname", "token"]);

  return (
    <div className={styles.front}>
      <span className={styles.member}>Astronaut</span>
      <div className={styles.IDcard_inner}>
        <div className={styles.formEachSpace}>
          <span className={styles.nickname}>{cookies.nickname}</span>
        </div>

        <div className={styles.formEachSpace}>
          <span className={styles.id}>{cookies.email}</span>
        </div>

        <figure className={styles.picture}>
          <i className={`${styles.person} material-icons`}>person</i>
        </figure>
      </div>
      <span className={styles.projectName}>EARTH-IDE-N</span>
    </div>
  );
};

export default Front;
