// Import Components from React Bootstrap
import { Container, Row } from "react-bootstrap";

// Import Custom Components
import SubTitle from "../Utility/SubTitle";
import CartegoryCard from "../Category/CartegoryCard";
import SpinnerComponent from "../Utility/SpinnerComponent";
import ItemsNotFound from "../Utility/ItemsNotFound";

// Import Custom Hooks
import HomeCategoryHook from "../../hooks/category/HomeCategoryHook";

// Import Config File for Constants
import { colors } from "../../constants/colors";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// Component Responsible for displaying the Home Page Categories
const HomeCategory = () => {
  // Custom Hook to fetch the categories data
  const [categories, isLoading] = HomeCategoryHook();

  // Using the useTranslation hook to access translation functions
  const { t } = useTranslation("home");

  // Get The Mode of the Application (Light or Dark) from the Redux Store
  const isDark = useSelector((state) => state.ui.isDark);

  // Apply the mode to display the background color of the categories
  const mode = isDark ? "dark" : "light";

  return (
    // Main Container of the Home Category
    <Container className="home-category-container">
      {/* Title Of The Page */}
      <SubTitle
        title={t("homeCategoriesTitle")}
        btnTitle={t("homeMoreButton")}
        path={"all-categories"}
      />

      {/* Check if the data is loading or not */}
      <Row
        className="my-2 d-flex flex-wrap justify-content-between"
        aria-busy={isLoading}
      >
        {!isLoading ? (
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
            <ItemsNotFound msg={t("homeThereIsNoCategories")} />
          )
        ) : (
          // If loading, show spinner with variant based on mode
          <SpinnerComponent msg={t("homeLoadingCategoriesAriaLabel")} />
        )}
      </Row>
    </Container>
  );
};

export default HomeCategory;
