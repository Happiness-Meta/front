import { Link } from "react-router-dom";
import styles from "./loginPage.module.css";

function LoginPage() {
  return (
    <div className={styles.LoginPage_body}>
      <Link to="codePage">코드페이지</Link>
    </div>
  );
}

export default LoginPage;
