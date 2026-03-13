// Nyhedsside – simpel side med breadcrumbs og overskrift. Indholdet kan udbygges med nyhedsprodukter.
import Breadcrumbs from "../components/Breadcrumbs";
export default function News() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Nyheder" }]} />
      <header>
        <h1>Nyheder</h1>
      </header>
      <main></main>
    </>
  );
}
