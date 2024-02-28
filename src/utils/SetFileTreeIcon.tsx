import styles from "@/globalComponents/node/node.module.css";

const SetFileTreeIcon = (name: string) => {
  const draftCheck = name.includes(".");
  let iconSvg;
  if (!draftCheck || name.includes("txt")) {
    iconSvg = <img src={`/svg/draft.svg`} className={styles.directoryIcon} />;
    return iconSvg;
  }
  const icon = name!.toString().split(".").pop();

  iconSvg = <img src={`/svg/${icon}.svg`} className={styles.fileIcon} />;

  return iconSvg;
};

export default SetFileTreeIcon;
