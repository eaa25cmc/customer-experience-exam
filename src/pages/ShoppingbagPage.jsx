// Indkøbskurvside – viser kurven som en fuld side med produkter, antal, priser og trin-indikator.
// Indlæser og gemmer kurv-data i localStorage via shoppingbagStorage.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShoppingbagPage.css";
import antalProdukterIcon from "../image/Antal produkter.svg";
import skraldespandIcon from "../image/skraldespand.svg";
import {
  loadShoppingbagItems,
  saveShoppingbagItems,
} from "../utils/shoppingbagStorage";
import { withBase } from "../utils/productFilters";

const initialCartItems = [];

const steps = ["Kurv", "Oplysninger", "Levering", "Betaling", "Bekræftelse"];

export default function ShoppingbagPage() {
  const [cartItems, setCartItems] = useState(() =>
    loadShoppingbagItems(initialCartItems),
  );
  const navigate = useNavigate();

  const closeOverlay = () => {
    navigate(-1);
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) => {
      const nextItems = prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0);

      saveShoppingbagItems(nextItems);
      return nextItems;
    });
  };

  const removeItem = (id) => {
    setCartItems((prev) => {
      const nextItems = prev.filter((item) => item.id !== id);
      saveShoppingbagItems(nextItems);
      return nextItems;
    });
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const formatPrice = (price) => price.toFixed(2).replace(".", ",") + " DKK";

  return (
    <div
      className="shoppingbag-page"
      role="dialog"
      aria-modal="true"
      aria-label="Kurv"
    >
      <button
        className="shoppingbag-backdrop"
        onClick={closeOverlay}
        aria-label="Luk kurv"
      />
      <div className="shoppingbag-card">
        {/* Header */}
        <div className="shoppingbag-card-header">
          <h1 className="shoppingbag-page-title">Kurv ({totalCount})</h1>
          <button
            className="shoppingbag-close-btn"
            onClick={closeOverlay}
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
          {cartItems.length === 0 ? (
            <p className="shoppingbag-empty">Din kurv er tom.</p>
          ) : (
            cartItems.map((item) => (
              <div className="shoppingbag-item" key={item.id}>
                <img
                  src={withBase(item.image)}
                  alt={item.name}
                  className="shoppingbag-item-img"
                />
                <div className="shoppingbag-item-info">
                  <p className="shoppingbag-item-name">{item.name}</p>
                  <p className="shoppingbag-item-price">
                    {formatPrice(item.price)}
                  </p>
                  <p className="shoppingbag-item-size">Str. {item.size}</p>
                  <div
                    className="shoppingbag-qty"
                    aria-label={`Antal ${item.quantity}`}
                  >
                    <img
                      src={antalProdukterIcon}
                      alt=""
                      aria-hidden="true"
                      className="shoppingbag-qty-icon"
                    />
                    <button
                      type="button"
                      className="shoppingbag-qty-hit shoppingbag-qty-hit-minus"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label="Fjern ét produkt"
                    />
                    <span className="shoppingbag-qty-count">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="shoppingbag-qty-hit shoppingbag-qty-hit-plus"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label="Tilføj ét produkt"
                    />
                  </div>
                </div>
                <button
                  className="shoppingbag-delete-btn"
                  onClick={() => removeItem(item.id)}
                  aria-label="Fjern produkt"
                >
                  <img
                    src={skraldespandIcon}
                    alt=""
                    aria-hidden="true"
                    className="shoppingbag-delete-icon"
                  />
                </button>
              </div>
            ))
          )}
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
