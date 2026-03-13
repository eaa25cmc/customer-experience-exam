// Prepend Vite BASE_URL to paths stored in public/ (e.g. /product-pics/...)
// so they resolve correctly on GitHub Pages sub-directory deployments.
export function withBase(src) {
  if (!src) return src;
  return import.meta.env.BASE_URL + src.replace(/^\//, "");
}

export const SORT_OPTIONS = [
  { value: "alpha_asc", label: "Alfabetisk, A-Å" },
  { value: "alpha_desc", label: "Alfabetisk, Å-A" },
  { value: "price_asc", label: "Pris, lav til høj" },
  { value: "price_desc", label: "Pris, høj til lav" },
  { value: "newest", label: "Dato, nyere til ældre" },
  { value: "oldest", label: "Dato, ældre til nyere" },
];

export const PRICE_OPTIONS = [
  { value: "0-300", label: "0-300 DKK", min: 0, max: 300 },
  { value: "300-600", label: "300-600 DKK", min: 300, max: 600 },
  { value: "600-900", label: "600-900 DKK", min: 600, max: 900 },
  { value: "900-1200", label: "900-1200 DKK", min: 900, max: 1200 },
  { value: "1200+", label: "1200+ DKK", min: 1200, max: Infinity },
];

export const SIZE_GROUPS = [
  {
    label: "Baby",
    options: ["0-2 M", "4 M", "6 M", "9 M", "12 M", "18 M", "24 M"],
  },
  {
    label: "Barn",
    options: [
      "1 Ar",
      "2 Ar",
      "3-4 Ar",
      "5 Ar",
      "6 Ar",
      "8 Ar",
      "10 Ar",
      "12 Ar",
    ],
  },
];

const SIZE_TO_FILTER_LABEL = {
  56: "0-2 M",
  62: "4 M",
  68: "6 M",
  74: "9 M",
  80: "12 M",
  86: "18 M",
  92: "24 M",
  100: "1 Ar",
  104: "2 Ar",
  110: "3-4 Ar",
  116: "5 Ar",
  120: "6 Ar",
  128: "8 Ar",
  140: "10 Ar",
  150: "12 Ar",
};

const COLOR_LABELS = {
  black: "Sort",
  white: "Hvid",
  gray: "Grå",
  grey: "Grå",
  brown: "Brun",
  beige: "Beige",
  blue: "Blå",
  green: "Grøn",
  pink: "Lyserød",
  purple: "Lilla",
  red: "Rød",
  orange: "Orange",
  yellow: "Gul",
  rosa: "Lyserød",
};

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[_-]/g, " ");
}

function toTitle(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";

  return raw
    .replace(/[_-]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function colorToLabel(color) {
  const key = normalize(color);
  return COLOR_LABELS[key] || toTitle(color);
}

export function createEmptyFilters() {
  return {
    sort: "",
    colors: [],
    sizes: [],
    brands: [],
    genders: [],
    prices: [],
    types: [],
  };
}

function normalizeGenderValue(value) {
  const raw = String(value || "")
    .trim()
    .toLowerCase();

  if (raw === "pige") return "Pige";
  if (raw === "dreng") return "Dreng";
  if (raw === "baby") return "Baby";
  if (raw === "unisex") return "Unisex";

  return null;
}

function productToGenders(product) {
  const values = [];

  const addValue = (value) => {
    if (Array.isArray(value)) {
      value.forEach(addValue);
      return;
    }

    const raw = String(value || "")
      .trim()
      .toLowerCase();

    if (!raw) return;

    // Some products store combined values like "Pige Dreng".
    if (raw.includes("pige") && raw.includes("dreng")) {
      values.push("Pige", "Dreng");
      return;
    }

    const normalized = normalizeGenderValue(raw);
    if (normalized) values.push(normalized);
  };

  addValue(product?.gender);

  if (Array.isArray(product?.variants)) {
    product.variants.forEach((variant) => addValue(variant?.gender));
  }

  return [...new Set(values)];
}

export function productToColors(product) {
  const values = [];

  if (Array.isArray(product?.color_filter)) {
    values.push(...product.color_filter);
  }

  if (typeof product?.color_filter === "string") {
    values.push(product.color_filter);
  }

  if (Array.isArray(product?.variants)) {
    product.variants.forEach((variant) => {
      if (Array.isArray(variant?.color_filter)) {
        values.push(...variant.color_filter);
      }

      if (typeof variant?.color_filter === "string") {
        values.push(variant.color_filter);
      }
    });
  }

  return [...new Set(values.map(colorToLabel).filter(Boolean))];
}

export function productToSizeLabels(product) {
  const sizeLabels = new Set();

  const addFromSizeObject = (sizeObj) => {
    if (!sizeObj || typeof sizeObj !== "object") return;
    Object.entries(sizeObj).forEach(([size, available]) => {
      if (available && SIZE_TO_FILTER_LABEL[size]) {
        sizeLabels.add(SIZE_TO_FILTER_LABEL[size]);
      }
    });
  };

  addFromSizeObject(product?.size);

  if (Array.isArray(product?.variants)) {
    product.variants.forEach((variant) => addFromSizeObject(variant?.size));
  }

  return [...sizeLabels];
}

export function buildFilterOptions(products) {
  const brands = new Set();
  const genders = new Set();
  const types = new Set();
  const colors = new Set();

  products.forEach((product) => {
    const productGenders = productToGenders(product);
    if (product?.brand) brands.add(product.brand);
    productGenders.forEach((gender) => genders.add(gender));
    if (product?.under_kategori) types.add(product.under_kategori);
    productToColors(product).forEach((color) => colors.add(color));
  });

  return {
    sort: SORT_OPTIONS,
    colors: [...colors].sort(),
    sizes: SIZE_GROUPS,
    brands: [...brands].sort(),
    genders: ["Pige", "Dreng", "Baby", "Unisex"],
    prices: PRICE_OPTIONS,
    types: [...types].sort(),
  };
}

function matchesPriceRanges(price, selectedRanges) {
  if (selectedRanges.length === 0) return true;
  return selectedRanges.some((rangeValue) => {
    const range = PRICE_OPTIONS.find((option) => option.value === rangeValue);
    if (!range) return false;
    return price >= range.min && price < range.max;
  });
}

function productName(product) {
  return (product?.name || product?.title || "").toLowerCase();
}

export function applyProductFilters(products, filters) {
  const filtered = products.filter((product) => {
    const colors = productToColors(product);
    const sizes = productToSizeLabels(product);
    const genders = productToGenders(product);

    const colorMatch =
      filters.colors.length === 0 ||
      filters.colors.some((color) => colors.includes(color));

    const sizeMatch =
      filters.sizes.length === 0 ||
      filters.sizes.some((size) => sizes.includes(size));

    const brandMatch =
      filters.brands.length === 0 || filters.brands.includes(product.brand);

    const genderMatch =
      filters.genders.length === 0 ||
      filters.genders.some((gender) => genders.includes(gender));

    const typeMatch =
      filters.types.length === 0 ||
      filters.types.includes(product.under_kategori);

    const priceMatch = matchesPriceRanges(
      Number(product.price || 0),
      filters.prices,
    );

    return (
      colorMatch &&
      sizeMatch &&
      brandMatch &&
      genderMatch &&
      typeMatch &&
      priceMatch
    );
  });

  if (!filters.sort) return filtered;

  const sorted = [...filtered];

  switch (filters.sort) {
    case "alpha_asc":
      sorted.sort((a, b) => productName(a).localeCompare(productName(b), "da"));
      break;
    case "alpha_desc":
      sorted.sort((a, b) => productName(b).localeCompare(productName(a), "da"));
      break;
    case "price_asc":
      sorted.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
      break;
    case "price_desc":
      sorted.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
      break;
    case "newest":
      sorted.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
      break;
    case "oldest":
      sorted.sort((a, b) => Number(a.id || 0) - Number(b.id || 0));
      break;
    default:
      break;
  }

  return sorted;
}
