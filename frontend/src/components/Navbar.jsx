import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo" onClick={closeMenu}>
        CryptoVista Analytics
      </Link>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
          onClick={closeMenu}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/intelligence"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
          onClick={closeMenu}
        >
          Intelligence
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
          onClick={closeMenu}
        >
          About
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
          onClick={closeMenu}
        >
          Login
        </NavLink>
      </div>

      {/* Mobile Toggle */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
}
