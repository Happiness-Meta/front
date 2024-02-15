import styles from "./signInUpPage.module.css";
import LoginPageStore from "../../store/LoginPageStore/LoginPageStore.ts";
// import OauthSpace from "./OauthSpace/OauthSpace.tsx";
import LoginPageHeader from "./header/LoginPageHeader.tsx";
import SignIn from "./SignInUpComponents/SignIn.tsx";
import SignUp from "./SignInUpComponents/SignUp.tsx";

function SignInUpPage() {
  const { inUp, welcomeMessage } = LoginPageStore();

  return (
    <div className={styles.LoginPage_body}>
      <LoginPageHeader />
      <div className={styles.guideSpace}>
        <h1 className={styles.guideText}>
          {inUp ? "Sign up to Earth-IDEN" : "Sign in to Earth-IDEN"}
        </h1>
      </div>
      <main className={styles.signInUpSpace}>
        <div
          className={`${inUp ? styles.inUpToggle : undefined}  ${
            styles.sliderFrame
          }`}
        >
          {welcomeMessage ? (
            <div className={styles.signUpMessage}>
              <p>Congrats!</p>
              <p>Welcome to Join!</p>
            </div>
          ) : undefined}
        </div>
        <SignIn />
        <SignUp />
      </main>
      {/* <OauthSpace /> */}
    </div>
  );
}

export default SignInUpPage;
