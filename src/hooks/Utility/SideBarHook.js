// Import Hooks from React
import { useCallback, useState } from "react";

// Import Constants Data
import { sidebarData } from "../../constants/sidebar";

// Hook Responsible for managing the sidebar state and behavior
const SideBarHook = (role) => {
  // Get the sidebar links based on the user role
  const links = sidebarData[role] || [];

  // State to manage the visibility of the sidebar menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Determine if the burger menu should be shown based on the number of links
  const showBurger = links.length > 5;

  // Function to toggle the sidebar menu open/close state
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  // Function to handle keydown events for accessibility
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      }
    },
    [toggleMenu]
  );

  // Return the state and functions to be used in the component
  return [showBurger, menuOpen, setMenuOpen, toggleMenu, handleKeyDown, links];
};

// Export the hook for use in other components
export default SideBarHook;
