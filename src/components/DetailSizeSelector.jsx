import { useState } from "react";
import styles from "./DetailInfoBox.module.css";

export default function SizeSelector({ variants, size }) {
  const [selectedSize, setSelectedSize] = useState(null);

  let sizesObj = [];
  if (variants) {
    sizesObj = variants.flatMap((v) => Object.entries(v.size || {}));
  } else if (size) {
    sizesObj = Object.entries(size);
  }

  // Fjern dubletter og sorter
  const uniqueSizes = Array.from(
    new Map(sizesObj.map(([size, available]) => [size, available])).entries(),
  ).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

  return (
    <div className={styles.sizeGrid}>
      {uniqueSizes.map(([size, available]) => (
        <div
          key={size}
          className={
            available
              ? `${styles.sizeCircle} ${selectedSize === size ? styles.sizeSelected : ""}`
              : `${styles.sizeCircle} ${styles.sizeUnavailable}`
          }
          onClick={() => available && setSelectedSize(size)}
        >
          <p style={selectedSize === size ? { color: "#fff" } : {}}>{size}</p>
          {!available && <div className={styles.strikeThrough}></div>}
        </div>
      ))}
    </div>
  );
}
