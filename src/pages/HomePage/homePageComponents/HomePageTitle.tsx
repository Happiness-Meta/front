import styles from "@/pages/homePage/homePage.module.css";
import HomePageStore from "@/store/HomePageStore/HomePageStore";

const HomePageTitle = () => {
  const { isLaunched } = HomePageStore();

  return (
    <div
      className={styles.textSpace}
      style={{ display: isLaunched ? "none" : undefined }}
    >
      <span className={styles.title}>Earth-IDE-N</span>
      <div className={styles.subTitleSpace}>
        <span className={styles.subTitle}>지구상 어디든 접근하는</span>
        <span className={styles.subTitle}>웹 IDE의 새로운 모습</span>
      </div>
    </div>
  );
};

export default HomePageTitle;
