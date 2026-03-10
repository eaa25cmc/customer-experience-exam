import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";
import Breadcrumbs from "./Breadcrumbs";

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedSub, setSelectedSub] = useState("all");

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/products.json");
      const data = await response.json();
      // Filtrer på over_kategori
      const filtered = data.filter((p) => p.over_kategori === category);
      setProducts(filtered);
    }
    fetchProducts();
  }, [category]);

  // Find unikke under_kategorier
  const subCategories = [
    ...new Set(products.map((p) => p.under_kategori)),
  ].sort();

  // Filtrer på valgt under_kategori
  const shownProducts =
    selectedSub === "all"
      ? products
      : products.filter((p) => p.under_kategori === selectedSub);

  return (
    <div>
      <Breadcrumbs />
      <h1>{category}</h1>
      <section className={styles.filterPanel} aria-label="Product filters">
        <div className={styles.categoryButtons}>
          <button
            className={`${styles.categoryButton} ${selectedSub === "all" ? styles.activeCategoryButton : ""}`}
            onClick={() => setSelectedSub("all")}
          >
            Alle
          </button>
          {subCategories.map((sub) => (
            <button
              key={sub}
              className={`${styles.categoryButton} ${selectedSub === sub ? styles.activeCategoryButton : ""}`}
              onClick={() => setSelectedSub(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      </section>
      <div className={styles.productGrid}>
        {shownProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
