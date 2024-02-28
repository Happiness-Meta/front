import styles from "@/pages/homePage/homePage.module.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import HomePageStore from "@/store/HomePageStore/HomePageStore";
import Header from "./homePageComponents/Header";
import HomePageTitle from "./homePageComponents/HomePageTitle";
import IntroducingBox from "./homePageComponents/IntroducingBox";
import EarthImg from "./homePageComponents/EarthImg";

function HomePage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["email", "nickname", "token"]);
  const { isLaunched } = HomePageStore();

  const createStars = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className={styles.star}
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 3 + 3}s`,
        }}
      ></div>
    ));
  };

  if (isLaunched) {
    setTimeout(() => {
      if (!cookies.token) {
        navigate("/signInUpPage");
        return;
      }
      navigate("/dashboard");
    }, 2500);
  }

  return (
    <div className={styles.backSky}>
      {createStars(200)}
      <div className={styles.homePageContainer}>
        <Header />
        <HomePageTitle />
        <EarthImg />
        <IntroducingBox />
      </div>
    </div>
  );
}

export default HomePage;
