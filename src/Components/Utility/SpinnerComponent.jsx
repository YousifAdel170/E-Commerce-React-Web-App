// Import Components from React Bootstrap
import { Spinner } from "react-bootstrap";

// Import Used Hooks
import { useSelector } from "react-redux";

// Component Responsible for displaying a Spinner
const SpinnerComponent = (msg) => {
  const isDark = useSelector((state) => state.ui.isDark);
  const mode = isDark ? "dark" : "light";

  return (
    <Spinner
      className="mx-auto"
      animation="border"
      variant={mode === "dark" ? "light" : "dark"}
      aria-label={msg}
      role="status"
      aria-busy="true"
    />
  );
};

export default SpinnerComponent;
