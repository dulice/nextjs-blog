import { useEffect, useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import styles from './hero.module.css';

const Hero = () => {
    const [earthPos, setEarthPos] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setEarthPos(-window.scrollY);
        }
      window.addEventListener('scroll', handleScroll )
    
      return () => {
        window.removeEventListener('scroll', handleScroll);
      }
    }, [])

  return (
    // <div className="position-relative vh-100 overflow-hidden mb-4">
    //  <img className="position-absolute left-0 bottom-0" src="/stars.jpg" alt="" />
    //  <img className="position-absolute center" src="/person.png" alt="" style={{width: 500 + earthPos + 'px', objectFit: "contain"}}/>
    //  <img className="position-absolute -bottom-10" src="/earth.png" alt="" style={{marginLeft: earthPos + 'px'}}/>
    //  <img className="position-absolute -top-10" src="/moon.png" alt="" style={{marginTop: earthPos + 'px'}}/>   
    // </div>
    <>
      <ParallaxLayer offset={0} speed={-0.15} >
        <div className={`${styles.moon} ${styles.parallax}`}></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.1}>
        <div className={`${styles.person} ${styles.parallax}`}></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.05}>
        <div className={`${styles.black} ${styles.parallax}`}></div>
      </ParallaxLayer>
    </>
  );
};

export default Hero;
