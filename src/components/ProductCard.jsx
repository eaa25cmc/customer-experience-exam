import { Link } from "react-router";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      {/* Top bar med Nyhed og hjerte */}
      <div className={styles.topBar}>
        <div className={styles.nyhedBoks}>Nyhed</div>
        <div className={styles.hjerteIkon}>♡</div>
      </div>
      <img src={product.image} alt={product.name} className={styles.image} />
      <div className={styles.info}>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.price}>{product.price} DKK</p>
      </div>
      <Link to={`/products/${product.id}`} className={styles.link}>
        View Details
      </Link>
    </div>
  );
}
