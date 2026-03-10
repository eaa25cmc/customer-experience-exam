import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className={styles.breadcrumbs} aria-label="Brødkrummesti">
      <Link to="/" className={styles.crumbLink}>
        Forside
      </Link>
      {pathnames.map((name, idx) => {
        const displayName = decodeURIComponent(name);
        const routeTo = "/" + pathnames.slice(0, idx + 1).join("/");
        const isLast = idx === pathnames.length - 1;

        return (
          <span key={routeTo} className={styles.crumbItem}>
            <span className={styles.crumbSep}>&gt;</span>
            {isLast ? (
              <span className={styles.crumbCurrent}>{displayName}</span>
            ) : (
              <Link to={routeTo} className={styles.crumbLink}>
                {displayName}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
