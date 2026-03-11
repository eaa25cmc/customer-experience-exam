import Breadcrumbs from "../components/Breadcrumbs";

export default function InspirationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Inspiration" }]} />
      <header>
        <h1>Inspiration</h1>
      </header>
      <main className="about-container">
        <p>
          We build modern web apps with React, clear branching, and structured
          Pull Requests.
        </p>

        <section className="about-stats">
          <article className="stat">
            <h3>12+</h3>
            <p>Projects</p>
          </article>
          <article className="stat">
            <h3>4</h3>
            <p>Team Members</p>
          </article>
          <article className="stat">
            <h3>100%</h3>
            <p>Deployed</p>
          </article>
        </section>
      </main>
    </>
  );
}
