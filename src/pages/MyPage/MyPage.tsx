import styles from "./myPage.module.css";
import MyPageHeader from "./header/MyPageHeader";
import { useCookies } from "react-cookie";
import { RefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import SignInStore from "../../store/LoginPageStore/SignInStore";
import axios, { AxiosError } from "axios";
import UserUpdateDto from "../../dto/UserUpdateDto";
import userAxiosWithAuth from "../../utils/useAxiosWIthAuth";

function MyPage() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["email", "nickname", "token"]);
  console.log(cookies);

  const nicknameRef: RefObject<HTMLInputElement> = useRef(null);
  const pwRef: RefObject<HTMLInputElement> = useRef(null);

  const [errorMessage, setErrorMessage] = useState("");
  const { signInErrorMessageAni, signInErrorMessageAniToggle } = SignInStore();

  useEffect(() => {
    if (!cookies) {
      navigate("/");
    }
  }, []);

  const changeUserInfo = useMutation({
    mutationFn: async () => {
      if (nicknameRef.current!.value == "") {
        return setErrorMessage("변경할 닉네임을 입력해 주세요.");
      }
      if (pwRef.current!.value == "") {
        return setErrorMessage("변경할 비밀번호를 입력해 주세요.");
      }

      const body: UserUpdateDto = {
        nickname: nicknameRef.current!.value,
        password: pwRef.current!.value,
      };

      try {
        const response = await userAxiosWithAuth.put(
          `http://43.203.92.111/api/user`,
          // "http://localhost:8080/api/sign/login",
          body
        );
        setCookie("nickname", nicknameRef.current!.value);

        console.log(response.data.data);
        setErrorMessage("");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;

          if (axiosError.response) {
            console.log(error.response?.data);
            if (error.response?.data.code !== 200) {
              return setErrorMessage(error.response?.data.msg);
            }
          }
        }
      }
    },
  });

  return (
    <div className={styles.myPage}>
      <MyPageHeader />
      <div className={styles.myPage_body}>
        <div className={styles.myInfoSpace}>
          <div className={styles.myInfoTitle}>개인정보 변경</div>
          <div className={styles.formSpace}>
            <div className={styles.form}>
              <div className={styles.formEachSpace}>
                <label htmlFor="nickname" className={styles.label}>
                  nickname
                </label>
                <i className={`${styles.inputIcon} material-symbols-outlined`}>
                  account_circle
                </i>
                <input
                  ref={nicknameRef}
                  type="text"
                  name="nickname"
                  className={styles.input}
                  defaultValue={cookies.nickname}
                />
              </div>

              <div className={styles.formEachSpace}>
                <label htmlFor="ID" className={styles.label}>
                  ID
                </label>
                <i className={`${styles.inputIcon} material-symbols-outlined`}>
                  person
                </i>
                <input
                  disabled
                  type="text"
                  name="ID"
                  className={styles.IDinput}
                  defaultValue={cookies.email}
                />
              </div>

              <div className={styles.formEachSpace}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <i className={`${styles.inputIcon} material-symbols-outlined`}>
                  lock
                </i>
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
                >
                  {errorMessage}
                </span>
              </div>

              <div className={styles.btnSpace}>
                <button
                  className={styles.button}
                  onClick={() => {
                    signInErrorMessageAniToggle();
                    changeUserInfo.mutate();
                  }}
                >
                  변경
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
