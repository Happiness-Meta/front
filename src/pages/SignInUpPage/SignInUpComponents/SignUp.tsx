import { RefObject, useRef, useState } from "react";
import LoginPageStore from "../../../store/LoginPageStore/LoginPageStore";
import styles from "../signInUpPage.module.css";
import SignUpStore from "../../../store/LoginPageStore/SignUpStore";
import UserRegisterDto from "../../../dto/UserRegisterDto";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

function SignUp() {
  const idInput: RefObject<HTMLInputElement> = useRef(null);
  const nicknameInput: RefObject<HTMLInputElement> = useRef(null);
  const pwInput: RefObject<HTMLInputElement> = useRef(null);

  const { inUp, inUpToggle, isVisible, visibleToggle, toggleWelcomeMessage } =
    LoginPageStore();
  const {
    signUpErrorMessage,
    signUpErrorMessageStatus,
    signUpErrorMessageAni,
    signUpErrorMessageAniToggle,
  } = SignUpStore();

  const [signUpID, setSignUpId] = useState("");
  const [nickname, setNickname] = useState("");
  const [signUpPW, setSignUpPw] = useState("");

  const registerUser = useMutation({
    mutationFn: async () => {
      if (signUpErrorMessage) {
        signUpErrorMessageAniToggle();
      }
      if (idInput.current!.value === "")
        return signUpErrorMessageStatus("아이디를 입력해주세요.");
      if (!signUpID.includes("@") || !signUpID.includes("."))
        return signUpErrorMessageStatus("이메일 형식으로 적어주세요.");
      if (nicknameInput.current!.value === "")
        return signUpErrorMessageStatus("닉네임을 입력해주세요.");
      if (pwInput.current!.value === "")
        return signUpErrorMessageStatus("비밀번호를 입력해주세요.");

      const body: UserRegisterDto = {
        email: signUpID,
        nickname: nickname,
        password: signUpPW,
      };

      try {
        signUpErrorMessageStatus("");
        const response = await axios.post(
          "http://43.203.92.111/api/sign/register",
          // "http://localhost:8080/api/sign/register",
          body
        );
        signUpErrorMessageStatus("");
        setSignUpId("");
        setNickname("");
        setSignUpPw("");
        toggleWelcomeMessage();
        setTimeout(() => {
          inUpToggle();
        }, 1500);
        setTimeout(() => {
          toggleWelcomeMessage();
        }, 5000);

        console.log(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response) {
            console.log(error.response?.data);
            if (error.response?.data.code === 409) {
              return signUpErrorMessageStatus(
                "입력하신 이메일이 이미 존재합니다."
              );
            }
            if (error.response?.data.code === 404) {
              return signUpErrorMessageStatus(
                "입력하신 닉네임이 이미 존재합니다."
              );
            }
            if (error.response?.data.code === 400) {
              return signUpErrorMessageStatus(
                "비밀번호: 영문 대,소문자/숫자/특수기호 1개 이상 포함된 8 ~ 20자"
              );
            }
            if (error.response?.data.code !== 200) {
              return signUpErrorMessageStatus("시스템 오류");
            }
          }
        }
      }
    },
  });

  return (
    <div className={styles.signUpSection}>
      <h2 className={styles.signInText}>Sign Up</h2>
      <div className={styles.inputSpace}>
        <div className={styles.inputEachSpace}>
          <span
            className={`${
              signUpErrorMessageAni
                ? styles.errorMessageAni2
                : styles.errorMessageAni
            } ${styles.signUpErrorMessage}`}
          >
            {signUpErrorMessage}
          </span>
          <i className={`${styles.inputIcon} material-symbols-outlined`}>
            person
          </i>
          <input
            {...(!inUp ? { autoFocus: true } : {})}
            ref={idInput}
            name="id"
            type="text"
            className={styles.input}
            placeholder="ID"
            value={signUpID}
            onChange={(e) => setSignUpId(e.target.value)}
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
            onChange={(e) => setNickname(e.target.value)}
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
            onChange={(e) => setSignUpPw(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") registerUser.mutate();
            }}
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
            registerUser.mutate();
          }}
        >
          Sign Up
        </button>
      </div>

      <div className={styles.signInBottom}>
        <span className={styles.bottomText}>Ready to sign in?</span>
        <button
          className={styles.goToSignInUpBtn}
          onClick={() => {
            inUpToggle();
            signUpErrorMessageStatus("");
            setSignUpId("");
            setNickname("");
            setSignUpPw("");
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignUp;
