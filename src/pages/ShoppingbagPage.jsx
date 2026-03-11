import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShoppingbagPage.css";



const initialCartItems = [
  {
    id: 1,
    name: "Langærmet Strikket Top",
    price: 227.95,
    size: "110",
    quantity: 1,
    image: "/src/image/1-1.png",
  },
];

const steps = ["Kurv", "Oplysninger", "Levering", "Betaling", "Bekræftelse"];

function TrashIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

export default function ShoppingbagPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigate = useNavigate();

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const formatPrice = (price) => price.toFixed(2).replace(".", ",") + " DKK";

  return (
    <div className="shoppingbag-page">
      <h1 className="shoppingbag-page-title">Kurv</h1>

      <div className="shoppingbag-card">
        {/* Header */}
        <div className="shoppingbag-card-header">
          <span className="shoppingbag-card-title">Kurv ({totalCount})</span>
          <button
            className="shoppingbag-close-btn"
            onClick={() => navigate(-1)}
            aria-label="Luk kurv"
          >
            ✕
          </button>
        </div>

        {/* Step Indicator */}
        <div className="shoppingbag-steps">
          {steps.map((label, i) => (
            <div className="shoppingbag-step" key={i}>
              <div
                className={`shoppingbag-step-circle ${i === 0 ? "active" : ""}`}
              >
                {i + 1}
              </div>
              <span className="shoppingbag-step-label">{label}</span>
            </div>
          ))}
        </div>

        {/* Cart Items */}
        <div className="shoppingbag-items">
          {cartItems.map((item) => (
            <div className="shoppingbag-item" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className="shoppingbag-item-img"
              />
              <div className="shoppingbag-item-info">
                <p className="shoppingbag-item-name">{item.name}</p>
                <p className="shoppingbag-item-price">
                  {formatPrice(item.price)}
                </p>
                <p className="shoppingbag-item-size">Str. {item.size}</p>
                <div className="shoppingbag-qty">
                  <button
                    className="shoppingbag-qty-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label="Reducer antal"
                  >
                    −
                  </button>
                  <span className="shoppingbag-qty-count">{item.quantity}</span>
                  <button
                    className="shoppingbag-qty-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label="Forøg antal"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="shoppingbag-delete-btn"
                onClick={() => removeItem(item.id)}
                aria-label="Fjern produkt"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>

        <hr className="shoppingbag-divider" />

        {/* Footer */}
        <div className="shoppingbag-footer">
          <div className="shoppingbag-total">
            <span>I ALT</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <button
            className="shoppingbag-checkout-btn"
            onClick={() => navigate("/payment")}
          >
            Til kassen
          </button>
          <button
            className="shoppingbag-continue-btn"
            onClick={() => navigate("/products")}
          >
            Forsæt med at shoppe
          </button>
        </div>
      </div>
    </div>
  );
}
