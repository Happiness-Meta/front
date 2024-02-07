import styles from "./myPage.module.css";
import MyPageHeader from "./header/MyPageHeader";

function MyPage() {
  return (
    <div className={styles.myPage}>
      <MyPageHeader />
      <div className={styles.myPage_body}>
        <div className={styles.myInfoSpace}>
          <div className={styles.myInfoTitle}>개인정보 변경</div>
          <div className={styles.formSpace}>
            <form action="" className={styles.form}>
              <div className={styles.formEachSpace}>
                <label htmlFor="nickname" className={styles.label}>
                  nickname
                </label>
                <i className={`${styles.inputIcon} material-symbols-outlined`}>
                  account_circle
                </i>
                <input type="text" name="nickname" className={styles.input} />
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
                />
              </div>

              <div className={styles.formEachSpace}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <i className={`${styles.inputIcon} material-symbols-outlined`}>
                  lock
                </i>
                <input type="text" name="password" className={styles.input} />
              </div>

              <div className={styles.btnSpace}>
                <button className={styles.button}>저장</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
