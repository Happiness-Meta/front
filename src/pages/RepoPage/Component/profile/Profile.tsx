import styles from "./Profile.module.css";
import headerStore from "../../../../store/CodePageStore/headerStore";
import { useCookies } from "react-cookie";
export default function Profile() {
  const { mode } = headerStore();
  const [cookies] = useCookies();

  const FScharacters = cookies.email.slice(0, 2).toUpperCase();

  return (
    <div
      className={styles.accountImg}
      style={{
        borderColor: mode ? "black" : "white",
      }}
    >
      {FScharacters}
    </div>
  );
}
