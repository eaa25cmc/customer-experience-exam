import inspiration1 from "../image/video-1.png";
import inspiration2 from "../image/video-2.png";
import inspiration3 from "../image/video-3.png";
import inspiration4 from "../image/video-4.png";
import instagramikon from "../image/instagram.svg";

export default function ForsideInspiration() {
  return (
    <section className="forside-inspiration">
      <div className="forside-inspiration-tekst">
        <h3>Inspiration</h3>
      </div>
      <div className="inspiration-grid">
        <div className="inspiration-card">
          <img src={inspiration1} alt="Inspiration 1" />
        </div>
        <div className="inspiration-card">
          <img src={inspiration2} alt="Inspiration 2" />
        </div>
        <div className="inspiration-card">
          <img src={inspiration3} alt="Inspiration 3" />
        </div>
        <div className="inspiration-card">
          <img src={inspiration4} alt="Inspiration 4" />
        </div>
      </div>
      <div className="instagramtag">
        <img src={instagramikon} alt="Instagram Tag" />
        <p>Little Looms Instagram</p>
      </div>
    </section>
  );
}
