import { ChangeEvent, RefObject, useRef, useState } from "react";
import LoginPageStore from "../../../store/LoginPageStore/LoginPageStore";
import styles from "../signInUpPage.module.css";
// import UserRegisterDto from "../../../dto/UserRegisterDto";
// import axios from "axios";

function SignUp() {
  const idInput: RefObject<HTMLInputElement> = useRef(null);
  const nicknameInput: RefObject<HTMLInputElement> = useRef(null);
  const pwInput: RefObject<HTMLInputElement> = useRef(null);
  const {
    inUpToggle,
    isVisible,
    visibleToggle,
    toggleSignUpMessage,
    signUpErrorMessage,
    signUpErrorMessageStatus,
    signUpErrorMessageAni,
    signUpErrorMessageAniToggle,
  } = LoginPageStore();

  const [signUpID, setSignUpID] = useState("");
  const [nickname, setNickname] = useState("");
  const [signUpPW, setSignUpPW] = useState("");

  const handleSignUpID = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpID(e.target.value);
  };

  const handleSignUpNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSignUpPW = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpPW(e.target.value);
  };

  const registerUser = async () => {
    if (idInput.current!.value === "")
      return signUpErrorMessageStatus("아이디를 입력해주세요.");
    if (!signUpID.includes("@"))
      return signUpErrorMessageStatus("이메일 형식으로 적어주세요.");
    if (nicknameInput.current!.value === "")
      return signUpErrorMessageStatus("닉네임을 입력해주세요");
    if (pwInput.current!.value === "")
      return signUpErrorMessageStatus("비밀번호를 입력해주세요");

    // const body: UserRegisterDto = {
    //   email: signUpID,
    //   nickname: nickname,
    //   password: signUpPW,
    // };
    // const response = await axios.post(
    //   "http://localhost:8080/api/sign/register",
    //   body
    // );
    signUpErrorMessageStatus("");
    setSignUpID("");
    setNickname("");
    setSignUpPW("");
    toggleSignUpMessage();

    setTimeout(() => {
      inUpToggle();
    }, 1500);
    setTimeout(() => {
      toggleSignUpMessage();
    }, 5000);

    // console.log(response.data);
  };
  return (
    <div className={styles.signUpSection}>
      <div className={styles.signInText}>Sign Up</div>
      <div className={styles.inputSpace}>
        <div className={styles.inputEachSpace}>
          <div
            className={`${
              signUpErrorMessageAni
                ? styles.errorMessageAni2
                : styles.errorMessageAni
            } ${styles.errorMessage}`}
          >
            {signUpErrorMessage}
          </div>
          <i className={`${styles.inputIcon} material-symbols-outlined`}>
            person
          </i>
          <input
            ref={idInput}
            name="id"
            type="text"
            className={styles.input}
            placeholder="ID"
            value={signUpID}
            onChange={handleSignUpID}
          />
        </div>
        <div className={styles.inputEachSpace}>
          <i className={`${styles.inputIcon} material-symbols-outlined`}>
            account_circle
          </i>
          <input
            ref={nicknameInput}
            maxLength={16}
            name="nickname"
            type="text"
            className={styles.input}
            placeholder="nickname"
            value={nickname}
            onChange={handleSignUpNickname}
          />
        </div>
        <div className={styles.inputEachSpace}>
          <i className={`${styles.inputIcon} material-symbols-outlined`}>
            lock
          </i>
          <input
            ref={pwInput}
            name="password"
            type={isVisible ? "text" : "password"}
            className={styles.input}
            placeholder="password"
            value={signUpPW}
            onChange={handleSignUpPW}
          />
          <i
            className={`${styles.visibility} material-symbols-outlined`}
            onClick={visibleToggle}
          >
            {isVisible ? "visibility" : "visibility_off"}
          </i>
        </div>
        <button
          className={styles.signInUpBtn}
          onClick={() => {
            registerUser();
            signUpErrorMessageAniToggle();
          }}
        >
          Sign Up
        </button>
      </div>

      <div className={styles.signInBottom}>
        <div className={styles.bottomText}>Ready to sign in?</div>
        <div className={styles.goToSignInUpBtn} onClick={inUpToggle}>
          Sign In
        </div>
      </div>
    </div>
  );
}

export default SignUp;
