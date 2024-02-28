import styles from "@/pages/homePage/homePage.module.css";
import HomePageStore from "@/store/HomePageStore/HomePageStore";

const IntroducingBox = () => {
  const { isLaunched, setIsLaunched } = HomePageStore();

  return (
    <div
      className={styles.introducingBox}
      style={{ display: isLaunched ? "none" : undefined }}
    >
      <div className={styles.boxes}>
        <span className={styles.boxTitle}>START-PACK</span>
        <span className={styles.boxSubTitle}>
          초보 우주 비행사를 위한 길잡이
        </span>
      </div>
      <div className={styles.boxes}>
        <span className={styles.boxTitle}>CHATTING</span>
        <span className={styles.boxSubTitle}>텍스트 채팅 기능</span>
      </div>
      <div className={styles.boxes}>
        <span className={styles.boxTitle}>CHANCE</span>
        <span className={styles.boxSubTitle}>성장할 수 있는 기회</span>
      </div>
      <div
        className={styles.boxes}
        onClick={() => {
          setIsLaunched(true);
        }}
        style={{ cursor: "pointer" }}
      >
        <span className={styles.boxTitle}>LAUNCH</span>
        <span className={styles.boxSubTitle}>떠날 준비가 됐나요?</span>
      </div>
    </div>
  );
};

export default IntroducingBox;
