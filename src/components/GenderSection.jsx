import baby from "../image/baby.png";
import pige from "../image/Pige3.png";
import dreng from "../image/Dreng-3.png";
import babystr from "../image/babykoen.svg";
import drengstr from "../image/drengkoen.svg";
import pigestr from "../image/pigekoen.svg";

export default function GenderSection() {
  return (
    <div className="gender-grid">
      <div className="gender-card">
        <img src={baby} alt="Baby" />
        <img src={babystr} alt="Babystr" />
      </div>

      <div className="gender-card">
        <img src={pige} alt="Pige" />
        <img src={pigestr} alt="Pigestr" />
      </div>

      <div className="gender-card">
        <img src={dreng} alt="Dreng" />
        <img src={drengstr} alt="Drengstr" />
      </div>
    </div>
  );
}
