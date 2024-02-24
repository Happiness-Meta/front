import styles from "./sidebar.module.css";
import sidebarStore from "../../../../store/CodePageStore/sidebarStore";
import Profile from "../../Component/profile/Profile";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function Sidebar() {
  const { expandStatus } = sidebarStore();
  const { sidebar } = sidebarStore();
  const [cookies] = useCookies();

  return (
    <div
      className={`${sidebar ? styles.sidebarToggle : undefined} ${
        styles.sidebarSpace
      }`}
    >
      <form>
        <input
          type="text"
          className={styles.search_input}
          placeholder="Search"
        ></input>
      </form>

      <div className={styles.filesSpace}>
        <div className={styles.filesHeader}>
          <div className={styles.TitleSpace}></div>
        </div>
        <div
          className={`${expandStatus ? styles.FCExpandStatus : undefined} ${
            styles.fileContainer
          }`}
        ></div>
      </div>
      <div className={styles.profileContainer}>
        <Link to="/dashboard" className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <Profile />
          </div>
          <div className={styles.profilename}>
            <h3 style={{ width: "100%", overflow: "hidden" }}>
              {cookies.nickname}
            </h3>
            <h5 style={{ width: "100%", overflow: "hidden" }}>
              {cookies.email}
            </h5>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
