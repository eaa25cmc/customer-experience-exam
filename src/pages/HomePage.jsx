import "./HomePage.css";
import HeroPictures from "../components/HeroPictures";
import BrandKarrusel from "../components/BrandKarrusel";
import GenderSection from "../components/GenderSection";
import Badges from "../components/Badges";

export default function HomePage() {
  return (
    <>
      <header></header>
      <main>
        {/* Hero Section */}
        <section className="hero">
          <HeroPictures />
          <p className="title">
            <span style={{ color: "var(--blå)" }}> F</span>
            <span style={{ color: "var(--lyserød)" }}> o</span>
            <span style={{ color: "var(--orange)" }}> r</span>
            <span style={{ color: "var(--gul)" }}> å</span>
            <span style={{ color: "var(--grøn)" }}> r</span>
            <span style={{ color: "var(--rød)" }}> s</span>
            <span style={{ color: "var(--gul)" }}> n</span>
            <span style={{ color: "var(--blå)" }}> y</span>
            <span style={{ color: "var(--rød)" }}> h</span>
            <span style={{ color: "var(--grøn)" }}> e</span>
            <span style={{ color: "var(--lyserød)" }}> d</span>
            <span style={{ color: "var(--orange)" }}> e</span>
            <span style={{ color: "var(--blå)" }}> r</span>
          </p>
          <button>Se nyheder</button>
        </section>

        {/* populære brands Section */}
        <section className="populære-brands">
          <BrandKarrusel />
        </section>

        {/* Køn Section */}
        <section className="køn">
          <GenderSection />
        </section>

        {/* badges Section */}
        <section className="badges">
          <Badges />
        </section>

        {/* inspiration Section */}
        <section className="inspiration">
          <h3>Inspiration</h3>
        </section>
      </main>

      {/* footer */}
      <footer></footer>
    </>
  );
}
