import leveringikon from "../image/leveringikon.svg";
import fragtikon from "../image/frifragtikon.svg";
import returikon from "../image/returikon.svg";
import anmeldelserikon from "../image/anmeldelserikon.svg";

export default function Infoikoner() {
  return (
    <div className="infoikoner">
      <div className="info-grid">
        <div className="info-card">
          <img src={leveringikon} alt="Levering" />
          <h4>Levering</h4>
          <p>Kun 1-2 dages levering</p>
        </div>
        <div className="info-card">
          <img src={fragtikon} alt="Frifragt" />
          <h4>Fri fragt</h4>
          <p>Gratis levering</p>
        </div>
        <div className="info-card">
          <img src={returikon} alt="Retur" />
          <h4>Retur</h4>
          <p>30 dages returret</p>
        </div>
        <div className="info-card">
          <img src={anmeldelserikon} alt="Anmeldelser" />
          <h4>Anmeldelser</h4>
          <p>Over 15.000 tilfredse kunder</p>
        </div>
      </div>
    </div>
  );
}
