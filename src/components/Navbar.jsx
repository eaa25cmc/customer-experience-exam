import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/Baby">Baby</NavLink>
      <NavLink to="/Pige">Pige</NavLink>
      <NavLink to="/Dreng">Dreng</NavLink>
      <NavLink to="/Sale">Udsalg</NavLink>
      <NavLink to="/News">Nyheder</NavLink>
      <NavLink to="/Inspiration">Inspiration</NavLink>
    </nav>
  );
}
