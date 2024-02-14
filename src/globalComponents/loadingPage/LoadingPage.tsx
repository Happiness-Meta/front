import styles from "./loadingPage.module.css";

function LoadingPage() {
  return (
    <div className={styles.mainBody}>
      <div className={styles.figureSpace}>
        <div className={styles.movingFigure1}>
          <div className={styles.movingFigure2}></div>
        </div>
      </div>
      <span>여기에는 코드에 대한 팁들이 보여집니다.</span>
    </div>
  );
}

export default LoadingPage;
