import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";
import Breadcrumbs from "./Breadcrumbs";
import CategoryFilterPanel from "./CategoryFilterPanel";
import FilterOverlay from "./FilterOverlay";
import {
  applyProductFilters,
  buildFilterOptions,
  createEmptyFilters,
} from "../utils/productFilters";

const genderMap = {
  baby: "Baby",
  pige: "Pige",
  dreng: "Dreng",
};

const mainCategoryMap = {
  overtoj: "Overtøj",
  overdele: "Overdele",
  accessories: "Accessories",
  underdele: "Underdele",
  fodtoj: "Fodtøj",
  undertojognattoj: "Undertøj & nattøj",
  udsalg: "Udsalg",
  nyheder: "Nyheder",
};

const subMap = {
  flyverdragt: "Flyverdragt",
  regntoj: "Regntøj",
  jakker: "Jakke",
  huerogvanter: "Hue og vanter",
  termotoj: "Termotøj",

  strik: "Strik",
  bluser: "Bluse",
  skjorter: "Skjorte",
  tshirt: "T-shirt",
  kjoler: "Kjole",
  bodyer: "Bodyer",
  cardigans: "Cardigan",

  stromper: "Strømper",
  hatte: "Hat",
  badetoj: "Badetøj",
  harpynt: "Hårpynt",

  shorts: "Shorts",
  jeans: "Jeans",
  bukser: "Bukser",
  nederdele: "Nederdel",
  legginsogstrompebukser: "Leggins og strømpebukser",

  sko: "Sko",
  stovler: "Støvler",
  gummistovler: "Gummistøvler",
  sandaler: "Sandaler",
  futter: "Futter",
};

export default function CategoryPage() {
  const { gender, mainCategory, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedSub, setSelectedSub] = useState("all");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(createEmptyFilters());
  const [draftFilters, setDraftFilters] = useState(createEmptyFilters());

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/products.json");
      const data = await response.json();

      let filtered = data;

      if (genderMap[gender]) {
        filtered = filtered.filter((p) => p.gender === genderMap[gender]);
      }

      if (mainCategory === "udsalg") {
        filtered = filtered.filter((p) => p.sale === true);
      } else if (mainCategory === "nyheder") {
        filtered = filtered.filter((p) => p.news === true);
      } else if (mainCategoryMap[mainCategory]) {
        filtered = filtered.filter(
          (p) => p.over_kategori === mainCategoryMap[mainCategory],
        );

        if (subcategory) {
          const mappedSub = subMap[subcategory];

          if (mappedSub) {
            filtered = filtered.filter((p) => p.under_kategori === mappedSub);
          } else {
            filtered = [];
          }
        }
      }

      setProducts(filtered);
      setSelectedSub("all");
      setActiveFilters(createEmptyFilters());
      setDraftFilters(createEmptyFilters());
    }

    fetchProducts();
  }, [gender, mainCategory, subcategory]);

  const subCategories = [
    ...new Set(products.map((p) => p.under_kategori)),
  ].sort();

  const shownProducts =
    selectedSub === "all"
      ? products
      : products.filter((p) => p.under_kategori === selectedSub);

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
    setSelectedSub("all");
  };

  return (
    <div>
      <Breadcrumbs />

      <h1>{mainCategoryMap[mainCategory] || mainCategory}</h1>

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

      <CategoryFilterPanel
        subCategories={subCategories}
        selectedSub={selectedSub}
        setSelectedSub={setSelectedSub}
      />

      <div className={styles.productGrid}>
        {finalProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
