import globalStore from "@/store/globalStore/globalStore";
import TypeIt from "typeit-react";
import styles from "../editorSpace.module.css";

const WelcomeText = () => {
  const { mode } = globalStore();

  const textStyle = {
    backgroundImage: "linear-gradient(to right, pink, skyblue)",
    WebkitBackgroundClip: "text", // 텍스트 색깔을 그라데이션에 맞추기 위한 설정
    color: "transparent", // 텍스트 자체의 색깔을 투명하게 설정
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <div
      className={styles.hideCodeEditor}
      style={
        mode ? { backgroundColor: "white" } : { backgroundColor: "#1e1e1e" }
      }
    >
      <TypeIt
        style={textStyle}
        options={{ loop: true }}
        getBeforeInit={(instance) => {
          instance
            .type(`Welcome to Earth-IDE-N`)
            .pause(500)
            .delete(100)
            .type(`You can start coding with us!`)
            .pause(500)
            .delete(100)
            .type(`Chat with your friends while coding!`)
            .pause(500)
            .delete(100)
            .pause(200);

          return instance;
        }}
      />
    </div>
  );
};

export default WelcomeText;
