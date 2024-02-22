import styles from "./myPage.module.css";
import MyPageHeader from "./header/MyPageHeader";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Front from "./front/Front";
import Back from "./back/back";

function MyPage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["email", "nickname", "token"]);
  console.log(cookies);

  const [isClicked, setIsClicked] = useState(false);

  // useEffect(() => {
  //   if (!cookies.token) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div className={styles.myPage}>
      <MyPageHeader />
      <div className={styles.myPage_body}>
        <main
          className={styles.card}
          style={isClicked ? { transform: "rotateY(180deg)" } : undefined}
        >
          <Front />
          <Back />
        </main>
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
