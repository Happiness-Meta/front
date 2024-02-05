import styles from "./loginPage.module.css";
import LoginPageStore from "../../store/LoginPageStore/LoginPageStore";
import OauthSpace from "./OauthSpace/OauthSpace";
import LoginPageHeader from "./header/LoginPageHeader";

function LoginPage() {
  const { inUp, inUpToggle, isVisible, visibleToggle } = LoginPageStore();

  return (
    <div className={styles.LoginPage_body}>
      <LoginPageHeader />

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
          <form action="" className={styles.inputSpace}>
            <div className={styles.inputEachSpace}>
              <i className={`${styles.inputIcon} material-symbols-outlined`}>
                person
              </i>
              <input
                name="id"
                type="text"
                className={styles.input}
                placeholder="ID"
              />
            </div>
            <div className={styles.inputEachSpace}>
              <i className={`${styles.inputIcon} material-symbols-outlined`}>
                lock
              </i>
              <input
                name="password"
                type={isVisible ? "text" : "password"}
                className={styles.input}
                placeholder="password"
              />
              <i
                className={`${styles.visibility} material-symbols-outlined`}
                onClick={visibleToggle}
              >
                {isVisible ? "visibility" : "visibility_off"}
              </i>
            </div>
            <button className={styles.signInUpBtn}>Sign In</button>
          </form>
          <div className={styles.signInBottom}>
            <div className={styles.bottomText}>Don't have an account?</div>
            <div className={styles.goToSignUpBtn} onClick={inUpToggle}>
              Sign Up
            </div>
          </div>
          {/* <div className={styles.signInBottom}>
            <div className={styles.bottomText}>Forgot your password?</div>
            <div className={styles.goToSignUpBtn}>Reset</div>
          </div> */}
        </div>

        <div className={styles.signUpSection}>
          <div className={styles.signInText}>Sign Up</div>
          <form action="" className={styles.inputSpace}>
            <div className={styles.inputEachSpace}>
              <i className={`${styles.inputIcon} material-symbols-outlined`}>
                account_circle
              </i>
              <input
                name="username"
                type="text"
                className={styles.input}
                placeholder="username"
              />
            </div>
            <div className={styles.inputEachSpace}>
              <i className={`${styles.inputIcon} material-symbols-outlined`}>
                person
              </i>
              <input
                name="id"
                type="text"
                className={styles.input}
                placeholder="ID"
              />
            </div>
            <div className={styles.inputEachSpace}>
              <i className={`${styles.inputIcon} material-symbols-outlined`}>
                lock
              </i>
              <input
                name="password"
                type={isVisible ? "text" : "password"}
                className={styles.input}
                placeholder="password"
              ></input>
              <i
                className={`${styles.visibility} material-symbols-outlined`}
                onClick={visibleToggle}
              >
                {isVisible ? "visibility" : "visibility_off"}
              </i>
            </div>
            <button className={styles.signInUpBtn}>Sign Up</button>
          </form>
          <div className={styles.signInBottom}>
            <div className={styles.bottomText}>Ready to sign in?</div>
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
