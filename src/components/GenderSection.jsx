import baby from "../image/baby.png";
import pige from "../image/Pige3.png";
import dreng from "../image/Dreng-3.png";

export default function GenderSection() {
  return (
    <div className="gender-grid">
      <div className="gender-card">
        <img src={baby} alt="Baby" />
        <h3 className="gender-text">Baby (54-86)</h3>
      </div>

      <div className="gender-card">
        <img src={pige} alt="Pige" />
        <h3 className="gender-text">Pige (92-128)</h3>
      </div>

      <div className="gender-card">
        <img src={dreng} alt="Dreng" />
        <h3 className="gender-text">Dreng (92-128)</h3>
      </div>
    </div>
  );
}
