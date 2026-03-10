import { NavLink } from "react-router";
import banner from "../image/banner.svg";
import logo from "../image/logo.svg";
import søgikon from "../image/søgikon.svg";
import profilikon from "../image/profil.svg";
import hjerteikon from "../image/hjerte.svg";
import kurvikon from "../image/kurv.svg";

export default function Navbar() {
  return (
    <div className="hero-header">
      <div className="topnav">
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>
        <nav className="navbar">
          <NavLink to="/Baby">Baby</NavLink>
          <NavLink to="/Pige">Pige</NavLink>
          <NavLink to="/Dreng">Dreng</NavLink>
          <NavLink to="/Sale">Udsalg</NavLink>
          <NavLink to="/News">Nyheder</NavLink>
          <NavLink to="/Inspiration">Inspiration</NavLink>
        </nav>

        <div className="klikikoner">
          <img src={søgikon} alt="Søg" />
          <img src={profilikon} alt="Profil" />
          <img src={hjerteikon} alt="Favoritter" />
          <img src={kurvikon} alt="Kurv" />
        </div>
      </div>

      <div className="banner">
        <img src={banner} alt="Banner" className="banner-image" />

        <div className="banner-text">
          <div className="banner-track">
            <span>Gratis og hurtig levering indenfor 1-2 hverdage</span>
            <span>Over 15.000 tilfredse kunder</span>
            <span>Økologisk og GOTS-certificeret tøj</span>
          </div>
        </div>
      </div>
    </div>
  );
}
