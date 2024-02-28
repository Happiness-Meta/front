import styles from "./signInUpPage.module.css";
import LoginPageHeader from "./signInUpPageComponents/header/LoginPageHeader.tsx";
import SignIn from "./signInUpPageComponents/SignInUpComponents/SignIn.tsx";
import SignUp from "./signInUpPageComponents/SignInUpComponents/SignUp.tsx";
import { useState } from "react";
import BlockingPage from "./signInUpPageComponents/BlockingPage.tsx";
import PageGuideTitle from "./signInUpPageComponents/PageGuideTitle.tsx";
import SliderComponents from "./signInUpPageComponents/SliderComponents.tsx";

function SignInUpPage() {
  const [widthZero, setWidthZero] = useState(false);

  return (
    <div className={styles.LoginPage_body}>
      <BlockingPage />
      <LoginPageHeader />
      <PageGuideTitle widthZero={widthZero} />
      <main
        className={`${widthZero ? styles.widthZero : undefined} ${
          styles.signInUpSpace
        }`}
      >
        <SliderComponents widthZero={widthZero} />
        <SignIn setWidthZero={setWidthZero} />
        <SignUp />
      </main>
    </div>
  );
}

export default SignInUpPage;
