/* eslint-disable react/prop-types */

// Import Components from React Router DOM
import { Link } from "react-router-dom";

// Import Custom CSS for the Component
import "./SubTitle.css";
const SubTitle = ({ title, btnTitle, path }) => {
  return (
    <div className="d-flex justify-content-between pt-4">
      <div className="sub-title">{title}</div>
      <Link to={`${path}`}>
        {btnTitle ? <div className="shopping-now">{btnTitle}</div> : null}
      </Link>
    </div>
  );
};

export default SubTitle;
