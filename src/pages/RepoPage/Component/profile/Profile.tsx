import styles from "./Profile.module.css";
import headerStore from "../../../../store/CodePageStore/headerStore";
export default function Profile() {
  const { mode } = headerStore();
  return (
    <div
      className={styles.accountImg}
      style={mode ? { borderColor: "black" } : { borderColor: "white" }}
    ></div>
  );
}
