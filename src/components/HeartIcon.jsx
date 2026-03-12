import { useState } from "react";
import likeHeartStroke from "../image/like-hjerte-stroke.svg";
import likeHeartFyldt from "../image/like-hjerte-fyldt.svg";

export default function HeartIcon({ initialFilled = false, onToggle }) {
  const [filled, setFilled] = useState(initialFilled);

  const handleToggle = (e) => {
    e.stopPropagation(); // Stopper eventen fra at boble op
    e.preventDefault(); // Tilføj denne linje!
    setFilled((prev) => !prev);
    if (onToggle) onToggle(!filled);
  };

  return (
    <img
      src={filled ? likeHeartFyldt : likeHeartStroke}
      alt={filled ? "Fjern fra favoritter" : "Tilføj til favoritter"}
      onClick={handleToggle}
      style={{
        cursor: "pointer",
        width: "32px",
        height: "32px",
        transition: "filter 0.2s",
      }}
      role="button"
      tabIndex={0}
    />
  );
}
