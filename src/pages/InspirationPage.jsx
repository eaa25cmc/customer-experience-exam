// Inspirationsside – simpel side med breadcrumbs og overskrift. Indholdet kan udbygges med inspirationsindhold.
import Breadcrumbs from "../components/Breadcrumbs";

export default function InspirationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Inspiration" }]} />
      <header>
        <h1>Inspiration</h1>
      </header>
      <main></main>
    </>
  );
}
