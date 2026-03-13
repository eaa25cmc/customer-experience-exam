// Hero-billedslider til forsiden – skifter automatisk mellem tre billeder hvert 4. sekund.
// Viser dot-navigation og et CTA-billede oven på slideren.
import { useState, useEffect } from "react";

import img1 from "../image/forsidebillede.png";
import img2 from "../image/forsidebillede2.png";
import img3 from "../image/forsidebillede3.png";
import heroCta from "../image/nyhederhero.svg";

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
      <img src={heroCta} alt="Shop nyheder" className="hero-cta" />

      <div className="hero-dots">
        <span className={current === 0 ? "dot active" : "dot"}></span>
        <span className={current === 1 ? "dot active" : "dot"}></span>
        <span className={current === 2 ? "dot active" : "dot"}></span>
      </div>
    </div>
  );
}
