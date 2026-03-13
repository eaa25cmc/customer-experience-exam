import { createContext, useContext, useState } from "react";

const CartOverlayContext = createContext();

export function CartOverlayProvider({ children }) {
  const [isCartOverlayOpen, setCartOverlayOpen] = useState(false);
  return (
    <CartOverlayContext.Provider
      value={{ isCartOverlayOpen, setCartOverlayOpen }}
    >
      {children}
    </CartOverlayContext.Provider>
  );
}

export function useCartOverlay() {
  return useContext(CartOverlayContext);
}
