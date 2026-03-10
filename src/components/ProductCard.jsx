import { Link } from "react-router";
import { useState } from "react";
import styles from "./ProductCard.module.css";
import HeartIcon from "./HeartIcon";
import nyhedIcon from "../image/nyhed-ikon.svg";
import saleIcon from "../image/Sale-ikon.svg";

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function toggleFavorite() {
    setIsFavorite((prev) => !prev);
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link to={`/products/${product.id}`} className={styles.cardLink}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
        </Link>
        <div className={styles.topBar}>
          <div className={styles.leftIcons}>
            {product.news && (
              <img src={nyhedIcon} alt="Nyhed" className={styles.nyhedBoks} />
            )}
            {product.sale && (
              <img src={saleIcon} alt="Sale" className={styles.saleBoks} />
            )}
          </div>
          <div className={styles.heartWrapper}>
            <HeartIcon
              filled={isFavorite}
              onClick={toggleFavorite}
              className={styles.heartIcon}
            />
          </div>
        </div>
        <Link to={`/products/${product.id}`} className={styles.cardLink}>
          <div className={styles.info}>
            <h5 className={styles.title}>{product.name || "Produktnavn"}</h5>
            <p className={styles.price}>{product.price} DKK</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
