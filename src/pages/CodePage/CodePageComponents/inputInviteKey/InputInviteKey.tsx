import { RefObject, useRef, useState } from "react";
import editorStore from "../../../../store/CodePageStore/editorStore";
import styles from "./InputInviteKey.module.css";
import userAxiosWithAuth from "../../../../utils/useAxiosWIthAuth";
import { useParams } from "react-router-dom";

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
      const response = await userAxiosWithAuth.post(`/api/repos/invite/${repoId}`, data);
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

  // const getInvite = useMutation({
  //   mutationFn: async () => {
  //     const data = {
  //       password: password,
  //     };
  //     try {
  //       const response = await userAxiosWithAuth.post(`/api/repos/invite/${repoId}`, data);
  //       setUrl(response.data.data.repoUrl);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  // });

  // useEffect(() => {
  //   getInvite.mutate();
  // }, []);

  return (
    <div className={styles.body}>
      <div ref={infoSpaceRef} className={styles.infoSpace}>
        <div className={styles.spaceEach}>
          <label className={styles.texts}>Key</label>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className={styles.input}
              placeholder="input your key"
              value={password}
              onChange={handlePasswordChange}
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputInviteKey;
