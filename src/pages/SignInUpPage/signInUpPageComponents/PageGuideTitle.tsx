import LoginPageStore from "@/store/SignInUpPageStore/SignInUpPageStore";
import styles from "../signInUpPage.module.css";
import { WidthZeroProps } from "@/types/ComponentsProps";

const PageGuideTitle: React.FC<WidthZeroProps> = (widthZero) => {
  const { inUp } = LoginPageStore();

  return (
    <div className={styles.guideSpace}>
      {widthZero ? undefined : (
        <h1
          className={`${inUp ? styles.signUpAni : styles.signInAni} ${
            styles.guideText
          }`}
        >
          {inUp ? "Sign up to Earth-IDE-N" : "Sign in to Earth-IDE-N"}
        </h1>
      )}
    </div>
  );
};

export default PageGuideTitle;
