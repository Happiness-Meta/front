import { RefObject, useRef, useState } from "react";
import styles from "./InputInviteKey.module.css";
import { useParams } from "react-router-dom";
import editorStore from "@/store/CodePageStore/editorStore";
import userAxiosWithAuth from "@/utils/useAxiosWIthAuth";

const InputInviteKey = () => {
  const infoSpaceRef: RefObject<HTMLDivElement> = useRef(null);

  const { toggleInviteKey } = editorStore();
  const { repoId } = useParams();
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    // 여기에 API 호출 코드 추가
    try {
      const data = { password: password };
      const response = await userAxiosWithAuth.post(
        `/api/repos/invite/${repoId}`,
        data
      );
      console.log(response.data);

      if (response.data.code === 200) {
        toggleInviteKey();
        //navigate로 약한 새로고침은 안 되어서 강한 새로고침
        window.location.href = `/codePage/${repoId}`;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("비밀번호를 다시 입력해주세요.");
      // 에러 처리 로직
    }
  };

  return (
    <div className={styles.body}>
      <div ref={infoSpaceRef} className={styles.infoSpace}>
        <label className={styles.texts}>Key</label>
        <form onSubmit={handleSubmit} className={styles.formSpace}>
          <input
            maxLength={4}
            type="text"
            className={styles.input}
            placeholder="input the key"
            value={password}
            onChange={handlePasswordChange}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default InputInviteKey;
