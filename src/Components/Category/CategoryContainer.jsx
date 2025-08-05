/* eslint-disable react/prop-types */

// Import Components from  React-Bootstrap
import { Row, Spinner } from "react-bootstrap";

// Import Custom Components
import CartegoryCard from "./CartegoryCard";

import { colors } from "../../constants/colors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// Component Responsible for displaying the Category Container
const CategoryContainer = ({ categories, loading }) => {
  // Using the useTranslation hook to access translation functions
  const { t } = useTranslation("home");

  // Get The Mode of the Application (Light or Dark) from the Redux Store
  const isDark = useSelector((state) => state.ui.isDark);

  // Apply the mode to display the background color of the categories
  const mode = isDark ? "dark" : "light";

  return (
    // Main Container of the Category
    <Row className="d-flex align-items-center my-2">
      {!loading ? (
        categories && categories.length > 0 ? (
          // Map over the categories to display each category card
          categories.map((item, index) => (
            <CartegoryCard
              id={item._id}
              key={item._id || index}
              title={item.name}
              img={item.image}
              background={colors[mode][index % colors[mode].length]}
              index={index}
            />
          ))
        ) : (
          // If no categories, show a message
          <div
            className="text-center w-100 py-4"
            role="alert"
            aria-live="polite"
            style={{ color: "var(--focus-color)" }}
          >
            <h4
              className="text-center w-100"
              role="note"
              aria-live="polite"
              style={{
                fontSize: "1.1rem",
                padding: "1rem",
              }}
            >
              {t("homeThereIsNoCategories")}
            </h4>
          </div>
        )
      ) : (
        // If loading, show spinner with variant based on mode
        <Spinner
          className="mx-auto"
          animation="border"
          variant={mode === "dark" ? "light" : "dark"}
          aria-label={t("homeLoadingCategoriesAriaLabel")}
          role="status"
          aria-busy="true"
        />
      )}
    </Row>
  );
};

export default CategoryContainer;
