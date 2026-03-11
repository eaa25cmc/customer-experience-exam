import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";
import Breadcrumbs from "./Breadcrumbs";
import FilterOverlay from "./FilterOverlay";
import {
  applyProductFilters,
  buildFilterOptions,
  createEmptyFilters,
} from "../utils/productFilters";

export default function ProductGridBoys() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(createEmptyFilters());
  const [draftFilters, setDraftFilters] = useState(createEmptyFilters());

  useEffect(() => {
    async function fetchProducts() {
      const url = "/products.json";
      const response = await fetch(url);
      const data = await response.json();
      // Filtrer kun drenge-produkter
      const boysProducts = data.filter((product) => product.gender === "Dreng");
      setProducts(boysProducts);
      setSelectedCategory("all");
      setActiveFilters(createEmptyFilters());
      setDraftFilters(createEmptyFilters());
    }
    fetchProducts();
  }, []);

  // Find unikke over_kategorier
  const categories = [
    ...new Set(products.map((product) => product.over_kategori)),
  ].sort();

  const shownProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.over_kategori === selectedCategory,
        );

  const filterOptions = buildFilterOptions(products);
  const finalProducts = applyProductFilters(shownProducts, activeFilters);

  const openMobileFilter = () => {
    setDraftFilters(activeFilters);
    setIsMobileFilterOpen(true);
  };

  const applyMobileFilter = () => {
    setActiveFilters(draftFilters);
    setIsMobileFilterOpen(false);
  };

  const resetMobileFilter = () => {
    const empty = createEmptyFilters();
    setActiveFilters(empty);
    setDraftFilters(empty);
    setSelectedCategory("all");
  };

  return (
    <div>
      <Breadcrumbs />
      <h1>Drenge</h1>

      <FilterOverlay
        isOpen={isMobileFilterOpen}
        onOpen={openMobileFilter}
        onClose={() => setIsMobileFilterOpen(false)}
        options={filterOptions}
        draftFilters={draftFilters}
        onDraftFiltersChange={setDraftFilters}
        onReset={resetMobileFilter}
        onApply={applyMobileFilter}
      />

      <section className={styles.filterPanel} aria-label="Product filters">
        <div className={styles.categoryButtons}>
          <button
            type="button"
            className={`${styles.categoryButton} ${selectedCategory === "all" ? styles.activeCategoryButton : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            Alle
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.activeCategoryButton : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      <div className={styles.productGrid}>
        {finalProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
