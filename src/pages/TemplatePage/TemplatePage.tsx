import { Link, useNavigate } from "react-router-dom";
import templatePageStore from "../../store/TemplatePageStore/templatePageStore";
import styles from "./templatePage.module.css";
import { useRef } from "react";
// import LoadingPage from "../../globalComponents/loadingPage/LoadingPage";

function TemplatePage() {
  const navigate = useNavigate();
  const templateRef = useRef(null);
  const { choseReact, toggleChoseReact } = templatePageStore();

  return (
    <div ref={templateRef} className={styles.mainBody}>
      {/* <LoadingPage /> */}
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
          <Link
            to={"/codePage"}
            className={styles.innerBoxes}
            onClick={() => {
              toggleChoseReact();
            }}
          >
            <img src="/svg/js.svg" alt="js" className={styles.images} />
            <span className={styles.texts}>JavaScript</span>
          </Link>
          <Link
            to={"/codePage"}
            className={styles.innerBoxes}
            onClick={() => {
              toggleChoseReact();
            }}
          >
            <img src="/svg/ts.svg" alt="ts" className={styles.images} />
            <span className={styles.texts}>TypeScript</span>
          </Link>
        </div>
      ) : (
        <div className={styles.box}>
          <div className={styles.firstBox}>
            <Link to={"/codePage"} className={styles.innerBoxes}>
              <img
                src="/templatePageSvg/html.svg"
                alt="html"
                className={styles.images}
              />
              <span className={styles.texts}>HTML, CSS, JS</span>
            </Link>
            <Link to={"/codePage"} className={styles.innerBoxes}>
              <img src="/svg/json.svg" alt="nodejs" className={styles.images} />
              <span className={styles.texts}>Node.js</span>
            </Link>
          </div>
          <div className={styles.secondBox}>
            <Link to={"/codePage"} className={styles.innerBoxes}>
              <img src="/svg/py.svg" alt="py" className={styles.images} />
              <span className={styles.texts}>Python</span>
            </Link>
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
