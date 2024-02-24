import styles from "./node/node.module.css";

const SetFileTreeIcon = (name: string) => {
  const draftCheck = name.includes(".");
  let iconSvg;
  if (!draftCheck || name.includes("txt")) {
    iconSvg = <img src={`/svg/draft.svg`} className={styles.directoryIcon} />;
    return iconSvg;
  }
  const icon = name!.toString().split(".").pop();

  try {
    require(`/svg/${icon}.svg`);
    iconSvg = <img src={`/svg/draft.svg`} className={styles.directoryIcon} />;
    return iconSvg;
  } catch (error) {
    iconSvg = <img src={`/svg/draft.svg`} className={styles.directoryIcon} />;
  }

  iconSvg = <img src={`/svg/${icon}.svg`} className={styles.fileIcon} />;

  return iconSvg;
};

export default SetFileTreeIcon;
