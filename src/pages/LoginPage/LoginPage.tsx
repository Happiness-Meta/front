// import { Link } from "react-router-dom";
import styles from "./loginPage.module.css";

function LoginPage() {
  return (
    <div className={styles.LoginPage_body}>
      <div className={styles.guideSpace}>
        <div className={styles.guideText}>Sign in to Earth-IDEN</div>
      </div>
      <div className={styles.signInUpSpace}></div>
    </div>
  );
}

export default LoginPage;
