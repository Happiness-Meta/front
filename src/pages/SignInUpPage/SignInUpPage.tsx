import styles from "./signInUpPage.module.css";
import LoginPageStore from "../../store/LoginPageStore/LoginPageStore.ts";
import OauthSpace from "./OauthSpace/OauthSpace.tsx";
import LoginPageHeader from "./header/LoginPageHeader.tsx";
import SignIn from "./SignInUpComponents/SignIn.tsx";
import SignUp from "./SignInUpComponents/SignUp.tsx";

function SignInUpPage() {
  const { inUp, welcomeMessage } = LoginPageStore();

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
        >
          {welcomeMessage ? (
            <span className={styles.signUpMessage}>Welcome to Join!</span>
          ) : undefined}
        </div>
        <SignIn />
        <SignUp />
      </div>
      <OauthSpace />
    </div>
  );
}

export default SignInUpPage;
