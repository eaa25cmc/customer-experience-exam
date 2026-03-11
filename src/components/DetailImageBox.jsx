import styles from "./DetailImageBox.module.css";
import nyhedIcon from "../image/nyhed-ikon.svg";
import saleIcon from "../image/Sale-ikon.svg";

export default function DetailImageBox({ product }) {
  const images = product.images || [];
  const mainImage = images[0];

  return (
    <div className={styles.imageBox}>
      {/* Sale badge */}
      {product.sale && (
        <img src={saleIcon} alt="Sale" className={styles.saleBadge} />
      )}
      {/* Nyhed badge */}
      {product.news && (
        <img src={nyhedIcon} alt="Nyhed" className={styles.newsBadge} />
      )}
      <button className={styles.favoriteBtn} aria-label="Favorit">
        <span>♡</span>
      </button>
      <img src={mainImage} alt={product.title} className={styles.mainImage} />
      {/* ...resten af komponenten... */}
    </div>
  );
}
