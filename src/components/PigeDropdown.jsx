// Pige dropdown-menu – navigationsoverlay der viser underkategorier til pige-sektionen.
// Lukkes ved klik på baggrunden eller krydset via onClose-prop.
import { NavLink } from "react-router-dom";
import "./Dropdown.css";
import dropdownbaggrund from "../image/kategoripigedropdown.svg";
import kryds from "../image/kryds.svg";

export default function PigeDropdown({ onClose }) {
  return (
    <div className="dropdown-overlay" onClick={onClose}>
      <div
        className="kategoridropdown"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundImage: `url(${dropdownbaggrund})` }}
      >
        <button className="dropdown-close" onClick={onClose}>
          <img src={kryds} alt="Luk" />
        </button>

        <div className="dropdown-grid">
          <div className="dropdown-column">
            <NavLink
              to="/kategori/baby/overtoj"
              onClick={onClose}
              className="dropdown-title"
            >
              Overtøj
            </NavLink>
            <NavLink to="/kategori/pige/overtoj/flyverdragt" onClick={onClose}>
              Flyverdragt
            </NavLink>
            <NavLink to="/kategori/pige/overtoj/regntoj" onClick={onClose}>
              Regntøj
            </NavLink>
            <NavLink to="/kategori/pige/overtoj/jakker" onClick={onClose}>
              Jakker
            </NavLink>
            <NavLink
              to="/kategori/pige/overtoj/huer-og-vanter"
              onClick={onClose}
            >
              Huer og vanter
            </NavLink>
            <NavLink to="/kategori/pige/overtoj/termotoj" onClick={onClose}>
              Termotøj
            </NavLink>
          </div>

          <div className="dropdown-column">
            <NavLink
              to="/kategori/baby/overdele"
              onClick={onClose}
              className="dropdown-title"
            >
              Overdele
            </NavLink>
            <NavLink to="/kategori/pige/overdele/strik" onClick={onClose}>
              Strik
            </NavLink>
            <NavLink to="/kategori/pige/overdele/bluser" onClick={onClose}>
              Bluser
            </NavLink>
            <NavLink to="/kategori/pige/overdele/skjorter" onClick={onClose}>
              Skjorter
            </NavLink>
            <NavLink to="/kategori/pige/overdele/t-shirt" onClick={onClose}>
              T-shirt
            </NavLink>
            <NavLink to="/kategori/pige/overdele/kjoler" onClick={onClose}>
              Kjoler
            </NavLink>
          </div>

          <div className="dropdown-column">
            <NavLink
              to="/kategori/baby/accessories"
              onClick={onClose}
              className="dropdown-title"
            >
              Accessories
            </NavLink>
            <NavLink to="/kategori/pige/accessories/stromper" onClick={onClose}>
              Strømper
            </NavLink>
            <NavLink to="/kategori/pige/accessories/hatte" onClick={onClose}>
              Hatte
            </NavLink>
            <NavLink to="/kategori/pige/accessories/badetoj" onClick={onClose}>
              Badetøj
            </NavLink>
            <NavLink to="/kategori/pige/accessories/harpynt" onClick={onClose}>
              Hårpynt
            </NavLink>
          </div>

          <div className="dropdown-column">
            <NavLink
              to="/kategori/baby/underdele"
              onClick={onClose}
              className="dropdown-title"
            >
              Underdele
            </NavLink>
            <NavLink to="/kategori/pige/underdele/shorts" onClick={onClose}>
              Shorts
            </NavLink>
            <NavLink to="/kategori/pige/underdele/jeans" onClick={onClose}>
              Jeans
            </NavLink>
            <NavLink to="/kategori/pige/underdele/bukser" onClick={onClose}>
              Bukser
            </NavLink>
            <NavLink to="/kategori/pige/underdele/nederdele" onClick={onClose}>
              Nederdele
            </NavLink>
            <NavLink
              to="/kategori/pige/underdele/leggins-og-strompebukser"
              onClick={onClose}
            >
              Leggins og strømpebukser
            </NavLink>
          </div>

          <div className="dropdown-column">
            <NavLink
              to="/kategori/baby/fodtoj"
              onClick={onClose}
              className="dropdown-title"
            >
              Fodtøj
            </NavLink>
            <NavLink to="/kategori/pige/fodtoj/sko" onClick={onClose}>
              Sko
            </NavLink>
            <NavLink to="/kategori/pige/fodtoj/stovler" onClick={onClose}>
              Støvler
            </NavLink>
            <NavLink to="/kategori/pige/fodtoj/gummistovler" onClick={onClose}>
              Gummistøvler
            </NavLink>
            <NavLink to="/kategori/pige/fodtoj/sandaler" onClick={onClose}>
              Sandaler
            </NavLink>
          </div>

          <div className="dropdown-column">
            <NavLink
              to="/kategori/baby/undertojognattoj"
              onClick={onClose}
              className="dropdown-title"
            >
              Undertøj & nattøj
            </NavLink>
            <NavLink
              to="/kategori/baby/udsalg"
              onClick={onClose}
              className="dropdown-title"
            >
              Udsalg
            </NavLink>

            <NavLink
              to="/kategori/baby/nyheder"
              onClick={onClose}
              className="dropdown-title"
            >
              Nyheder
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
