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
