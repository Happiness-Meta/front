import { PwInputAndErrorMsgSpaceProps } from "@/types/ComponentsProps";
import styles from "../back.module.css";
import SignInStore from "@/store/SignInUpPageStore/SignInStore";

const PwInputAndErrorMsgSpace: React.FC<PwInputAndErrorMsgSpaceProps> = ({
  pwRef,
  errorMessage,
}) => {
  const { signInErrorMessageAni } = SignInStore();

  return (
    <div className={styles.formEachSpace}>
      <i className={`${styles.inputIcon} material-symbols-outlined`}>lock</i>
      <input
        ref={pwRef}
        type="text"
        name="password"
        className={`${styles.pwInput} ${styles.input}`}
      />
      <span
        className={`${
          signInErrorMessageAni
            ? styles.errorMessageAni
            : styles.errorMessageAni2
        } ${styles.errorMessage}`}
        style={{
          color:
            errorMessage === "개인정보가 변경되었습니다!"
              ? "rgb(0, 170, 0)"
              : "red",
        }}
      >
        {errorMessage}
      </span>
    </div>
  );
};

export default PwInputAndErrorMsgSpace;
