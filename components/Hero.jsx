import { ParallaxLayer } from "@react-spring/parallax";
import styles from './hero.module.css';
import Header from "./Header";

const Hero = () => {
  return (
    <>
      <ParallaxLayer offset={0} speed={-0.15} >
        <div className={`${styles.moon} ${styles.parallax}`}>
        </div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.1}>
        <div className={`${styles.person} ${styles.parallax}`}></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.05}>
        <div className={`${styles.black} ${styles.parallax}`}><Header className="bg-transparent"/></div>
      </ParallaxLayer>
    </>
  );
};

export default Hero;
