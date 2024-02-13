import { useNavigate } from "react-router-dom";
import templatePageStore from "../../store/TemplatePageStore/templatePageStore";
import styles from "./templatePage.module.css";

function TemplatePage() {
  const navigate = useNavigate();
  const { choseReact, toggleChoseReact } = templatePageStore();

  return (
    <div className={styles.mainBody}>
      <i
        className={`${styles.arrowBack} material-symbols-outlined`}
        onClick={() => {
          if (choseReact) {
            toggleChoseReact();
          } else navigate("/");
        }}
      >
        arrow_back
      </i>
      <span className={styles.guideText}>
        {choseReact ? "Start React with?" : "Choose a template"}
      </span>
      {choseReact ? (
        <div className={styles.reactBox}>
          <div
            className={styles.innerBoxes}
            onClick={() => navigate("/codePage")}
          >
            <img src="/svg/js.svg" alt="js" className={styles.images} />
            <span className={styles.texts}>JavaScript</span>
          </div>
          <div
            className={styles.innerBoxes}
            onClick={() => navigate("/codePage")}
          >
            <img src="/svg/ts.svg" alt="ts" className={styles.images} />
            <span className={styles.texts}>TypeScript</span>
          </div>
        </div>
      ) : (
        <div className={styles.box}>
          <div className={styles.firstBox}>
            <div
              className={styles.innerBoxes}
              onClick={() => navigate("/codePage")}
            >
              <img
                src="/templatePageSvg/html.svg"
                alt="html"
                className={styles.images}
              />
              <span className={styles.texts}>HTML, CSS, JS</span>
            </div>
            <div
              className={styles.innerBoxes}
              onClick={() => navigate("/codePage")}
            >
              <img src="/svg/json.svg" alt="nodejs" className={styles.images} />
              <span className={styles.texts}>Node.js</span>
            </div>
          </div>
          <div className={styles.secondBox}>
            <div
              className={styles.innerBoxes}
              onClick={() => navigate("/codePage")}
            >
              <img src="/svg/py.svg" alt="py" className={styles.images} />
              <span className={styles.texts}>Python</span>
            </div>
            <div className={styles.innerBoxes} onClick={toggleChoseReact}>
              <img
                src="/templatePageSvg/React.svg"
                alt="react"
                className={styles.images}
              />
              <span className={styles.texts}>React</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplatePage;
