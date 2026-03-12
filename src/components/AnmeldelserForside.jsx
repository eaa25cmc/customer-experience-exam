import fyldtprofilikon from "../image/anmeldelserprofil.svg";
import fyldtstjerneikon from "../image/anmeldelserstjernefyldt.svg";
import trustpilotstjerne from "../image/trustpilotstjerne.svg";
import "./AnmeldelserForside.css";

export default function AnmeldelserForside() {
  return (
    <div className="anmeldelser-section">
      <h3>Hvad vores kunder mener</h3>

      <div className="anmeldelser-grid">
        <div className="anmeldelse-card">
          <div className="anmeldelse-top">
            <img src={fyldtprofilikon} alt="Profil1" />
            <div className="rating">
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
            </div>
          </div>
          <div className="anmeldelse-tekst">
            <p>
              “Jeg er virkelig glad for at have fundet Little Looms. Tøjet er så
              fint og i virkelig god kvalitet. Jeg kan især godt lide de
              naturlige materialer, og at designet er så enkelt og tidløst. Det
              er helt klart blevet en af mine favorit webshops til børnetøj.”
            </p>
            <p>- Maria Andersen</p>
          </div>
        </div>

        <div className="anmeldelse-card">
          <div className="anmeldelse-top">
            <img src={fyldtprofilikon} alt="Profil2t" />
            <div className="rating">
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
            </div>
          </div>
          <div className="anmeldelse-tekst">
            <p>
              “Super flot webshop og virkelig nem at finde rundt på. Jeg elsker
              udvalget af brands, og man kan tydeligt mærke at der er tænkt over
              kvalitet og stil. Jeg blev også positivt overrasket over hvor
              hurtigt min ordre kom.”
            </p>
            <p>- Lærke Mathiasen</p>
          </div>
        </div>

        <div className="anmeldelse-card">
          <div className="anmeldelse-top">
            <img src={fyldtprofilikon} alt="Profil3" />
            <div className="rating">
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
            </div>
          </div>
          <div className="anmeldelse-tekst">
            <p>
              “Jeg er virkelig glad for at have fundet Little Looms. Tøjet er så
              fint og i virkelig god kvalitet. Jeg kan især godt lide de
              naturlige materialer, og at designet er så enkelt og tidløst. Det
              er helt klart blevet en af mine favorit webshops til børnetøj.”
            </p>
            <p>- Sofie Berthelsen</p>
          </div>
        </div>

        <div className="anmeldelse-card">
          <div className="anmeldelse-top">
            <img src={fyldtprofilikon} alt="Profil4" />
            <div className="rating">
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
            </div>
          </div>
          <div className="anmeldelse-tekst">
            <p>
              “Super flot webshop og virkelig nem at finde rundt på. Jeg elsker
              udvalget af brands, og man kan tydeligt mærke at der er tænkt over
              kvalitet og stil. Jeg blev også positivt overrasket over hvor
              hurtigt min ordre kom.”
            </p>
            <p>- Julie Sørensen</p>
          </div>
        </div>
      </div>
      <div className="trustpilot-link">
        <p>Vis alle 15.764 anmeldelser</p>
      </div>
      <div className="trustpilot-logo">
        <img src={trustpilotstjerne} alt="Trustpilot Stjerner" />
        <p>Trustpilot</p>
      </div>
    </div>
  );
}
