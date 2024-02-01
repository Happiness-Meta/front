import React from "react";
import styles from "./modeToggleBtn.module.css";
import headerStore from "../../store/CodePageStore/headerStore";

function ModeToggleBtn() {
  const { mode, modeToggle } = headerStore();

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
      {mode ? `dark_mode` : `light_mode`}
    </i>
  );
}

export default ModeToggleBtn;
