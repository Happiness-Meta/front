// import { Link } from "react-router-dom";
import headerStore from "../../store/CodePageStore/headerStore";
import LoginPageStore from "../../store/LoginPageStore/LoginPageStore";
import ModeToggleBtn from "../CodePage/CodePageComponents/header/modeToggleBtn/modeToggleBtn";
import styles from "./loginPage.module.css";

function LoginPage() {
  const { inUp, inUpToggle } = LoginPageStore();
  const { mode } = headerStore();

  return (
    <div className={styles.LoginPage_body}>
      <div className={styles.modeToggleBtn}>
        <ModeToggleBtn />
      </div>

      <div className={styles.guideSpace}>
        <div className={styles.guideText}>
          {inUp ? "Sign up to Earth-IDEN" : "Sign in to Earth-IDEN"}
        </div>
      </div>

      <div className={styles.signInUpSpace}>
        <div
          className={`${inUp ? styles.inUpToggle : undefined}  ${
            styles.sliderFrame
          }`}
        ></div>
        <div className={styles.signInSection}>
          <div className={styles.signInText}>Sign In</div>
          <form className={styles.inputSpace}>
            <input
              type="text"
              className={styles.idInput}
              placeholder="username"
            />
            <input
              type="password"
              className={styles.pwInput}
              placeholder="password"
            />
            <button className={styles.signInBtn}>Sign In</button>
          </form>
          <div className={styles.signInBottom}>
            <div className={styles.bottomText}>Don't you have an account?</div>
            <div className={styles.goToSignUpBtn} onClick={inUpToggle}>
              Sign Up
            </div>
          </div>
        </div>

        <div className={styles.signUpSection}>
          <div className={styles.signInText}>Sign Up</div>
          <form className={styles.inputSpace}>
            <input
              type="text"
              className={styles.idInput}
              placeholder="Make your username"
            />
            <input
              type="password"
              className={styles.pwInput}
              placeholder="Make your password"
            />
            <button className={styles.signInBtn}>Sign Up</button>
          </form>
          <div className={styles.signInBottom}>
            <div className={styles.bottomText}>Let's go for sign in</div>
            <div className={styles.goToSignUpBtn} onClick={inUpToggle}>
              Sign In
            </div>
          </div>
        </div>
      </div>
      <div className={styles.oauthSpace}>
        <div className={styles.oauthContainers}>
          <img src="/oauthSvg/kakao.svg" className={styles.oauthSymbols} />
          <div className={styles.oauthTextK}>Login with Kakao</div>
        </div>
        <div className={styles.oauthContainers}>
          <img
            src={mode ? "/oauthSvg/githubB.svg" : "/oauthSvg/github.svg"}
            className={styles.oauthSymbols}
          />
          <div className={styles.oauthText}>Login with GitHub</div>
        </div>
        <div className={styles.oauthContainers}>
          <img src="/oauthSvg/google.svg" className={styles.oauthSymbols} />
          <div className={styles.oauthText}>Login with Google</div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
