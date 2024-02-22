import { useMutation } from "@tanstack/react-query";
import { RefObject, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import SignInStore from "../../../store/SignInUpPageStore/SignInStore";
import UserUpdateDto from "../../../dto/UserUpdateDto";
import userAxiosWithAuth from "../../../utils/useAxiosWIthAuth";
import axios, { AxiosError } from "axios";
import styles from "./back.module.css";

const Back = () => {
  const [cookies, setCookie] = useCookies(["email", "nickname", "token"]);

  const nicknameRef: RefObject<HTMLInputElement> = useRef(null);
  const pwRef: RefObject<HTMLInputElement> = useRef(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const { signInErrorMessageAni, signInErrorMessageAniToggle } = SignInStore();

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
          import.meta.env.VITE_BASE_URL + "/api/user",
          // "http://localhost:8080/api/sign/login",
          body
        );
        setCookie("nickname", nicknameRef.current!.value);

        console.log(response.data.data);
        setErrorMessage("");
        setIsClicked(!isClicked);
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
    <div className={`${styles.back} ${styles.myInfoSpace}`}>
      <span className={styles.member}>회원정보 변경</span>
      <div className={styles.myInfoSpace_inner}>
        <div className={styles.formEachSpace}>
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
      <span className={styles.projectName}>EARTH-IDE-N</span>
    </div>
  );
};

export default Back;
