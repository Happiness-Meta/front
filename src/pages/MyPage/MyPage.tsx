import styles from "./myPage.module.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPageHeader from "./myPageComponents/header/MyPageHeader";
import Front from "./myPageComponents/front/Front";
import Back from "./myPageComponents/back/Back";
import FlipBtn from "./myPageComponents/FlipBtn";

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
        <FlipBtn isClicked={isClicked} setIsClicked={setIsClicked} />
      </div>
    </div>
  );
}

export default MyPage;
