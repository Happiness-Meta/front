import styles from "./SelectedLanguageDescription.module.css";

const languageDescriptions: { [key: string]: string } = {
  PYTHON:
    "파이썬은 배우기 쉬우면서도 강력한 프로그래밍 언어입니다. 효율적인 자료 구조와 객체 지향 프로그래밍에 대한 간단하고도 효과적인 접근법을 제공합니다. ",
  JAVA: "자바는 클래스 기반, 객체 지향 프로그래밍 언어로, 가능한 한 적은 구현 의존성을 가지도록 설계되었습니다.",
  JAVASCRIPT:
    "JavaScript (JS)는 가벼운, 인터프리터 혹은 just-in-time 컴파일 프로그래밍 언어로, 일급 함수를 지원합니다. ",
};

export default function renderLanguageDescription(selectedLanguage: string) {
  const isValidLanguage =
    Object.keys(languageDescriptions).includes(selectedLanguage);
  return (
    <div className={styles.languageDescriptionContainer}>
      <div className={styles.languageImg}>
        {isValidLanguage && (
          <img
            src={`/svg/${selectedLanguage.toLowerCase()}.svg`}
            alt={selectedLanguage}
          />
        )}
      </div>

      <div className={styles.languageTitle}>
        {selectedLanguage.toLowerCase()}
      </div>
      <div className={styles.description}>
        {languageDescriptions[selectedLanguage] ||
          "사용하실 언어를 선택하세요."}
      </div>
    </div>
  );
}
