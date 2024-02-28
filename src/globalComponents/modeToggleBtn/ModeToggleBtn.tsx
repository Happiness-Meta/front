import styles from "./modeToggleBtn.module.css";
import globalStore from "@/store/globalStore/globalStore";

function ModeToggleBtn() {
  const { mode, modeToggle } = globalStore();

  const handleMode = () => {
    if (document.querySelector("body")!.dataset.theme === "dark") {
      document.body.dataset.theme = "light";
    } else {
      document.body.dataset.theme = "dark";
    }
  };

  return (
    <i
      className={`${mode ? styles.modeAniT : styles.modeAniF} material-icons`}
      onClick={() => {
        modeToggle();
        handleMode();
      }}
    >
      {mode ? `light_mode` : `dark_mode`}
    </i>
  );
}

export default ModeToggleBtn;
