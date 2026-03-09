const brands = [
  {
    name: "Dilling",
    image: "/brands/dilling.webp",
  },
  {
    name: "Konges Sløjd",
    image: "/brands/konges-slojd.webp",
  },
  {
    name: "Lil' Atelier",
    image: "/brands/lil-atelier.webp",
  },
  {
    name: "MarMar Copenhagen",
    image: "/brands/marmar-copenhagen.webp",
  },
  {
    name: "Mini Rodini",
    image: "/brands/mini-rodini.webp",
  },
];

export default function BrandCarousel() {
  return (
    <section className="brand-section">
      <h2 className="brand-heading">Populære brands</h2>

      <div className="brand-scroll">
        {brands.map((brand) => (
          <article className="brand-card" key={brand.name}>
            <img src={brand.image} alt={brand.name} className="brand-image" />
            <div className="brand-label">{brand.name}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
