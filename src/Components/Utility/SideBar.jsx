/* eslint-disable react/prop-types */

// Import necessary Components from react-router-dom
import { NavLink } from "react-router-dom";

// Import Custom Hooks
import SideBarHook from "../../hooks/Utility/SideBarHook";

// Import Custom CSS
import "./SideBar.css";

// Component responsible for rendering the sidebar navigation
const SideBar = ({ role }) => {
  // Use the custom hook to manage sidebar state and behavior
  const [showBurger, menuOpen, setMenuOpen, toggleMenu, handleKeyDown, links] =
    SideBarHook(role);
  return (
    // Sidebar Navigation
    <nav
      className="sidebar-container"
      role="navigation"
      aria-label="Sidebar Navigation"
    >
      {/* Burger Menu Button for Mobile View */}
      {showBurger && (
        <button
          className={`burger${menuOpen ? " open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <span className="bar bar1"></span>
          <span className="bar bar2"></span>
          <span className="bar bar3"></span>
        </button>
      )}

      {/* Sidebar Links */}
      {showBurger ? (
        // If burger menu is shown, display links in a sidebar menu
        <div className={`sidebar-menu${menuOpen ? " open" : ""}`}>
          {links.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `sidebar-text border-bottom animate ${item.className} ${
                  isActive ? "active" : ""
                }`
              }
              style={{ animationDelay: `${index * 100}ms` }}
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      ) : (
        // If burger menu is not shown, display links in a row
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

// Export the SideBar component for use in other parts of the application
export default SideBar;
