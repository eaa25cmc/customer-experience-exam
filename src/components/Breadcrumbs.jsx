// Brødkrummenavigation – opbygger automatisk navigation ud fra URL-parametre (køn, kategori, underkategori).
// Kan også modtage eksplicitte items-props fra forrældrekomponenten.
import { NavLink, useParams } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({ items }) {
  const { gender, mainCategory, subcategory } = useParams();

  const labelMap = {
    baby: "Baby",
    pige: "Pige",
    dreng: "Dreng",

    overtoj: "Overtøj",
    overdele: "Overdele",
    accessories: "Accessories",
    underdele: "Underdele",
    fodtoj: "Fodtøj",
    undertojognattoj: "Undertøj & nattøj",

    udsalg: "Udsalg",
    nyheder: "Nyheder",
    inspiration: "Inspiration",

    flyverdragt: "Flyverdragt",
    regntoj: "Regntøj",
    jakker: "Jakker",
    huerogvanter: "Huer og vanter",
    termotoj: "Termotøj",

    strik: "Strik",
    bluser: "Bluser",
    skjorter: "Skjorter",
    tshirt: "T-shirt",
    kjoler: "Kjoler",
    bodyer: "Bodyer",
    cardigans: "Cardigans",

    stromper: "Strømper",
    hatte: "Hatte",
    badetoj: "Badetøj",
    harpynt: "Hårpynt",

    shorts: "Shorts",
    jeans: "Jeans",
    bukser: "Bukser",
    nederdele: "Nederdele",
    legginsogstrompebukser: "Leggins og strømpebukser",

    sko: "Sko",
    stovler: "Støvler",
    gummistovler: "Gummistøvler",
    sandaler: "Sandaler",
    futter: "Futter",
  };

  const getLabel = (value) => labelMap[value] || value;

  const autoItems = [
    gender && { label: getLabel(gender) },
    mainCategory && { label: getLabel(mainCategory) },
    subcategory && { label: getLabel(subcategory) },
  ].filter(Boolean);

  const breadcrumbItems = items || autoItems;

  return (
    <nav className={styles.breadcrumbs}>
      <NavLink to="/">Forside</NavLink>

      {breadcrumbItems.map((item, index) => (
        <span key={index}>
          {" > "}
          {item.to ? (
            <NavLink to={item.to}>{item.label}</NavLink>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
