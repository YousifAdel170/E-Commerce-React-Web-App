import { useState } from "react";
import { NavLink } from "react-router-dom";
import { sidebarData } from "../../constants/sidebar";
import "./SideBar.css";

const SideBar = ({ role }) => {
  const links = sidebarData[role] || [];
  const [menuOpen, setMenuOpen] = useState(false);

  // Show burger only if links length > 7 (on mobile)
  const showBurger = links.length > 7;

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className="sidebar-container"
      role="navigation"
      aria-label="Sidebar Navigation"
    >
      {showBurger && (
        <button
          className={`burger${menuOpen ? " open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span className="bar bar1"></span>
          <span className="bar bar2"></span>
          <span className="bar bar3"></span>
        </button>
      )}

      {/* If burger is shown, links show inside toggled menu */}
      {showBurger ? (
        <div className={`sidebar-menu${menuOpen ? " open" : ""}`}>
          {links.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `sidebar-text border-bottom ${item.className} ${
                  isActive ? "active" : ""
                }`
              }
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              onClick={() => setMenuOpen(false)} // close menu on link click
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      ) : (
        // If no burger, show links in horizontal row on mobile
        <div className="mobile-row">
          {links.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `sidebar-text border-bottom ${item.className} ${
                  isActive ? "active" : ""
                }`
              }
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default SideBar;
