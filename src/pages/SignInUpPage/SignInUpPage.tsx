import styles from "./signInUpPage.module.css";
import LoginPageStore from "../../store/SignInUpPageStore/SignInUpPageStore.ts";
import LoginPageHeader from "./header/LoginPageHeader.tsx";
import SignIn from "./SignInUpComponents/SignIn.tsx";
import SignUp from "./SignInUpComponents/SignUp.tsx";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInUpPage() {
  const navigate = useNavigate();
  const { inUp, welcomeMessage } = LoginPageStore();
  const [cookies] = useCookies(["token", "nickname"]);
  const [widthZero, setWidthZero] = useState(false);

  return (
    <div className={styles.LoginPage_body}>
      {cookies.token ? (
        <div className={styles.goBackPage}>
          <span>이미 로그인이 되었습니다.</span>
          <button className={styles.goBackBtn} onClick={() => navigate("/")}>
            HOME
          </button>
        </div>
      ) : undefined}
      <LoginPageHeader />
      <div className={styles.guideSpace}>
        {widthZero ? undefined : (
          <h1
            // className={`${inUp ? styles.signUpAni : styles.signInAni} ${
            //   styles.guideText
            // }`}
            className={styles.guideText}
          >
            {inUp ? "Sign up to Earth-IDE-N" : "Sign in to Earth-IDE-N"}
          </h1>
        )}
      </div>
      <main
        className={`${widthZero ? styles.widthZero : undefined} ${
          styles.signInUpSpace
        }`}
      >
        <div
          className={`${inUp ? styles.inUpToggle : undefined}  ${
            styles.sliderFrame
          }`}
          style={{
            width: widthZero ? "100%" : undefined,
            left: widthZero ? "0" : undefined,
            backdropFilter: widthZero ? "none" : undefined,
            backgroundColor: widthZero ? "black" : undefined,
          }}
        >
          {widthZero ? `환영합니다 ${cookies.nickname}님` : undefined}
          {welcomeMessage ? (
            <div className={styles.signUpMessage}>
              <span>Welcome to Join</span>
            </div>
          ) : undefined}
        </div>
        <SignIn setWidthZero={setWidthZero} />
        <SignUp />
      </main>
    </div>
  );
}

export default SignInUpPage;
