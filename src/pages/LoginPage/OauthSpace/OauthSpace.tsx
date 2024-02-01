import headerStore from "../../../store/CodePageStore/headerStore";
import styles from "../loginPage.module.css";

function OauthSpace() {
  const { mode } = headerStore();
  return (
    <div className={styles.oauthSpace}>
      <div className={styles.oauthContainers}>
        <img src="/oauthSvg/kakao.svg" className={styles.oauthSymbols} />
        <div className={styles.oauthTextK}>Login with Kakao</div>
      </div>
      <div className={styles.oauthContainers}>
        <img
          src={mode ? "/oauthSvg/githubB.svg" : "/oauthSvg/github.svg"}
          className={styles.oauthSymbols}
        />
        <div className={styles.oauthText}>Login with GitHub</div>
      </div>
      <div className={styles.oauthContainers}>
        <img src="/oauthSvg/google.svg" className={styles.oauthSymbols} />
        <div className={styles.oauthText}>Login with Google</div>
      </div>
    </div>
  );
}

export default OauthSpace;
