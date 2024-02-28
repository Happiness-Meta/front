import styles from "./myPage.module.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPageHeader from "./header/MyPageHeader";
import Front from "./front/Front";
import Back from "./back/Back";

function MyPage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["email", "nickname", "token"]);

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!cookies.token) {
      navigate("/");
    }
  }, [cookies.token, navigate]);

  return (
    <div className={styles.myPage}>
      <MyPageHeader />
      <div className={styles.myPage_body}>
        <div className={styles.wrap}>
          <main
            className={styles.card}
            style={isClicked ? { transform: "rotateY(180deg)" } : undefined}
          >
            <Front />
            <Back setIsClicked={setIsClicked} />
          </main>
        </div>
        <button
          className={styles.flipBtn}
          onClick={() => setIsClicked(!isClicked)}
          style={isClicked ? { width: "50px" } : { width: "100px" }}
        >
          {isClicked ? `FLIP` : `회원정보 변경`}
        </button>
      </div>
    </div>
  );
}

export default MyPage;
