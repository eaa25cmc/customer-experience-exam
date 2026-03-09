import reactRouterLogo from "../assets/example.svg";

export default function HomePage() {
  return (
    <>
      <header></header>
      <main>
        <section className="hero">
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

        <article>
          <h2>Displaying images in React</h2>

          <h3>1. Import from src/assets</h3>
          <img src={reactRouterLogo} alt="Example SVG" className="img-small" />

          <h3>2. Public folder</h3>
          <img
            src="logo.webp"
            alt="Logo from public folder"
            className="img-small"
          />

          <h3>3. External URL</h3>
          <img
            src="https://picsum.photos/200"
            alt="Random external image"
            className="img-medium"
          />
        </article>
      </main>
    </>
  );
}
