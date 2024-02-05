import { Link } from "react-router-dom";
import globalStore from "../../store/globalStore/globalStore";
import styles from "./accountBtn.module.css";

function AccountBtn() {
  const { mode, accountBtn, accountBtnToggle } = globalStore();
  return (
    <div
      className={styles.accountSpace}
      style={
        accountBtn
          ? {
              backgroundColor: "rgba(128, 128, 128, 0.5)",
              borderRadius: "7px 7px 0 0",
            }
          : undefined
      }
    >
      <div
        className={styles.accountBtn}
        onClick={accountBtnToggle}
        style={
          accountBtn
            ? {
                border: "1px solid #068fff",
                borderRadius: "7px 7px 0 0",
              }
            : undefined
        }
      >
        <div
          className={styles.accountImg}
          style={mode ? { borderColor: "black" } : { borderColor: "white" }}
        ></div>
        <div
          className={`${styles.accountExpand} material-icons`}
          style={accountBtn ? { transform: "rotate(0)" } : undefined}
        >
          expand_more
        </div>
      </div>
      <div
        className={styles.accountWindow}
        style={
          accountBtn ? { visibility: "visible" } : { visibility: "hidden" }
        }
      >
        <div className={styles.buttonSpace}>
          <i className={`${styles.myPageBtnSymIcon} material-symbols-outlined`}>
            settings
          </i>
          <Link to="/myPage" className={styles.myPageBtnText}>
            Account Setting
          </Link>
        </div>
        <div className={styles.userInfo}>
          <span>ID : hiyunseok347@gmail.com</span>
          <span>username : 최윤석</span>
        </div>
      </div>
    </div>
  );
}

export default AccountBtn;
