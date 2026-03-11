import { NavLink } from "react-router-dom";
import "./Dropdown.css";
import dropdownbaggrund from "../image/kategoridrengdropdown.svg";
import kryds from "../image/kryds.svg";

export default function DrengDropdown({ onClose }) {
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
              to="/kategori/dreng/overtoj"
              onClick={onClose}
              className="dropdown-title"
            >
              Overtøj
            </NavLink>

            <NavLink to="/kategori/dreng/overtoj/flyverdragt" onClick={onClose}>
              Flyverdragt
            </NavLink>
            <NavLink to="/kategori/dreng/overtoj/regntoj" onClick={onClose}>
              Regntøj
            </NavLink>
            <NavLink to="/kategori/dreng/overtoj/jakker" onClick={onClose}>
              Jakker
            </NavLink>
            <NavLink
              to="/kategori/dreng/overtoj/huer-og-vanter"
              onClick={onClose}
            >
              Huer og vanter
            </NavLink>
            <NavLink to="/kategori/dreng/overtoj/termotoj" onClick={onClose}>
              Termotøj
            </NavLink>
          </div>

          <div className="dropdown-column">
            <NavLink
              to="/kategori/dreng/overdele"
              onClick={onClose}
              className="dropdown-title"
            >
              Overdele
            </NavLink>

            <NavLink to="/kategori/dreng/overdele/strik" onClick={onClose}>
              Strik
            </NavLink>
            <NavLink to="/kategori/dreng/overdele/bluser" onClick={onClose}>
              Bluser
            </NavLink>
            <NavLink to="/kategori/dreng/overdele/skjorter" onClick={onClose}>
              Skjorter
            </NavLink>
            <NavLink to="/kategori/dreng/overdele/t-shirt" onClick={onClose}>
              T-shirt
            </NavLink>
          </div>

          <div className="dropdown-column">
            <NavLink
              to="/kategori/dreng/accessories"
              onClick={onClose}
              className="dropdown-title"
            >
              Accessories
            </NavLink>

            <NavLink
              to="/kategori/dreng/accessories/stromper"
              onClick={onClose}
            >
              Strømper
            </NavLink>
            <NavLink to="/kategori/dreng/accessories/hatte" onClick={onClose}>
              Hatte
            </NavLink>
            <NavLink to="/kategori/dreng/accessories/badetoj" onClick={onClose}>
              Badetøj
            </NavLink>
          </div>

          <div className="dropdown-column">
            <NavLink
              to="/kategori/dreng/underdele"
              onClick={onClose}
              className="dropdown-title"
            >
              Underdele
            </NavLink>

            <NavLink to="/kategori/dreng/underdele/shorts" onClick={onClose}>
              Shorts
            </NavLink>
            <NavLink to="/kategori/dreng/underdele/jeans" onClick={onClose}>
              Jeans
            </NavLink>
            <NavLink to="/kategori/dreng/underdele/bukser" onClick={onClose}>
              Bukser
            </NavLink>
            <NavLink to="/kategori/dreng/underdele/stromper" onClick={onClose}>
              Strømper
            </NavLink>
          </div>

          <div className="dropdown-column">
            <NavLink
              to="/kategori/dreng/fodtoj"
              onClick={onClose}
              className="dropdown-title"
            >
              Fodtøj
            </NavLink>

            <NavLink to="/kategori/dreng/fodtoj/sko" onClick={onClose}>
              Sko
            </NavLink>
            <NavLink to="/kategori/dreng/fodtoj/stovler" onClick={onClose}>
              Støvler
            </NavLink>
            <NavLink to="/kategori/dreng/fodtoj/gummistovler" onClick={onClose}>
              Gummistøvler
            </NavLink>
            <NavLink to="/kategori/dreng/fodtoj/sandaler" onClick={onClose}>
              Sandaler
            </NavLink>
          </div>

          <div className="dropdown-column">
            <NavLink
              to="/kategori/dreng/undertojognattoj"
              onClick={onClose}
              className="dropdown-title"
            >
              Undertøj & nattøj
            </NavLink>

            <NavLink
              to="/kategori/dreng/udsalg"
              onClick={onClose}
              className="dropdown-title"
            >
              Udsalg
            </NavLink>

            <NavLink
              to="/kategori/dreng/nyheder"
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
