import "./Footer.css";
import globeikon from "../image/globus.svg";
import facebookikon from "../image/facebook.svg";
import pinterestikon from "../image/pinterest.svg";
import instagramikon from "../image/instagramhvid.svg";
import mobilepayikon from "../image/mobilepay.svg";
import applepayikon from "../image/applepay.svg";
import mastercardikon from "../image/mastercard.svg";
import visaikon from "../image/visa.svg";
import paypalikon from "../image/paypal.svg";
import klarnaikon from "../image/klarna.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-kolonne">
          <h4>Shopping guide</h4>
          <a href="#">Størrelsesguide</a>
          <a href="#">Levering & fragt</a>
          <a href="#">Returnering</a>
        </div>

        <div className="footer-kolonne">
          <h4>Om Little Looms</h4>
          <a href="#">Vores historie</a>
          <a href="#">Mission & værdier</a>
          <a href="#">Bæredygtighed</a>
        </div>

        <div className="footer-kolonne">
          <h4>Min konto</h4>
          <a href="#">Log ind / Opret konto</a>
          <a href="#">Ordrehistorik</a>
          <a href="#">Mine favoritter</a>
          <a href="#">Kontooplysninger</a>
        </div>

        <div className="footer-kolonne">
          <h4>Hjælp</h4>
          <a href="#">Ofte stillede spørgsmål</a>
          <a href="#">Kontakt kundeservice</a>
          <a href="#">Reklamation</a>
          <a href="#">Handelsbetingelser</a>
        </div>

        <div className="footer-kolonne">
          <h4>Kontakt</h4>
          <a href="#">Kundeservice</a>
          <a href="#">Samarbejde</a>
          <a href="#">Presse</a>
          <a href="#">Find os her</a>
        </div>
      </div>

      <div className="footer-bund">
        <div className="footer-sprog">
          <img src={globeikon} alt="Sprog" />
          <p>Danmark/Dansk</p>
        </div>

        <div className="footer-socialemedier">
          <img src={facebookikon} alt="Facebook" />
          <img src={pinterestikon} alt="Pinterest" />
          <img src={instagramikon} alt="Instagram" />
        </div>

        <div className="footer-betalinger">
          <img src={mobilepayikon} alt="MobilePay" />
          <img src={applepayikon} alt="Apple Pay" />
          <img src={mastercardikon} alt="Mastercard" />
          <img src={visaikon} alt="Visa" />
          <img src={paypalikon} alt="PayPal" />
          <img src={klarnaikon} alt="Klarna" />
        </div>
      </div>
    </footer>
  );
}
