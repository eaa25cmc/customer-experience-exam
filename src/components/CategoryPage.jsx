// Dynamisk kategoriside – viser produkter filtreret på køn, overkategori og underkategori fra URL-parametre.
// Indeholder også avanceret filteroverlay med sortering, farver, størrelser og brands.
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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(createEmptyFilters());
  const [draftFilters, setDraftFilters] = useState(createEmptyFilters());

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(`${import.meta.env.BASE_URL}products.json`);
      const data = await response.json();

      let filtered = data;
      const initialFilters = createEmptyFilters();

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
      }

      if (subcategory) {
        const mappedSub = subMap[subcategory];

        if (mappedSub) {
          initialFilters.types = [mappedSub];
        }
      }

      setProducts(filtered);
      setActiveFilters(initialFilters);
      setDraftFilters(initialFilters);
    }

    fetchProducts();
  }, [gender, mainCategory, subcategory]);

  const handleSubCategoryChange = (sub) => {
    const nextTypes = sub === "all" ? [] : [sub];

    setActiveFilters((prev) => ({
      ...prev,
      types: nextTypes,
    }));

    setDraftFilters((prev) => ({
      ...prev,
      types: nextTypes,
    }));
  };

  const subCategories = [
    ...new Set(products.map((p) => p.under_kategori)),
  ].sort();

  const filterOptions = buildFilterOptions(products);
  const finalProducts = applyProductFilters(products, activeFilters);

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
        selectedSub={activeFilters.types[0] || "all"}
        setSelectedSub={handleSubCategoryChange}
      />

      <div className={styles.productGrid}>
        {finalProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
