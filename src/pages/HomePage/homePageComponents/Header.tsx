import styles from "@/pages/homePage/homePage.module.css";
import HomePageStore from "@/store/HomePageStore/HomePageStore";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["email", "nickname", "token"]);
  const { isLaunched, setIsLaunched } = HomePageStore();

  const removeCookies = () => {
    removeCookie("email");
    removeCookie("nickname");
    removeCookie("token");
  };

  return (
    <>
      {cookies.token ? (
        <header
          className={styles.homepageHeader}
          style={{ display: isLaunched ? "none" : undefined }}
        >
          <div
            className={styles.startBtn}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Get started
          </div>
          <div className={styles.signBtn} onClick={() => removeCookies()}>
            Log out
          </div>
        </header>
      ) : (
        <header
          className={styles.homepageHeader}
          style={{ display: isLaunched ? "none" : undefined }}
        >
          <div
            className={styles.signBtn}
            onClick={() => {
              setIsLaunched(true);
            }}
          >
            SIGN IN
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
