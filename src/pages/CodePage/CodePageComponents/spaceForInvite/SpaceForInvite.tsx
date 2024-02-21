import { RefObject, useEffect, useRef, useState } from "react";
import editorStore from "../../../../store/CodePageStore/editorStore";
import styles from "./spaceForInvite.module.css";
import { useMutation } from "@tanstack/react-query";
import userAxiosWithAuth from "../../../../utils/useAxiosWIthAuth";
import { useParams } from "react-router-dom";

const SpaceForInvite = () => {
  const infoSpaceRef: RefObject<HTMLDivElement> = useRef(null);

  const { toggleInviteSpace } = editorStore();
  const { repoId } = useParams();
  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");

  const goInvite = useMutation({
    mutationFn: async () => {
      try {
        const response = await userAxiosWithAuth.get(
          `/api/repos/${repoId}/invite`
        );
        setUrl(response.data.data.repoUrl);
        setPassword(response.data.data.repoPassword);
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    goInvite.mutate();
  }, []);

  const splitedPw = password.split("");

  return (
    <div className={styles.body}>
      <div ref={infoSpaceRef} className={styles.infoSpace}>
        <div className={styles.spaceEach}>
          <label className={styles.texts}>URL</label>
          <input className={styles.input} value={url} />
        </div>
        <div className={styles.spaceEach}>
          <label className={styles.texts}>Key</label>
          <div className={styles.pwSpace}>
            <span className={styles.pwEachSpace}>{splitedPw[0]}</span>
            <span className={styles.pwEachSpace}>{splitedPw[1]}</span>
            <span className={styles.pwEachSpace}>{splitedPw[2]}</span>
            <span className={styles.pwEachSpace}>{splitedPw[3]}</span>
          </div>
        </div>
        <button className={styles.closeBtn} onClick={toggleInviteSpace}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SpaceForInvite;
