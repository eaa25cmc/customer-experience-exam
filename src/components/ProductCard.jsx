// Produktkort – viser produktbillede, nyhed/sale-ikoner, favorit-hjerte, produktnavn og pris.
// Linker til produktdetaljesiden baseret på produkt-id eller variant-id.
import { Link } from "react-router-dom"; // Korrekt import til routing
import styles from "./ProductCard.module.css";
import HeartIcon from "./HeartIcon";
import nyhedIcon from "../image/nyhed-ikon.svg";
import saleIcon from "../image/sale-ikon.svg";

// Funktion der finder det første billede, enten fra images eller fra variant
function getFirstImage(product) {
  // Hvis produktet har images-array med mindst ét billede
  if (product.images && product.images.length > 0) {
    return product.images[0];
  }
  // Hvis produktet har varianter med billeder
  if (
    product.variants &&
    product.variants.length > 0 &&
    product.variants[0].images &&
    product.variants[0].images.length > 0
  ) {
    return product.variants[0].images[0];
  }
  // Hvis ingen billeder findes, vises placeholder
  return "/images/placeholder.jpg";
}

export default function ProductCard({ product, className }) {
  return (
    <div className={className}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          {/* Link til produktets detaljeside */}
          <Link
            to={
              product.variantId
                ? `/produkt/${product.parentId || product.id}-${product.variantId}`
                : `/produkt/${product.id}`
            }
            onClick={() => window.scrollTo(0, 0)}
            className={styles.cardLink}
          >
            {/* Viser første billede eller placeholder */}
            <img
              src={getFirstImage(product)}
              alt={product.title}
              className={styles.image}
            />
          </Link>
          <div className={styles.topBar}>
            <div className={styles.leftIcons}>
              {/* Nyhed-ikon */}
              {product.news && (
                <img src={nyhedIcon} alt="Nyhed" className={styles.nyhedBoks} />
              )}
              {/* Sale-ikon */}
              {product.sale && (
                <img src={saleIcon} alt="Sale" className={styles.saleBoks} />
              )}
            </div>
            <div className={styles.heartWrapper}>
              {/* Favorit-hjerte */}
              <HeartIcon className={styles.heartIcon} />
            </div>
          </div>
        </div>
        {/* Link til detaljeside med info */}
        <Link
          to={
            product.variantId
              ? `/produkt/${product.parentId || product.id}-${product.variantId}`
              : `/produkt/${product.id}`
          }
          onClick={() => window.scrollTo(0, 0)}
          className={styles.cardLink}
        >
          <div className={styles.info}>
            {/* Produktnavn eller fallback */}
            <h6 className={styles.title}>{product.title || "Produktnavn"}</h6>
            {/* Pris */}
            <p className={styles.price}>{product.price} DKK</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
