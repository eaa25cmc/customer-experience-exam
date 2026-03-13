import React from "react";
import {
  loadShoppingbagItems,
  saveShoppingbagItems,
} from "../utils/shoppingbagStorage";
import "../pages/ShoppingbagPage.css";
import { useNavigate } from "react-router-dom";
import antalProdukterIcon from "../image/Antal produkter.svg";
import skraldespandIcon from "../image/skraldespand.svg";

export default function ShoppingBagOverlay({ onClose }) {
  const [cartItems, setCartItems] = React.useState(() =>
    loadShoppingbagItems([]),
  );
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const steps = ["Kurv", "Oplysninger", "Levering", "Betaling", "Bekræftelse"];
  const formatPrice = (price) => price.toFixed(2).replace(".", ",") + " DKK";
  const navigate = useNavigate();

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

  React.useEffect(() => {
    setCartItems(loadShoppingbagItems([]));
  }, []);

  return (
    <div
      className="shoppingbag-page"
      role="dialog"
      aria-modal="true"
      aria-label="Kurv"
    >
      <button
        className="shoppingbag-backdrop"
        onClick={onClose}
        aria-label="Luk kurv"
      />
      <div className="shoppingbag-card">
        <div className="shoppingbag-card-header">
          <h1 className="shoppingbag-page-title">Kurv ({totalCount})</h1>
          <button
            className="shoppingbag-close-btn"
            onClick={onClose}
            aria-label="Luk kurv"
          >
            ✕
          </button>
        </div>
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
        <div className="shoppingbag-items">
          {cartItems.length === 0 ? (
            <p className="shoppingbag-empty">Din kurv er tom.</p>
          ) : (
            cartItems.map((item) => (
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
        <div className="shoppingbag-footer">
          <div className="shoppingbag-total">
            <span>I ALT</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <button
            className="shoppingbag-checkout-btn"
            onClick={() => {
              onClose();
              navigate("/payment");
            }}
          >
            Til kassen
          </button>
          <button className="shoppingbag-continue-btn" onClick={onClose}>
            Forsæt med at shoppe
          </button>
        </div>
      </div>
    </div>
  );
}
