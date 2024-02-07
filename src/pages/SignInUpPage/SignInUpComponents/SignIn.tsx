import { ChangeEvent, useState } from "react";
import LoginPageStore from "../../../store/LoginPageStore/LoginPageStore";
import styles from "../signInUpPage.module.css";
import LoginFormDto from "../../../dto/LoginFormDto";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const { isVisible, visibleToggle, inUpToggle } = LoginPageStore();
  const [signInId, setSignInId] = useState("");
  const [signInPw, setSignInPw] = useState("");

  const handleSignInId = (e: ChangeEvent<HTMLInputElement>) => {
    setSignInId(e.target.value);
  };

  const handleSignInPw = (e: ChangeEvent<HTMLInputElement>) => {
    setSignInPw(e.target.value);
  };

  const loginUser = async () => {
    const body: LoginFormDto = {
      email: signInId,
      password: signInPw,
    };
    const response = await axios.post(
      "http://localhost:8080/api/sign/login",
      body
    );
    navigate("/dashboard");
    console.log(response.data.data.token);
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
        </div>

        <button className={styles.signInUpBtn} onClick={loginUser}>
          Sign In
        </button>
      </div>

      <div className={styles.signInBottom}>
        <div className={styles.bottomText}>Don't have an account?</div>
        <div className={styles.goToSignInUpBtn} onClick={inUpToggle}>
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
