import { useNavigate } from "react-router-dom";
import styles from "./loadingPage.module.css";

interface LoadingPageProps {
  finishedGettingData: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = (finishedGettingData) => {
  const navigate = useNavigate();

  const tips = [
    `HTML문서에 시멘틱 태그를 상황에 맞게 사용해 코드의 가독성을 높이세요!`,
    `JS, Java, C++ 등의 주석방법은 "//" 또는 "/* */이고, Python은 "#" 혹은 "''' '''", HTML은 "<!-- -->"입니다.`,
    `조건이 길다면 변수로 빼는게 좋습니다.`,
    `변수의 이름을 알기쉽게 주는 것이 좋습니다. ex) id(x) / productId(o)`,
    `주석이 코드를 대신해주지 않습니다. 코드를 보기쉽게 먼저 짜는걸 우선시 해보세요.`,
    `함수가 하는 일에 대해 함수명을 정확히 쓰는 것이 좋습니다.`,
    `반복되는 코드를 함수나 모듈로 추출해서 재사용성이 높이는 것이 좋습니다.`,
    `조건을 줄 때 상수는 이름으로 주는 것이 가독성에 도움이 됩니다.`,
    `코드에 설명적인 주석을 추가해서 다른 사람들이 빠르게 이해할 수 있게 하면 좋습니다.`,
    `코드 블록에 일관된 들여쓰기 스타일을 적용해서 가독성을 향상시키세요.`,
  ];
  const tipToShow = tips[Math.floor(Math.random() * 10)];

  return (
    <div
      className={`${finishedGettingData ? styles.fadeOut : undefined} ${
        styles.mainBody
      }`}
    >
      <div className={styles.figureSpace}>
        <div className={styles.movingFigure1}>
          <div className={styles.movingFigure2}> </div>
        </div>
        <section className={styles.errorSpace}>
          <span>서버에 에러가 났습니다. 홈으로 돌아가주세요.</span>
          <button className={styles.homeButton} onClick={() => navigate(`/`)}>
            Home
          </button>
        </section>
      </div>
      <p>{finishedGettingData ? `완료! ✅` : tipToShow}</p>
    </div>
  );
};

export default LoadingPage;
