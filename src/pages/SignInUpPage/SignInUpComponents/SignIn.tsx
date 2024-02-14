import { ChangeEvent, RefObject, useRef, useState } from "react";
import LoginPageStore from "../../../store/LoginPageStore/LoginPageStore";
import styles from "../signInUpPage.module.css";
import LoginFormDto from "../../../dto/LoginFormDto";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignInStore from "../../../store/LoginPageStore/SignInStore";

function SignIn() {
  const navigate = useNavigate();
  const idInput: RefObject<HTMLInputElement> = useRef(null);
  const pwInput: RefObject<HTMLInputElement> = useRef(null);
  const { isVisible, visibleToggle, inUpToggle } = LoginPageStore();
  const {
    signInErrorMessage,
    signInErrorMessageStatus,
    signInErrorMessageAni,
    signInErrorMessageAniToggle,
  } = SignInStore();
  const [signInId, setSignInId] = useState("");
  const [signInPw, setSignInPw] = useState("");

  const handleSignInId = (e: ChangeEvent<HTMLInputElement>) => {
    setSignInId(e.target.value);
  };

  const handleSignInPw = (e: ChangeEvent<HTMLInputElement>) => {
    setSignInPw(e.target.value);
  };

  const loginUser = async () => {
    if (idInput.current!.value === "")
      return signInErrorMessageStatus("아이디를 입력해주세요");
    if (pwInput.current!.value === "")
      return signInErrorMessageStatus("비밀번호를 입력해주세요");
    const body: LoginFormDto = {
      email: signInId,
      password: signInPw,
    };
    const response = await axios.post(
      "http://localhost:8080/api/sign/login",
      body
    );

    if (response.data.code !== 200) {
      if (pwInput.current!.value === "")
        return signInErrorMessageStatus("로그인 정보가 올바르지 않습니다.");
    }

    signInErrorMessageStatus("");
    navigate("/dashboard");

    // console.log(response.data.data.token);
  };

  return (
    <div className={styles.signInSection}>
      <div className={styles.signInText}>Sign In</div>
      <div className={styles.inputSpace}>
        <div className={styles.inputEachSpace}>
          <i className={`${styles.inputIcon} material-symbols-outlined`}>
            person
          </i>
          <input
            autoFocus
            ref={idInput}
            name="id"
            type="text"
            className={styles.input}
            placeholder="ID"
            value={signInId}
            onChange={handleSignInId}
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
            value={signInPw}
            onChange={handleSignInPw}
          />
          <i
            className={`${styles.visibility} material-symbols-outlined`}
            onClick={visibleToggle}
          >
            {isVisible ? "visibility" : "visibility_off"}
          </i>
          <div
            className={`${
              signInErrorMessageAni
                ? styles.errorMessageAni2
                : styles.errorMessageAni
            } ${styles.signInErrorMessage}`}
          >
            {signInErrorMessage}
          </div>
        </div>

        <button
          className={styles.signInUpBtn}
          onClick={() => {
            loginUser();
            signInErrorMessageAniToggle();
          }}
        >
          Sign In
        </button>
      </div>

      <div className={styles.signInBottom}>
        <div className={styles.bottomText}>Don't have an account?</div>
        <div
          className={styles.goToSignInUpBtn}
          onClick={() => {
            inUpToggle();
            signInErrorMessageStatus("");
          }}
        >
          Sign Up
        </div>
      </div>
      {/* <div className={styles.signInBottom}>
            <div className={styles.bottomText}>Forgot your password?</div>
            <div className={styles.goToSignInUpBtn}>Find</div>
          </div> */}
    </div>
  );
}

export default SignIn;
