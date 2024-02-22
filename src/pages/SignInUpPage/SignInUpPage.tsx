import styles from "./signInUpPage.module.css";
import LoginPageStore from "../../store/SignInUpPageStore/SignInUpPageStore.ts";
// import OauthSpace from "./OauthSpace/OauthSpace.tsx";
import LoginPageHeader from "./header/LoginPageHeader.tsx";
import SignIn from "./SignInUpComponents/SignIn.tsx";
import SignUp from "./SignInUpComponents/SignUp.tsx";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInUpPage() {
  const navigate = useNavigate();
  const { inUp, welcomeMessage } = LoginPageStore();
  const [cookies] = useCookies(["token"]);
  const [widthZero, setWidthZero] = useState(false);

  useEffect(() => {
    if (cookies.token) {
      navigate("/");
    }
  }, [cookies, navigate]);

  return (
    <div className={styles.LoginPage_body}>
      <LoginPageHeader />
      <div className={styles.guideSpace}>
        <h1
          className={`${inUp ? styles.signUpAni : styles.signInAni} ${
            styles.guideText
          }`}
        >
          {inUp ? "Sign up to Earth-IDE-N" : "Sign in to Earth-IDE-N"}
        </h1>
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
        >
          {welcomeMessage ? (
            <div className={styles.signUpMessage}>
              <span>Congrats!</span>
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
