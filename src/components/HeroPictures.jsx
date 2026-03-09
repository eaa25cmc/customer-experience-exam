import { useState, useEffect } from "react";

import img1 from "../image/Desktop-forside-1.png";
import img2 from "../image/Desktop-forside-2.png";
import img3 from "../image/Desktop-forside.png";

export default function HeroPictures() {
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (current === 2) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="hero-slider">
      <img src={images[current]} alt="Hero billede" className="hero-image" />
    </div>
  );
}
