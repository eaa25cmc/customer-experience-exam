// Brandside – viser alle produkter tilhørende et specifikt brand.
// Brandet hentes fra URL-parameteren (:brandSlug) og matches mod products.json.
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Breadcrumbs from "../components/Breadcrumbs";
import styles from "../components/ProductGrid.module.css";

const brandMap = {
  dilling: "Dilling",
  "konges-slojd": "Konges Slojd",
  "lil-atelier": "Lil' Atelier",
  "mar-mar-copenhagen": "MarMar Copenhagen",
  "mini-rodini": "Mini Rodini",
  "serendipity-organics": "Serendipity Organics",
  wheat: "Wheat",
};

const brandTitleMap = {
  dilling: "Dilling",
  "konges-slojd": "Konges Sløjd",
  "lil-atelier": "Lil' Atelier",
  "mar-mar-copenhagen": "MarMar Copenhagen",
  "mini-rodini": "Mini Rodini",
  "serendipity-organics": "Serendipity Organics",
  wheat: "Wheat",
};

export default function BrandPage() {
  const { brandSlug } = useParams();
  const [products, setProducts] = useState([]);

  const brandName = brandMap[brandSlug];
  const pageTitle = brandTitleMap[brandSlug] || brandName;

  const breadcrumbItems = [{ label: pageTitle }];

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/products.json");
      const data = await response.json();

      const brandProducts = data.filter(
        (product) =>
          product.brand &&
          product.brand.trim().toLowerCase() === brandName?.toLowerCase(),
      );

      setProducts(brandProducts);
    }

    fetchProducts();
  }, [brandName]);

  return (
    <section>
      <Breadcrumbs items={breadcrumbItems} />
      <h1>{pageTitle}</h1>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
