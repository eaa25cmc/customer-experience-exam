import likeHeartStroke from "../image/like-hjerte-stroke.svg";
import likeHeartFyldt from "../image/like-hjerte-fyldt.svg";

export default function HeartIcon({ filled = false, onClick }) {
  return (
    <img
      src={filled ? likeHeartFyldt : likeHeartStroke}
      alt={filled ? "Fjern fra favoritter" : "Tilføj til favoritter"}
      onClick={onClick}
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


