// Import Components from React Bootstrap
import { Spinner } from "react-bootstrap";

// Import Used Hooks
import { useSelector } from "react-redux";

// Import PropTypes for props validation
import PropTypes from "prop-types";

// Component Responsible for displaying a Spinner
const SpinnerComponent = ({ msg, size, className, as }) => {
  const isDark = useSelector((state) => state.ui.isDark);
  const mode = isDark ? "dark" : "light";

  return (
    <Spinner
      className={`${className ? className : "mx-auto "}`}
      animation="border"
      variant={mode === "dark" ? "light" : "dark"}
      aria-label={msg}
      size={size}
      role="status"
      as={as}
      aria-busy="true"
    />
  );
};

SpinnerComponent.propTypes = {
  msg: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  as: PropTypes.elementType,
};

export default SpinnerComponent;
