import styles from "./myPage.module.css";
import MyPageHeader from "./header/MyPageHeader";

function MyPage() {
  return (
    <div className={styles.myPage_body}>
      <MyPageHeader />
      마이페이지
    </div>
  );
}

export default MyPage;
