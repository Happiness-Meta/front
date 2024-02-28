import { useCookies } from "react-cookie";
import styles from "../signInUpPage.module.css";
import LoginPageStore from "@/store/SignInUpPageStore/SignInUpPageStore";
import { WidthZeroProps } from "@/types/ComponentsProps";

const SliderComponents: React.FC<WidthZeroProps> = (widthZero) => {
  const { inUp, welcomeMessage } = LoginPageStore();

  const [cookies] = useCookies(["token", "nickname"]);
  return (
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
  );
};

export default SliderComponents;
