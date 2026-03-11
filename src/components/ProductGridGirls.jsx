import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";
import Breadcrumbs from "./Breadcrumbs";

export default function ProductGridGirls() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const url = "/products.json";
      const response = await fetch(url);
      const data = await response.json();

      // Flad listen ud, så hver variant bliver et produktkort
      const allProducts = data.flatMap((product) => {
        if (product.variants && product.variants.length > 0) {
          return product.variants.map((variant, idx) => ({
            ...variant,
            id: product.id + "-" + idx,
            mainTitle: product.title,
            price: product.price,
            gender: variant.gender || product.gender,
            over_kategori: product.over_kategori,
            under_kategori: product.under_kategori,
            brand: product.brand,
            description: product.description,
            materiale: product.materiale,
            pasform: product.pasform,
            rating: product.rating,
            news: product.news,
            sale: product.sale,
            available: product.available,
            images: variant.images || product.images,
          }));
        }
        return [product];
      });

      // Filtrér på gender EFTER flatten
      const girlsAndUnisex = allProducts.filter(
        (product) =>
          product.gender === "Pige" ||
          product.gender === "Unisex" ||
          (Array.isArray(product.gender) && product.gender.includes("Pige")) ||
          (Array.isArray(product.gender) && product.gender.includes("Unisex")),
      );

      setProducts(girlsAndUnisex);
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
      <h1>Piger</h1>
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
