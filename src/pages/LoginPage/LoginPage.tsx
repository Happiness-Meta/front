import styles from "./loginPage.module.css";
import { Link } from "react-router-dom";
import LoginPageStore from "../../store/LoginPageStore/LoginPageStore";
import OauthSpace from "./OauthSpace/OauthSpace";
import ModeToggleBtn from "../../globalComponents/modeToggleBtn/ModeToggleBtn";

function LoginPage() {
  const { inUp, inUpToggle } = LoginPageStore();

  return (
    <div className={styles.LoginPage_body}>
      <Link to="MyPage" style={{ position: "absolute", top: 0, left: 0 }}>
        go to 마이페이지
      </Link>
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
              className={styles.input}
              placeholder="username"
            />
            <input
              type="password"
              className={styles.input}
              placeholder="password"
            />
            <button className={styles.signInUpBtn}>Sign In</button>
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
              className={styles.input}
              placeholder="username"
            />
            <input type="text" className={styles.input} placeholder="ID" />
            <input
              type="password"
              className={styles.input}
              placeholder="password"
            />
            <button className={styles.signInUpBtn}>Sign Up</button>
          </form>
          <div className={styles.signInBottom}>
            <div className={styles.bottomText}>Let's go for sign in</div>
            <div className={styles.goToSignUpBtn} onClick={inUpToggle}>
              Sign In
            </div>
          </div>
        </div>
      </div>
      <OauthSpace />
    </div>
  );
}

export default LoginPage;
