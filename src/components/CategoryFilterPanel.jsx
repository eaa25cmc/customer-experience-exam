// Kategorifilter-panel – viser knapper til filtrering på underkategorier på kategorisiden.
// selectedSub og setSelectedSub styrer den aktive kategori-knap.
import styles from "./ProductGrid.module.css";

export default function CategoryFilterPanel({
  subCategories,
  selectedSub,
  setSelectedSub,
}) {
  return (
    <section className={styles.filterPanel} aria-label="Product filters">
      <div className={styles.categoryButtons}>
        <button
          className={`${styles.categoryButton} ${selectedSub === "all" ? styles.activeCategoryButton : ""}`}
          onClick={() => setSelectedSub("all")}
        >
          Alle
        </button>
        {subCategories.map((sub) => (
          <button
            key={sub}
            className={`${styles.categoryButton} ${selectedSub === sub ? styles.activeCategoryButton : ""}`}
            onClick={() => setSelectedSub(sub)}
          >
            {sub}
          </button>
        ))}
      </div>
    </section>
  );
}
