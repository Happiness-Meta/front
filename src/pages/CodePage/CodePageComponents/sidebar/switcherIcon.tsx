import { TreeProps } from "rc-tree";
import styles from "./sidebar.module.css";

const switcherIcon: TreeProps["switcherIcon"] = (extension) => {
  let icon = extension.title!.toString().split(".").pop();
  const isDirectory = extension.data!.children;
  let iconSvg;
  if (isDirectory) {
    icon = extension.expanded ? "openFolder" : "closedFolder";
  } else if (!extension.title!.toString().includes(".")) {
    icon = "draft";
  }
  iconSvg = <img src={`/svg/${icon}.svg`} className={styles.fileIcon} />;
  if (icon === "openFolder" || icon === "closedFolder" || icon === "draft") {
    iconSvg = <img src={`/svg/${icon}.svg`} className={styles.directoryIcon} />;
  }
  return iconSvg;
};

export default switcherIcon;
