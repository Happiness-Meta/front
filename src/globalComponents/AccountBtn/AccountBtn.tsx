import { Link } from "react-router-dom";
import globalStore from "../../store/globalStore/globalStore";
import styles from "./accountBtn.module.css";
import { useRef } from "react";
import ClickOutsideFalse from "../ClickOutsideFalse";

function AccountBtn() {
  const accountBtnRef = useRef<HTMLDivElement>(null);
  const { mode, accountBtn, accountBtnToggle } = globalStore();

  ClickOutsideFalse(accountBtnRef, accountBtn, accountBtnToggle);

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
        ref={accountBtnRef}
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
        style={accountBtn ? undefined : { display: "none" }}
      >
        <div className={styles.buttonSpace}>
          <Link
            to="/myPage"
            className={styles.buttonEach}
            onClick={accountBtnToggle}
          >
            <i
              className={`${styles.myPageBtnSymIcon} material-symbols-outlined`}
            >
              settings
            </i>
            <span className={styles.myPageBtnText} onClick={accountBtnToggle}>
              Account Setting
            </span>
          </Link>
          <Link to="/" className={styles.buttonEach} onClick={accountBtnToggle}>
            <i
              className={`${styles.myPageBtnSymIcon} material-symbols-outlined`}
            >
              logout
            </i>
            <span className={styles.myPageBtnText} onClick={accountBtnToggle}>
              logout
            </span>
          </Link>
        </div>
        <div className={styles.userInfo}>
          <span>ID : hiyunseok347@gmail.com</span>
          <span>nickname : 최윤석</span>
        </div>
      </div>
    </div>
  );
}

export default AccountBtn;
