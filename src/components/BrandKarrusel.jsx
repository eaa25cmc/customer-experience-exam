import "./BrandKarrusel.css";

import img1 from "../image/Dilling-3.png";
import img2 from "../image/Kongessløjd3.png";
import img3 from "../image/LilAtelier3.png";
import img4 from "../image/MarMarCopenhagen3.png";
import img5 from "../image/MiniRodini3.png";
import img6 from "../image/SerendipityOrganics3.png";
import img7 from "../image/Wheat3.png";

export default function BrandCarousel() {
  const brands = [
    { name: "Dilling", image: img1 },
    { name: "Konges Sløjd", image: img2 },
    { name: "Lil' Atelier", image: img3 },
    { name: "MarMar Copenhagen", image: img4 },
    { name: "Mini Rodini", image: img5 },
    { name: "Serendipity Organics", image: img6 },
    { name: "Wheat", image: img7 },
  ];

  return (
    <section className="brand-section">
      <h3>Populære brands</h3>

      <div className="brand-row">
        {brands.map((brand) => (
          <div className="brand-card" key={brand.name}>
            <img src={brand.image} alt={brand.name} className="brand-image" />
            <h3 className="brand-text">{brand.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
