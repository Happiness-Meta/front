import useModalStore from "@/store/ModalStore/ModalStore";
import styles from "./EmptyRepositories.module.css";
import useDashBoardStore from "@/store/dashboardStore/dashboardStore";
import Recommend from "@/pages/RepoPage/Component/recommend/Recommend";
import { useEffect } from "react";

export default function EmptyRepositories() {
  const { toggleCreateModal } = useModalStore();
  const { isAnimated, setIsAnimated } = useDashBoardStore();

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className={`${isAnimated ? styles.fadeIn : styles.dashboardContainer}`}>
      <div className={styles.repositoriescontainer_empty}>
        <h1>Home</h1>
        <p>New on Happiness Meta</p>

        <div className={styles.startbuttoncontainer}>
          <div className={styles.makeYourFirstRepoText}>
            <h2>Let's make your first repository!🚀</h2>
          </div>
          <button onClick={toggleCreateModal} className={styles.newrepobutton}>
            CREATE REPOSITORY
          </button>
          <div className={styles.repositoriescontainer_empty_text}>
            <div className={styles.recommendcontainer}>
              <div className={styles.recommend}>
                <h2>Recommendation Template</h2>
              </div>
              <div className={styles.recommendComponent}>
                <Recommend />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.imgContainer}>
          <div className={styles.imgcontext}>
            <a href="https://www.notion.so/aaef50c8b3524ae9a29cf6449e744897" target="_blank">
              <div className={styles.p_box}>
                <h3>Notion</h3>
                <p>Jan 05. 2024</p>
              </div>
              <img src="https://blog.kakaocdn.net/dn/b096ff/btsEnS31kpu/JWqbMNxuxz4rJL5h8nMsVk/img.jpg"></img>
              <div className={styles.textContainer}>
                This is the notice page of Happiness meta. We usually record, organize, and plan our
                studies here.
              </div>
            </a>
          </div>
          <div className={styles.imgcontext}>
            <a
              href="https://www.notion.so/jaeseon-yang-tree/06e2f2d35dd741b1b136f1d0f43487a5?pvs=4"
              target="_blank"
            >
              <div className={styles.p_box}>
                <h3>Personalization</h3>
                <p>Jan 05. 2024</p>
              </div>
              <img src="https://blog.kakaocdn.net/dn/cd7E76/btsEttWjzlw/vgy6gbezenkYhcMqXPh1nK/img.jpg"></img>

              <div className={styles.textContainer}>
                Click to go to Yang Jae-sun's personal production page.
              </div>
            </a>
          </div>
          <div className={styles.imgcontext}>
            <div className={styles.p_box}>
              <h3>Notion</h3>
              <p>Jan 05. 2024</p>
            </div>
            <img src="https://blog.kakaocdn.net/dn/6fWwh/btsEqwFL7Vv/IAqXIGwlpKnabANPzI7Ww1/img.jpg"></img>
            <div className={styles.textContainer}>
              Last month, we released many new features and improvements designed to boost your
              productivity, collaboration, and coding experience on Replit. Some of the key
              highlights include:
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
