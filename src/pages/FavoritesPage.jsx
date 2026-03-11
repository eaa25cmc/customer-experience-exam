import { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import "./FavoritesPage.css";

const initialFavorites = [
  {
    id: 1,
    name: "langærmet strik top",
    price: "227,95 DKK",
    image: "/src/image/64.png",
    badge: "+15%",
    sizes: ["86", "92", "98", "104", "110", "116"],
  },
  {
    id: 2,
    name: "økologisk bomuld top",
    price: "143,95 DKK",
    image: "/src/image/70-1.png",
    badge: "+15%",
    sizes: ["56", "62", "68", "74", "80", "86"],
  },
  {
    id: 3,
    name: "elva kjole eggshell",
    price: "449,00 DKK",
    image: "/src/image/71-1.png",
    badge: "Nyhed",
    sizes: ["98", "104", "110", "116", "122", "128"],
  },
  {
    id: 4,
    name: "mimmi bluse tramonto",
    price: "279,95 DKK",
    image: "/src/image/1-1.png",
    sizes: ["74", "80", "86", "92", "98", "104"],
  },
  {
    id: 5,
    name: "savora cardigan",
    price: "299,95 DKK",
    image: "/src/image/81-1.png",
    badge: "Nyhed",
    sizes: ["86", "92", "98", "104", "110"],
  },
  {
    id: 6,
    name: "regular strikket top",
    price: "259,95 DKK",
    image: "/src/image/62-1.png",
    sizes: ["92", "98", "104", "110", "116"],
  },
  {
    id: 7,
    name: "nyfødt slå-om body",
    price: "249,00 DKK",
    image: "/src/image/93-1.png",
    badge: "Nyhed",
    sizes: ["50", "56", "62", "68"],
  },
];

function ShareIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 16V4" />
      <path d="M8 8l4-4 4 4" />
      <path d="M4 17a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3" />
    </svg>
  );
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [lastRemoved, setLastRemoved] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedToCart, setAddedToCart] = useState({});

  const removeFavorite = (id) => {
    const product = favorites.find((p) => p.id === id);
    setLastRemoved(product);
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  const undoRemove = () => {
    if (!lastRemoved) return;
    setFavorites((prev) => {
      const idx = initialFavorites.findIndex((p) => p.id === lastRemoved.id);
      const updated = [...prev];
      updated.splice(idx, 0, lastRemoved);
      return updated;
    });
    setLastRemoved(null);
  };

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const selectSize = (id, size) => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
    setOpenDropdown(null);
  };

  const addToCart = (product) => {
    const size = selectedSizes[product.id];
    if (!size) return;
    setAddedToCart((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <main className="favorite-page">
      <section className="favorite-content">
        <Breadcrumbs />

        <header className="favorite-header">
          <h1>Mine Favoritter</h1>
          <p>{favorites.length} artikler</p>
        </header>

        <section
          className="favorite-login-box"
          aria-label="Login for favoritter"
        >
          <h2>Mist ikke dine favoritter!</h2>
          <p>Log ind eller opret bruger for at gemme dine favoritter</p>
          <button type="button">OPRET / LOG IND</button>
        </section>

        <section className="favorite-share" aria-label="Del favoritter">
          <p>Del dine favoritter</p>
          <ShareIcon />
        </section>

        <section className="favorite-grid" aria-label="Favorit produkter">
          {lastRemoved && (
            <div className="favorite-undo-card">
              <p>Fjernet: <strong>{lastRemoved.name}</strong></p>
              <button type="button" onClick={undoRemove} className="favorite-undo-btn">
                ↩ Fortryd
              </button>
            </div>
          )}
          {favorites.map((product) => (
            <article key={product.id} className="favorite-card">
              <div className="favorite-image-wrap">
                {product.badge && (
                  <span className="favorite-badge">{product.badge}</span>
                )}
                <button
                  type="button"
                  aria-label={`Fjern ${product.name} fra favoritter`}
                  className="favorite-heart"
                  onClick={() => removeFavorite(product.id)}
                >
                  ❤
                </button>
                <img src={product.image} alt={product.name} />
              </div>

              <div className="favorite-card-body">
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>

              <div className="favorite-size-wrap">
                <button
                  type="button"
                  className="favorite-size-btn"
                  onClick={() => toggleDropdown(product.id)}
                >
                  {selectedSizes[product.id] ? `Str. ${selectedSizes[product.id]}` : "Vælg størrelse"}
                  <span>{openDropdown === product.id ? "⌃" : "⌄"}</span>
                </button>
                {openDropdown === product.id && (
                  <ul className="favorite-size-dropdown">
                    {product.sizes.map((size) => (
                      <li key={size}>
                        <button
                          type="button"
                          className={`favorite-size-option ${selectedSizes[product.id] === size ? "selected" : ""}`}
                          onClick={() => selectSize(product.id, size)}
                        >
                          {size}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                type="button"
                className={`favorite-cart-btn ${!selectedSizes[product.id] ? "disabled" : ""}`}
                onClick={() => addToCart(product)}
                disabled={!selectedSizes[product.id]}
              >
                {addedToCart[product.id] ? "✓ Lagt i kurv!" : "Læg i kurv"}
              </button>
            </article>
          ))}
        </section>

        <div className="favorite-bulk-wrap">
          <button type="button" className="favorite-bulk-btn">
            Føj alle til kurv
          </button>
        </div>
      </section>
    </main>
  );
}
