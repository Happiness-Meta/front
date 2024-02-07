import { ChangeEvent, useState } from "react";
import LoginPageStore from "../../../store/LoginPageStore/LoginPageStore";
import styles from "../signInUpPage.module.css";
import UserRegisterDto from "../../../dto/UserRegisterDto";
import axios from "axios";

function SignUp() {
  const { inUpToggle, isVisible, visibleToggle, toggleSignUpMessage } =
    LoginPageStore();

  const [signUpID, setSignUpID] = useState("");
  const [nickname, setNickname] = useState("");
  const [signUpPW, setSignUpPW] = useState("");

  const handleSignUpID = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpID(e.target.value);
  };

  const handleSignUpnickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSignUpPW = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpPW(e.target.value);
  };

  const registerUser = async () => {
    // if (signUpID.includes("@")) {
    //   return inUpToggle;
    // }
    // const body: UserRegisterDto = {
    //   email: signUpID,
    //   nickname: nickname,
    //   password: signUpPW,
    // };
    // const response = await axios.post(
    //   "http://localhost:8080/api/sign/register",
    //   body
    // );
    setSignUpID("");
    setNickname("");
    setSignUpPW("");
    toggleSignUpMessage();
    const siBtn = document.querySelector<HTMLButtonElement>(".goToSignInUpBtn");
    siBtn!.disabled = true;
    setTimeout(() => {
      inUpToggle();
      siBtn!.disabled = false;
    }, 1500);

    // console.log(response.data);
  };
  return (
    <div className={styles.signUpSection}>
      <div className={styles.signInText}>Sign Up</div>
      <div className={styles.inputSpace}>
        <div className={styles.inputEachSpace}>
          <i className={`${styles.inputIcon} material-symbols-outlined`}>
            person
          </i>
          <input
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
            name="nickname"
            type="text"
            className={styles.input}
            placeholder="nickname"
            value={nickname}
            onChange={handleSignUpnickname}
          />
        </div>
        <div className={styles.inputEachSpace}>
          <i className={`${styles.inputIcon} material-symbols-outlined`}>
            lock
          </i>
          <input
            name="password"
            type={isVisible ? "text" : "password"}
            className={styles.input}
            placeholder="password"
            value={signUpPW}
            onChange={handleSignUpPW}
          ></input>
          <i
            className={`${styles.visibility} material-symbols-outlined`}
            onClick={visibleToggle}
          >
            {isVisible ? "visibility" : "visibility_off"}
          </i>
        </div>
        <button className={styles.signInUpBtn} onClick={registerUser}>
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
