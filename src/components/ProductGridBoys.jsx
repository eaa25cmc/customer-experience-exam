import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";
import Breadcrumbs from "./Breadcrumbs";

export default function ProductGridBoys() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const url = "/products.json";
      const response = await fetch(url);
      const data = await response.json();
      // Filtrer kun drenge-produkter
      const boysProducts = data.filter((product) => product.gender === "Dreng");
      setProducts(boysProducts);
    }
    fetchProducts();
  }, []);

  // Find unikke over_kategorier
  const categories = [
    ...new Set(products.map((product) => product.over_kategori)),
  ].sort();

  return (
    <div>
      <Breadcrumbs />
      <h1>Drenge</h1>
      <section className={styles.filterPanel} aria-label="Product filters">
        <div className={styles.categoryButtons}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={styles.categoryButton}
              onClick={() => navigate(`/kategori/${category}`)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
