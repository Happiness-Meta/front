import styles from "@/pages/homePage/homePage.module.css";
import HomePageStore from "@/store/HomePageStore/HomePageStore";

const EarthImg = () => {
  const { isLaunched } = HomePageStore();

  return (
    <img
      src="https://blog.kakaocdn.net/dn/2sdHV/btsEdHtN2Px/V0a6TqK2tXooCXhLKKDMk0/img.png"
      className={`${isLaunched ? styles.diveIn : styles.earthImg} `}
    />
  );
};

export default EarthImg;
