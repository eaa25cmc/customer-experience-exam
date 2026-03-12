import "./HomePage.css";
import HeroPictures from "../components/HeroPictures";
import BrandKarrusel from "../components/BrandKarrusel";
import GenderSection from "../components/GenderSection";
import Badges from "../components/Badges";
import ForsideInspiration from "../components/ForsideInspiration";
import Infoikoner from "../components/infoikoner";
import AnmeldelserForside from "../components/AnmeldelserForside";

export default function HomePage() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="hero">
          <HeroPictures />
          <p className="title">
            <span style={{ color: "var(--blå)" }}> F</span>
            <span style={{ color: "var(--lyserød)" }}> O</span>
            <span style={{ color: "var(--orange)" }}> R</span>
            <span style={{ color: "var(--gul)" }}> Å</span>
            <span style={{ color: "var(--grøn)" }}> R</span>
            <span style={{ color: "var(--rød)" }}> S</span>
            <br />
            <span style={{ color: "var(--gul)" }}> N</span>
            <span style={{ color: "var(--blå)" }}> Y</span>
            <span style={{ color: "var(--rød)" }}> H</span>
            <span style={{ color: "var(--grøn)" }}> E</span>
            <span style={{ color: "var(--lyserød)" }}> D</span>
            <span style={{ color: "var(--orange)" }}> E</span>
            <span style={{ color: "var(--blå)" }}> R</span>
          </p>
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
          <ForsideInspiration />
        </section>

        {/* inspiration Section */}
        <section className="infoikonersektion">
          <Infoikoner />
        </section>
        {/* Anmeldelser Section */}
        <section className="anmeldelser-sektion">
          <AnmeldelserForside />
        </section>
      </main>
    </>
  );
}
