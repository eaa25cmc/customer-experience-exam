export default function HeartIcon({ filled = false, onClick }) {
  return (
    <span
      style={{
        cursor: "pointer",
        fontSize: "1.5rem",
        color: filled ? "red" : "#bbb",
        transition: "color 0.2s",
      }}
      onClick={onClick}
      aria-label={filled ? "Fjern fra favoritter" : "Tilføj til favoritter"}
      role="button"
      tabIndex={0}
    >
      {filled ? "♥" : "♡"}
    </span>
  );
}

/* ***** SKAL RETTES I SÅ DET PASSER TIL VORES EGET IKON **** */
