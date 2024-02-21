import styles from "./homePage.module.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function HomePage() {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["email", "nickname", "token"]);

  const createStars = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className={styles.star}
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 3 + 3}s`,
        }}
      ></div>
    ));
  };

  const removeCookies = () => {
    removeCookie("email");
    removeCookie("nickname");
    removeCookie("token");
  };

  return (
    <div className={styles.backSky}>
      {createStars(200)}
      <div className={styles.homePageContainer}>
        {cookies.token ? (
          <header className={styles.homepageHeader}>
            <div
              className={styles.startBtn}
              onClick={() => navigate("/dashboard")}
            >
              Get started
            </div>
            <div className={styles.signBtn} onClick={() => removeCookies()}>
              Log out
            </div>
          </header>
        ) : (
          <header className={styles.homepageHeader}>
            {/* <div
              className={styles.guestBtn}
              onClick={() => navigate("/TemplatePage")}
            >
              Guest
            </div> */}
            <div
              className={styles.signBtn}
              onClick={() => navigate("/SignInUpPage")}
            >
              SIGN IN
            </div>
          </header>
        )}

        <div className={styles.textSpace}>
          <span className={styles.title}>Earth-IDE-N</span>
          <div className={styles.subTitleSpace}>
            <span className={styles.subTitle}>지구상 어디든 접근하는</span>
            <span className={styles.subTitle}>웹 IDE의 새로운 모습</span>
          </div>
        </div>

        <img
          src="https://blog.kakaocdn.net/dn/2sdHV/btsEdHtN2Px/V0a6TqK2tXooCXhLKKDMk0/img.png"
          className={styles.homePage_image}
        />

        <div className={styles.introducingBox}>
          <div className={styles.boxes}>
            <span className={styles.boxTitle}>START-PACK</span>
            <span className={styles.boxSubTitle}>
              초보 우주 비행사를 위한 길잡이
            </span>
          </div>
          <div className={styles.boxes}>
            <span className={styles.boxTitle}>CHATTING</span>
            <span className={styles.boxSubTitle}>텍스트 채팅 기능</span>
          </div>
          <div className={styles.boxes}>
            <span className={styles.boxTitle}>CHANCE</span>
            <span className={styles.boxSubTitle}>성장할 수 있는 기회</span>
          </div>
          <div className={styles.boxes}>
            <span className={styles.boxTitle}>LAUNCH</span>
            <span className={styles.boxSubTitle}>떠날 준비가 됐나요?</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
