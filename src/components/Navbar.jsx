import { useState, useEffect } from "react";
import { useCartOverlay } from "../context/CartOverlayContext";
import { NavLink } from "react-router";
import banner from "../image/banner.svg";
import logo from "../image/logo.svg";
import søgikon from "../image/søgikon.svg";
import profilikon from "../image/profil.svg";
import hjerteikon from "../image/hjerte.svg";
import kurvikon from "../image/kurv.svg";
import DrengDropdown from "./DrengDropdown";
import PigeDropdown from "./PigeDropdown";
import BabyDropdown from "./BabyDropdown";
import "./Navbar.css";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { setCartOverlayOpen } = useCartOverlay();
  // Synkroniseret carousel til hero-billede og banner-tekst
  const heroImages = [banner, banner, banner];
  const bannerMessages = [
    "Gratis og hurtig levering indenfor 1-2 hverdage",
    "Over 15.000 tilfredse kunder",
    "Økologisk og GOTS-certificeret tøj",
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="hero-header">
      <div className="topnav">
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>
        <nav className="navbar">
          <NavLink to="/Baby" onClick={() => setActiveDropdown("baby")}>
            Baby
          </NavLink>
          <NavLink to="/Pige" onClick={() => setActiveDropdown("pige")}>
            Pige
          </NavLink>
          <NavLink to="/Dreng" onClick={() => setActiveDropdown("dreng")}>
            Dreng
          </NavLink>
          <NavLink to="/Sale">Udsalg</NavLink>
          <NavLink to="/News">Nyheder</NavLink>
          <NavLink to="/Inspiration">Inspiration</NavLink>
        </nav>

        <div className="klikikoner">
          <img src={søgikon} alt="Søg" />
          <img src={profilikon} alt="Profil" />
          <NavLink to="/favorites">
            <img src={hjerteikon} alt="Favoritter" />
          </NavLink>
          <button
            type="button"
            className="cart-icon-btn"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
            aria-label="Åbn kurv"
            onClick={() => setCartOverlayOpen(true)}
          >
            <img src={kurvikon} alt="Kurv" />
          </button>
        </div>
      </div>

      {activeDropdown === "baby" && (
        <BabyDropdown onClose={() => setActiveDropdown(null)} />
      )}

      {activeDropdown === "pige" && (
        <PigeDropdown onClose={() => setActiveDropdown(null)} />
      )}

      {activeDropdown === "dreng" && (
        <DrengDropdown onClose={() => setActiveDropdown(null)} />
      )}

      <div className="banner">
        <img
          src={heroImages[carouselIndex]}
          alt="Banner"
          className="banner-image"
        />
        <div className="banner-text">
          <p className="banner-carousel">{bannerMessages[carouselIndex]}</p>
        </div>
      </div>
    </div>
  );
}
