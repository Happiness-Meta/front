import sidebarStore from "../../../../../store/CodePageStore/sidebarStore";
import styles from "./editorSettingBtn.module.css";

function EditorSettingBtn() {
  const { settings, settingsToggle, incCodeFontSize, decCodeFontSize } =
    sidebarStore();
  return (
    <div
      className={`${settings ? styles.settingsSpaceOn : undefined} ${
        styles.settingsSpace
      }`}
    >
      <div className={styles.settingsLeft}>
        <i
          className={`${styles.settings} material-symbols-outlined`}
          onClick={settingsToggle}
        >
          settings
        </i>
      </div>
      <div className={styles.settingsRight}>
        <div
          onClick={decCodeFontSize}
          className={`${styles.addRemove} material-symbols-outlined`}
        >
          remove
        </div>
        <div
          onClick={incCodeFontSize}
          className={`${styles.addRemove} material-symbols-outlined`}
        >
          add
        </div>
      </div>
    </div>
  );
}

export default EditorSettingBtn;
