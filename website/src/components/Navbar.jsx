import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar flex-center rounded">
      <NavLink to="/" className="nav-item" end>Home</NavLink>
      <NavLink to="/mentor" className="nav-item">Mentor Page</NavLink>
    </nav>
  );
}
