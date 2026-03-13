// Favoritside – viser brugerens favoritprodukter med mulighed for at fjerne dem eller lægge dem i kurven.
// Produkterne er i øjeblikket hardkodet i initialFavorites, men kan kobles til localStorage.
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import "./FavoritesPage.css";
import { addShoppingbagItem } from "../utils/shoppingbagStorage";
import nyhedIcon from "../image/nyhed-ikon.svg";
import saleIcon from "../image/sale-ikon.svg";
import HeartIcon from "../components/HeartIcon";

const initialFavorites = [
  {
    id: 1,
    name: "langærmet strik top",
    price: "227,95 DKK",
    image: "/product-pics/64-1.png",
    sale: true,
    sizes: ["86", "92", "98", "104", "110", "116"],
  },
  {
    id: 2,
    name: "økologisk bomuld top",
    price: "143,95 DKK",
    image: "/product-pics/70-1.png",
    sale: true,
    sizes: ["56", "62", "68", "74", "80", "86"],
  },
  {
    id: 3,
    name: "elva kjole eggshell",
    price: "449,00 DKK",
    image: "/product-pics/71-1.png",
    news: true,
    sizes: ["98", "104", "110", "116", "122", "128"],
  },
  {
    id: 4,
    name: "mimmi bluse tramonto",
    price: "279,95 DKK",
    image: "/product-pics/1-1.png",
    sizes: ["74", "80", "86", "92", "98", "104"],
  },
  {
    id: 5,
    name: "savora cardigan",
    price: "299,95 DKK",
    image: "/product-pics/81-1.png",
    news: true,
    sizes: ["86", "92", "98", "104", "110"],
  },
  {
    id: 6,
    name: "regular strikket top",
    price: "259,95 DKK",
    image: "/product-pics/62-1.png",
    sizes: ["92", "98", "104", "110", "116"],
  },
  {
    id: 7,
    name: "nyfødt slå-om body",
    price: "249,00 DKK",
    image: "/product-pics/93-1.png",
    news: true,
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
  const navigate = useNavigate();
  const location = useLocation();
  const [favorites, setFavorites] = useState(initialFavorites);
  const [removedFavorites, setRemovedFavorites] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedToCart, setAddedToCart] = useState({});

  const removeFavorite = (id) => {
    const product = favorites.find((p) => p.id === id);
    if (!product) return;

    setRemovedFavorites((prev) => ({ ...prev, [id]: product }));
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  const undoRemove = (id) => {
    const product = removedFavorites[id];
    if (!product) return;

    setFavorites((prev) => {
      const updated = [...prev, product];
      updated.sort(
        (a, b) =>
          initialFavorites.findIndex((p) => p.id === a.id) -
          initialFavorites.findIndex((p) => p.id === b.id),
      );
      return updated;
    });

    setRemovedFavorites((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const selectSize = (id, size) => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  const addToCart = (product) => {
    const size = selectedSizes[product.id];
    if (!size) return;

    addShoppingbagItem({
      id: `${product.id}-${size}`,
      baseId: product.id,
      name: product.name,
      price: Number(product.price.replace(" DKK", "").replace(",", ".")),
      size,
      quantity: 1,
      image: product.image,
    });

    setAddedToCart((prev) => ({ ...prev, [product.id]: true }));
    navigate("/shoppingbag", { state: { backgroundLocation: location } });
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const addAllToCart = () => {
    if (favorites.length === 0) return;

    const addedIds = [];
    const inferredSizes = {};

    favorites.forEach((product) => {
      const size = selectedSizes[product.id] || product.sizes?.[0];
      if (!size) return;

      addShoppingbagItem({
        id: `${product.id}-${size}`,
        baseId: product.id,
        name: product.name,
        price: Number(product.price.replace(" DKK", "").replace(",", ".")),
        size,
        quantity: 1,
        image: product.image,
      });

      if (!selectedSizes[product.id]) {
        inferredSizes[product.id] = size;
      }

      addedIds.push(product.id);
    });

    if (addedIds.length === 0) return;

    navigate("/shoppingbag", { state: { backgroundLocation: location } });

    if (Object.keys(inferredSizes).length > 0) {
      setSelectedSizes((prev) => ({ ...prev, ...inferredSizes }));
    }

    setAddedToCart((prev) => {
      const next = { ...prev };
      addedIds.forEach((id) => {
        next[id] = true;
      });
      return next;
    });

    setTimeout(() => {
      setAddedToCart((prev) => {
        const next = { ...prev };
        addedIds.forEach((id) => {
          next[id] = false;
        });
        return next;
      });
    }, 2000);
  };

  return (
    <main className="favorite-page">
      <section className="favorite-content">
        <Breadcrumbs />

        <header className="favorite-header">
          <h2>Mine Favoritter</h2>
          <p>{favorites.length} artikler</p>
        </header>

        <section
          className="favorite-login-box"
          aria-label="Login for favoritter"
        >
          <h3>Mist ikke dine favoritter!</h3>
          <p>Log ind eller opret bruger for at gemme dine favoritter</p>
          <button type="button">OPRET / LOG IND</button>
        </section>

        <section className="favorite-share" aria-label="Del favoritter">
          <p>Del dine favoritter</p>
          <ShareIcon />
        </section>

        <section className="favorite-grid" aria-label="Favorit produkter">
          {initialFavorites.map((product) => {
            const activeProduct = favorites.find((p) => p.id === product.id);
            if (!activeProduct) {
              if (!removedFavorites[product.id]) return null;

              return (
                <div key={`undo-${product.id}`} className="favorite-undo-tile">
                  <button
                    type="button"
                    onClick={() => undoRemove(product.id)}
                    className="favorite-undo-btn"
                  >
                    Fortryd
                  </button>
                </div>
              );
            }

            const isSizeOpen = hoveredCard === product.id;

            return (
              <article
                key={activeProduct.id}
                className="favorite-card"
                onMouseEnter={() => setHoveredCard(activeProduct.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="favorite-image-wrap">
                  <div className="favorite-top-bar">
                    <div className="favorite-left-icons">
                      {activeProduct.news && (
                        <img
                          src={nyhedIcon}
                          alt="Nyhed"
                          className="favorite-badge-icon"
                        />
                      )}
                      {activeProduct.sale && (
                        <img
                          src={saleIcon}
                          alt="Sale"
                          className="favorite-badge-icon"
                        />
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Fjern ${activeProduct.name} fra favoritter`}
                    className="favorite-heart"
                  >
                    <HeartIcon
                      initialFilled={true}
                      onToggle={() => removeFavorite(activeProduct.id)}
                    />
                  </button>
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="favorite-product-image"
                  />
                </div>

                <div className="favorite-card-body">
                  <h3>{activeProduct.name}</h3>
                  <p
                    className={
                      activeProduct.sale ? "favorite-price-sale" : undefined
                    }
                  >
                    {activeProduct.price}
                  </p>
                </div>

                <div className="favorite-size-wrap">
                  <p className="favorite-size-label">
                    {selectedSizes[activeProduct.id]
                      ? `Str. ${selectedSizes[activeProduct.id]}`
                      : "Vælg størrelse"}
                  </p>
                  {isSizeOpen && (
                    <ul
                      className="favorite-size-inline"
                      aria-label="Vælg størrelse"
                    >
                      {activeProduct.sizes.map((size) => (
                        <li key={size}>
                          <button
                            type="button"
                            className={`favorite-size-inline-option ${selectedSizes[activeProduct.id] === size ? "selected" : ""}`}
                            onClick={() => selectSize(activeProduct.id, size)}
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
                  className={`favorite-cart-btn ${!selectedSizes[activeProduct.id] ? "disabled" : ""}`}
                  onClick={() => addToCart(activeProduct)}
                  disabled={!selectedSizes[activeProduct.id]}
                >
                  {addedToCart[activeProduct.id]
                    ? "✓ Lagt i kurv!"
                    : "Læg i kurv"}
                </button>
              </article>
            );
          })}
        </section>

        <div className="favorite-bulk-wrap">
          <button
            type="button"
            className="favorite-bulk-btn"
            onClick={addAllToCart}
            disabled={favorites.length === 0}
          >
            Føj alle til kurv
          </button>
        </div>
      </section>
    </main>
  );
}
