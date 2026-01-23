// Import Bootstrap Components
import { Col, Container, Row, Spinner } from "react-bootstrap";

// Import Routing Utilities
import { Link, useLocation } from "react-router-dom";

// Import Custom Hook to fetch all categories
import AllCategoryPageHook from "../../hooks/category/AllCategoryPageHook";

// Import Styling
import "./CategoryHeader.css";

// Import Internationalization
import { useTranslation } from "react-i18next";

// Import Global State (for theme detection)
import { useSelector } from "react-redux";

// Component Responsible for Displaying the Top Category Navigation Bar
const CategoryHeader = () => {
  // Fetch categories and loading state from the custom hook
  const [categoriesData, isLoading] = AllCategoryPageHook();

  // Translation function from i18n
  const { t } = useTranslation("home");

  // Get current route to apply active styles
  const location = useLocation();

  // Determine current theme (light or dark) to style spinner
  const { isDark } = useSelector((state) => state.ui);
  const spinnerVariant = isDark ? "light" : "dark";

  return (
    // Semantic nav with appropriate aria-label
    <nav className="cat-header" aria-label={t("homeCategoriesTitle")}>
      <Container>
        <Row>
          {/* Container for category buttons */}
          <Col
            className="d-flex justify-content-start py-2 flex-wrap"
            role="list"
          >
            {/* Show loading spinner while fetching categories */}
            {isLoading ? (
              <Spinner
                className="mx-auto"
                animation="border"
                variant={spinnerVariant}
                role="status"
                aria-label={t("homeLoadingCategoriesAriaLabel")}
              />
            ) : (
              // Render first 5 categories with routing and ARIA support
              categoriesData &&
              categoriesData?.slice(0, 5).map((category) => (
                <Link
                  key={category?._id}
                  to={`/products/category/${category?._id}`}
                  className={`cat-text-header ${
                    location.pathname.includes(category?._id) ? "active" : ""
                  }`}
                  aria-label={t("navigateToButton", {
                    button: category?.name,
                  })}
                >
                  {category?.name}
                </Link>
              ))
            )}

            {/* Render "More" button linking to all categories */}
            <Link
              to="/all-categories"
              className={`cat-text-header ${
                location.pathname === "/all-categories" ? "active" : ""
              }`}
              aria-label={t("homeMoreButton")}
            >
              {t("homeMoreButton")}
            </Link>
          </Col>
        </Row>
      </Container>
    </nav>
  );
};

export default CategoryHeader;
