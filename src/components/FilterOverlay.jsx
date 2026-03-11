import { useEffect, useRef, useState } from "react";
import filterIcon from "../image/product-pics/filter.svg";
import styles from "./ProductGrid.module.css";

export default function FilterOverlay({
  isOpen,
  onOpen,
  onClose,
  options,
  draftFilters,
  onDraftFiltersChange,
  onReset,
  onApply,
}) {
  const triggerRef = useRef(null);
  const [panelPosition, setPanelPosition] = useState({ top: 24, left: 16 });
  const [openSections, setOpenSections] = useState({
    sort: true,
    colors: false,
    sizes: false,
    brands: false,
    genders: false,
    prices: false,
    types: false,
  });

  useEffect(() => {
    if (!isOpen) return;

    const updatePanelPosition = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const panelWidth = Math.min(348, window.innerWidth - 32);
      const maxLeft = Math.max(16, window.innerWidth - panelWidth - 16);

      setPanelPosition({
        top: rect.bottom + 8,
        left: Math.min(Math.max(16, rect.left), maxLeft),
      });
    };

    updatePanelPosition();
    window.addEventListener("resize", updatePanelPosition);
    window.addEventListener("scroll", updatePanelPosition, true);

    return () => {
      window.removeEventListener("resize", updatePanelPosition);
      window.removeEventListener("scroll", updatePanelPosition, true);
    };
  }, [isOpen]);

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleCheckbox = (group, value) => {
    const current = draftFilters[group] || [];
    const exists = current.includes(value);

    onDraftFiltersChange({
      ...draftFilters,
      [group]: exists
        ? current.filter((item) => item !== value)
        : [...current, value],
    });
  };

  const setSort = (value) => {
    onDraftFiltersChange({ ...draftFilters, sort: value });
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.mobileFilterTrigger}
        onClick={onOpen}
        aria-label="Åben mobil filtrering"
      >
        <img src={filterIcon} alt="" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className={styles.mobileFilterOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Mobil filtrering"
        >
          <button
            type="button"
            className={styles.mobileFilterBackdrop}
            onClick={onClose}
            aria-label="Luk filtrering"
          />

          <div
            className={styles.mobileFilterPanel}
            style={{
              top: `${panelPosition.top}px`,
              left: `${panelPosition.left}px`,
            }}
          >
            <div className={styles.mobileFilterHeaderMain}>
              <h2>Filter</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Luk filtrering"
              >
                ×
              </button>
            </div>

            <div className={styles.mobileFilterSectionCollapsed}>
              <span>Sorter</span>
              <button type="button" onClick={() => toggleSection("sort")}>
                {openSections.sort ? "−" : "+"}
              </button>
            </div>

            {openSections.sort && (
              <div className={styles.mobileFilterSection}>
                <div className={styles.mobileFilterCheckboxList}>
                  {options.sort.map((option) => (
                    <label
                      key={option.value}
                      className={styles.mobileFilterCheckRow}
                    >
                      <input
                        type="radio"
                        name="sort"
                        checked={draftFilters.sort === option.value}
                        onChange={() => setSort(option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.mobileFilterSectionCollapsed}>
              <span>Farver</span>
              <button type="button" onClick={() => toggleSection("colors")}>
                {openSections.colors ? "−" : "+"}
              </button>
            </div>

            {openSections.colors && (
              <div className={styles.mobileFilterSection}>
                <div className={styles.mobileFilterCheckboxList}>
                  {options.colors.map((color) => (
                    <label key={color} className={styles.mobileFilterCheckRow}>
                      <input
                        type="checkbox"
                        checked={draftFilters.colors.includes(color)}
                        onChange={() => toggleCheckbox("colors", color)}
                      />
                      <span>{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.mobileFilterSectionCollapsed}>
              <span>Størrelse</span>
              <button type="button" onClick={() => toggleSection("sizes")}>
                {openSections.sizes ? "−" : "+"}
              </button>
            </div>

            {openSections.sizes && (
              <div className={styles.mobileFilterSection}>
                {options.sizes.map((group) => (
                  <div
                    key={group.label}
                    className={styles.mobileFilterSizeGroup}
                  >
                    <p>{group.label}</p>
                    <div className={styles.mobileFilterCheckboxList}>
                      {group.options.map((size) => (
                        <label
                          key={size}
                          className={styles.mobileFilterCheckRow}
                        >
                          <input
                            type="checkbox"
                            checked={draftFilters.sizes.includes(size)}
                            onChange={() => toggleCheckbox("sizes", size)}
                          />
                          <span>{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.mobileFilterSectionCollapsed}>
              <span>Brands</span>
              <button type="button" onClick={() => toggleSection("brands")}>
                {openSections.brands ? "−" : "+"}
              </button>
            </div>

            {openSections.brands && (
              <div className={styles.mobileFilterSection}>
                <div className={styles.mobileFilterCheckboxList}>
                  {options.brands.map((brand) => (
                    <label key={brand} className={styles.mobileFilterCheckRow}>
                      <input
                        type="checkbox"
                        checked={draftFilters.brands.includes(brand)}
                        onChange={() => toggleCheckbox("brands", brand)}
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.mobileFilterSectionCollapsed}>
              <span>Køn</span>
              <button type="button" onClick={() => toggleSection("genders")}>
                {openSections.genders ? "−" : "+"}
              </button>
            </div>

            {openSections.genders && (
              <div className={styles.mobileFilterSection}>
                <div className={styles.mobileFilterCheckboxList}>
                  {options.genders.map((gender) => (
                    <label key={gender} className={styles.mobileFilterCheckRow}>
                      <input
                        type="checkbox"
                        checked={draftFilters.genders.includes(gender)}
                        onChange={() => toggleCheckbox("genders", gender)}
                      />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.mobileFilterSectionCollapsed}>
              <span>Pris</span>
              <button type="button" onClick={() => toggleSection("prices")}>
                {openSections.prices ? "−" : "+"}
              </button>
            </div>

            {openSections.prices && (
              <div className={styles.mobileFilterSection}>
                <div className={styles.mobileFilterCheckboxList}>
                  {options.prices.map((price) => (
                    <label
                      key={price.value}
                      className={styles.mobileFilterCheckRow}
                    >
                      <input
                        type="checkbox"
                        checked={draftFilters.prices.includes(price.value)}
                        onChange={() => toggleCheckbox("prices", price.value)}
                      />
                      <span>{price.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.mobileFilterSectionCollapsed}>
              <span>Produkttype</span>
              <button type="button" onClick={() => toggleSection("types")}>
                {openSections.types ? "−" : "+"}
              </button>
            </div>

            {openSections.types && (
              <div className={styles.mobileFilterSection}>
                <div className={styles.mobileFilterCheckboxList}>
                  {options.types.map((type) => (
                    <label key={type} className={styles.mobileFilterCheckRow}>
                      <input
                        type="checkbox"
                        checked={draftFilters.types.includes(type)}
                        onChange={() => toggleCheckbox("types", type)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.mobileFilterActions}>
              <button
                type="button"
                className={styles.mobileFilterReset}
                onClick={onReset}
              >
                Nulstil filter
              </button>
              <button
                type="button"
                className={styles.mobileFilterApply}
                onClick={onApply}
              >
                Vis Produkter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
