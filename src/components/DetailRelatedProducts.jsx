// "Relaterede produkter" karrusel – viser produkter fra samme underkategori som det aktuelle produkt.
// Hvis der er færre end 4, suppleres der med produkter fra samme brand.
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import styles from "./DetailRelatedProducts.module.css";

export default function DetailRelatedProducts({ currentProduct, allProducts }) {
  // Filtrer relaterede produkter ud fra under_kategori
  let relatedProducts = allProducts.filter(
    (product) =>
      product.under_kategori === currentProduct.under_kategori &&
      product.id !== currentProduct.id,
  );

  // Hvis der er under 4, tilføj relaterede via brand (uden duplikater)
  if (relatedProducts.length < 4) {
    const brandProducts = allProducts.filter(
      (product) =>
        product.brand === currentProduct.brand &&
        product.id !== currentProduct.id &&
        !relatedProducts.some((p) => p.id === product.id),
    );
    relatedProducts = [...relatedProducts, ...brandProducts];
  }

  if (relatedProducts.length === 0) return null;

  return (
    <section className={styles.relatedProductsSection}>
      <div className={styles.relatedProductsHeader}>
        <h3>Relaterede produkter</h3>
      </div>
      <div className={styles.relatedProductsCarousel}>
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/produkt/${product.id}`}
            className={styles.relatedProductCard}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}
