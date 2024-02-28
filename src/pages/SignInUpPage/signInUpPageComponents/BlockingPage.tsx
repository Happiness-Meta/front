import { useCookies } from "react-cookie";
import styles from "../signInUpPage.module.css";
import { useNavigate } from "react-router-dom";

const BlockingPage = () => {
  const navigate = useNavigate();

  const [cookies] = useCookies(["token", "nickname"]);

  return (
    <>
      {cookies.token ? (
        <div className={styles.goBackPage}>
          <span>이미 로그인이 되었습니다.</span>
          <button className={styles.goBackBtn} onClick={() => navigate("/")}>
            HOME
          </button>
        </div>
      ) : undefined}
    </>
  );
};

export default BlockingPage;
