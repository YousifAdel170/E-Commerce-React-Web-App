/* eslint-disable react/prop-types */

// Import Components from React Router DOM
import { Link } from "react-router-dom";

// Import Custom CSS for the Component
import "./SubTitle.css";
import { useTranslation } from "react-i18next";
// Component Responsible for rendering the sub title for each section in the home page
const SubTitle = ({ title, btnTitle, path }) => {
  const { t } = useTranslation("home");

  return (
    <div className="d-flex pt-4" role="region" aria-labelledby="section-title">
      <h2 className="sub-title my-0 d-flex align-items-center">{title}</h2>
      {btnTitle && (
        <Link
          to={path}
          className="shopping-now"
          aria-label={t("navigateToButton", { button: btnTitle })}
        >
          {btnTitle}
        </Link>
      )}
    </div>
  );
};

export default SubTitle;
