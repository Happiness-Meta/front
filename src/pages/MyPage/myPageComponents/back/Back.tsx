import { useMutation } from "@tanstack/react-query";
import { RefObject, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import axios, { AxiosError } from "axios";
import styles from "./back.module.css";
import SignInStore from "@/store/SignInUpPageStore/SignInStore";
import userAxiosWithAuth from "@/utils/useAxiosWIthAuth";
import { UserUpdateDto } from "@/types/AboutUsersDto";
import { MyPageProps } from "@/types/ComponentsProps";
import PwInputAndErrorMsgSpace from "./backComponents/PwInputAndErrorMsgSpace";
import NicknameInputSpace from "./backComponents/NicknameInputSpace";
import EmailInputSpace from "./backComponents/EmailInputSpace";

const Back: React.FC<MyPageProps> = ({ setIsClicked }) => {
  const [, setCookie] = useCookies(["email", "nickname", "token"]);

  const nicknameRef: RefObject<HTMLInputElement> = useRef(null);
  const pwRef: RefObject<HTMLInputElement> = useRef(null);

  const [errorMessage, setErrorMessage] = useState("");

  const { signInErrorMessageAniToggle } = SignInStore();

  const changeUserInfo = useMutation({
    mutationFn: async () => {
      if (nicknameRef.current!.value == "") {
        signInErrorMessageAniToggle();
        return setErrorMessage("변경할 닉네임을 입력해 주세요.");
      }
      if (pwRef.current!.value == "") {
        signInErrorMessageAniToggle();
        return setErrorMessage("변경할 비밀번호를 입력해 주세요.");
      }

      const body: UserUpdateDto = {
        nickname: nicknameRef.current!.value,
        password: pwRef.current!.value,
      };

      try {
        await userAxiosWithAuth.put(
          import.meta.env.VITE_BASE_URL + "/api/user",
          // "http://localhost:8080/api/sign/login",
          body
        );
        setCookie("nickname", nicknameRef.current!.value);
        setErrorMessage("개인정보가 변경되었습니다!");
        setTimeout(() => {
          setIsClicked(false);
        }, 500);
        setTimeout(() => {
          setErrorMessage("");
        }, 1000);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;

          if (axiosError.response) {
            if (error.response?.data.code !== 200) {
              signInErrorMessageAniToggle();
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
        <NicknameInputSpace nicknameRef={nicknameRef} />
        <EmailInputSpace />
        <PwInputAndErrorMsgSpace pwRef={pwRef} errorMessage={errorMessage} />
        <button
          className={styles.button}
          onClick={() => {
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
