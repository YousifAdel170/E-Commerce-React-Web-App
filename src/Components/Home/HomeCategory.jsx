// Import Components from React Bootstrap
import { Container, Row, Spinner } from "react-bootstrap";

// Import Custom Components
import SubTitle from "../Utility/SubTitle";
import CartegoryCard from "../Category/CartegoryCard";

// Import Custom Hooks
import HomeCategoryHook from "../../hooks/category/HomeCategoryHook";

// Import Config File for Constants
import { CATEGORIES_TITLE, colors, MORE_BUTTON_TITLE } from "../../config";

// Component Responsible for displaying the Home Page Categories
const HomeCategory = () => {
  // Custom Hook to fetch the categories data
  const [categories, isLoading] = HomeCategoryHook();

  // console.log("Category from Component: ", categories);

  // Get The Mode of the Application (Light or Dark) from the Redux Store
  const darkMode = 1;

  // Apply the mode to display the background color of the categories
  const mode = darkMode ? "dark" : "light";
  return (
    // Main Container of the Home Category
    <Container>
      {/* Title Of The Page */}
      <SubTitle
        title={CATEGORIES_TITLE}
        btnTitle={MORE_BUTTON_TITLE}
        path={"all-categories"}
      />

      {/* Check if the data is loading or not */}
      <Row className="my-2 d-flex justify-content-between flex-wrap">
        {!isLoading ? (
          // Check if the categories data exists
          categories ? (
            // Map over the categories to display each category card
            categories.map((item, index) => (
              <CartegoryCard
                id={item._id}
                key={item?._id || index}
                title={item.name}
                img={item.image}
                background={
                  colors[mode][Math.floor(Math.random() * colors[mode].length)]
                }
                index={index}
              />
            ))
          ) : (
            // If the categories data is empty, show a message
            <h4>لا يوجد تصنيفات</h4>
          )
        ) : (
          // If the data is loading, show a spinner
          <Spinner
            className="mx-auto"
            animation="border"
            variant="dark"
            role="status"
            aria-label="Loading categories"
          />
        )}
      </Row>
    </Container>
  );
};

// Export the HomeCategory component as default
export default HomeCategory;
