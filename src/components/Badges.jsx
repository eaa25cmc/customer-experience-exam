import badge1 from "../image/naturlige-materialer-badge.svg";
import badge2 from "../image/lyseroedbadge.svg";
import badge3 from "../image/holdbarhedbadge.svg";
import badge4 from "../image/komfortbadge.svg";

export default function Badges() {
  return (
    <section className="badges-section">
      <div className="badges-grid">
        <div className="badge-card">
          <img
            src={badge1}
            alt="Naturlige materialer badge"
            className="badge-image"
          />
          <p className="badge-description">
            Fremstillet af økologiske og nøje udvalgte naturfibre. Materialerne
            er skånsomme og fri for unødig kemi.
          </p>
        </div>

        <div className="badge-card">
          <img
            src={badge2}
            alt="GOTS certificering badge"
            className="badge-image"
          />
          <p className="badge-description">
            Mange af vores produkter følger standarden, som stiller krav til
            både miljø, kemi og arbejdsforhold.
          </p>
        </div>

        <div className="badge-card">
          <img src={badge3} alt="Holdbarhed badge" className="badge-image" />
          <p className="badge-description">
            Vi udvælger tøj i slidstærk kvalitet, der holder form og farve.
            Skabt til at kunne bruges længe og gå i arv.
          </p>
        </div>

        <div className="badge-card">
          <img src={badge4} alt="Komfort badge" className="badge-image" />
          <p className="badge-description">
            Materialer som sikrer høj komfort for barnet. Pasformer er udviklet
            til fri bevægelse, leg og hverdagsbrug.
          </p>
        </div>
      </div>
    </section>
  );
}
