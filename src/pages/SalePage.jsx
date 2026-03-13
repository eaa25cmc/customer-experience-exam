// Udsalgsside – simpel side med breadcrumbs og overskrift. Kan udbygges med udsalgsprodukter.
import Breadcrumbs from "../components/Breadcrumbs";
export default function SalePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Udsalg" }]} />
      <header>
        <h1>Udsalg</h1>
      </header>
      <main></main>
    </>
  );
}
