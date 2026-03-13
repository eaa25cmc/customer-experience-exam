// Brandkarrusel til forsiden – viser alle syv brands med billede og link til den respektive brandside.
import { Link } from "react-router-dom";
import "./BrandKarrusel.css";

import img1 from "../image/Dilling-3.png";
import img2 from "../image/Kongessløjd3.png";
import img3 from "../image/LilAtelier3.png";
import img4 from "../image/MarMarCopenhagen3.png";
import img5 from "../image/MiniRodini3.png";
import img6 from "../image/SerendipityOrganics3.png";
import img7 from "../image/Wheat3.png";
import img8 from "../image/dillingcta.svg";
import img9 from "../image/kongessløjdcta.svg";
import img10 from "../image/lilateliercta.svg";
import img11 from "../image/marmarcta.svg";
import img12 from "../image/minirodinicta.svg";
import img13 from "../image/serendipityorganicscta.svg";
import img14 from "../image/wheatcta.svg";

export default function Brandkarrusel() {
  const brands = [
    { name: "Dilling", image: img1, cta: img8, slug: "dilling" },
    { name: "Konges Sløjd", image: img2, cta: img9, slug: "konges-slojd" },
    { name: "Lil' Atelier", image: img3, cta: img10, slug: "lil-atelier" },
    {
      name: "MarMar Copenhagen",
      image: img4,
      cta: img11,
      slug: "mar-mar-copenhagen",
    },
    { name: "Mini Rodini", image: img5, cta: img12, slug: "mini-rodini" },
    {
      name: "Serendipity Organics",
      image: img6,
      cta: img13,
      slug: "serendipity-organics",
    },
    { name: "Wheat", image: img7, cta: img14, slug: "wheat" },
  ];

  return (
    <section className="brand-section">
      <h3>Populære brands</h3>

      <div className="brand-row">
        {brands.map((brand) => (
          <div className="brand-card" key={brand.name}>
            <img src={brand.image} alt={brand.name} className="brand-image" />
            <Link to={`/brand/${brand.slug}`} className="brand-link">
              <img src={brand.cta} alt={brand.name} className="brand-cta" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
