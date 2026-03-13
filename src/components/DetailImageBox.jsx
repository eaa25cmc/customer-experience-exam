// Produktbilledgalleri – viser produktbilleder med dot-navigation, thumbnail-række og nyhed/sale-ikoner.
// Håndterer både produkter med direkte billeder og produkter med varianter.
import { useEffect, useState } from "react";
import styles from "./DetailImageBox.module.css";
import HeartIcon from "./HeartIcon";
import nyhedIcon from "../image/nyhed-ikon.svg";
import saleIcon from "../image/sale-ikon.svg";

export default function DetailImageBox({ product, className }) {
  const [validImages, setValidImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!product) return null;

  useEffect(() => {
    const images =
      product.images && product.images.length > 0
        ? product.images
        : product.variants &&
            product.variants.length > 0 &&
            product.variants[0].images &&
            product.variants[0].images.length > 0
          ? product.variants[0].images
          : ["/images/placeholder.jpg"];

    setValidImages(images.filter((src) => src && src.trim() !== ""));
    setActiveIndex(0);
  }, [product]);

  function handleImageError(src) {
    // Du kan fx sætte et fallback billede eller logge fejl
    console.warn("Billedet kunne ikke indlæses:", src);
  }

  return (
    <div className={className}>
      <section className={styles.imageWrapper}>
        {/* Vis det aktive billede */}
        {validImages[activeIndex] && (
          <img
            src={validImages[activeIndex]}
            alt={product.title}
            className={styles.image}
            onError={() => handleImageError(validImages[activeIndex])}
          />
        )}
        {/* Topbar med nyhed/sale og favorit */}
        <div className={styles.topBar}>
          <div className={styles.leftIcons}>
            {product.news && (
              <img src={nyhedIcon} alt="Nyhed" className={styles.nyhedBoks} />
            )}
            {product.sale && (
              <img src={saleIcon} alt="Sale" className={styles.saleBoks} />
            )}
          </div>
          {/* Dot-navigation til billeder */}
          <div className={styles.heartWrapper}>
            <HeartIcon className={styles.heartIcon} />
          </div>
        </div>
        <div className={styles.dotWrapper}>
          {validImages.map((_, idx) => (
            <span
              key={idx}
              className={
                idx === activeIndex
                  ? styles.dot + " " + styles.activeDot
                  : styles.dot
              }
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
        {/* Billedrække med thumbnails */}
        <div className={styles.imageRow}>
          {validImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt=""
              className={styles.variantImage}
              onClick={() => setActiveIndex(idx)}
              onError={() => handleImageError(src)}
            />
          ))}
          {/* Placeholder hvis der er færre end 4 billeder */}
          {Array.from({ length: 4 - validImages.length }).map((_, idx) => (
            <div key={`ph-${idx}`} className={styles.variantImage} />
          ))}
        </div>
      </section>
    </div>
  );
}
