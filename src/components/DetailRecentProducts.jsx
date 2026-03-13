// "Sidst set" karrusel – henter de senest besøgte produkter fra localStorage og viser dem som produktkort.
// Returnerer null og vises ikke, hvis der ikke er nogen sidst set produkter.
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import styles from "./DetailRecentProducts.module.css";

const RECENT_PRODUCTS_KEY = "recentProducts";

export default function DetailRecentProducts() {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const products =
      JSON.parse(localStorage.getItem(RECENT_PRODUCTS_KEY)) || [];
    setRecentProducts(products);
  }, []);

  if (recentProducts.length === 0) return null;

  return (
    <section className={styles.recentProductsSection}>
      <h3 className={styles.recentProductsTitle}>Sidst set</h3>

      <div className={styles.recentProductsCarousel}>
        {recentProducts.map((product) => (
          <Link
            key={product.id}
            to={`/produkt/${product.id}`}
            className={styles.recentProductCard}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}
