// Import Components from React Bootstrap
import { Container, Row, Spinner } from "react-bootstrap";

// Import Custom Components
import SubTitle from "../Utility/SubTitle";
import CartegoryCard from "../Category/CartegoryCard";

// Import Custom Hooks
import HomeCategoryHook from "../../hooks/category/HomeCategoryHook";

// Import Config File for Constants
import { CATEGORIES_TITLE, MORE_BUTTON_TITLE } from "../../config";

// Component Responsible for displaying the Home Page Categories
const HomeCategory = () => {
  // Custom Hook to fetch the categories data
  const [categories, loading, colors] = HomeCategoryHook();

  // Get The Mode of the Application (Light or Dark) from the Redux Store
  const darkMode = 1;

  // Apply the mode to the display the background color of the categories
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

      {/* First 5 Items */}
      <Row className="my-2 d-flex justify-content-between flex-wrap">
        {/* Check if the data is loading or not */}
        {!loading ? (
          // If the data is not loading, check if the categories exist
          categories ? (
            // If categories exist, map through the first 5 items and display them
            categories
              .slice(0, 5)
              .map((item, index) => (
                <CartegoryCard
                  id={item._id}
                  key={index}
                  title={item.name}
                  img={item.image}
                  background={
                    colors[mode][
                      Math.floor(Math.random() * colors[mode].length)
                    ]
                  }
                />
              ))
          ) : (
            // If categories do not exist, display a message
            <h4>لا يوجد تصنيفات</h4>
          )
        ) : (
          // If the data is loading, display a spinner
          <Spinner className="mx-auto" animation="border" variant="dark" />
        )}
      </Row>
    </Container>
  );
};

// Export the HomeCategory component as default
export default HomeCategory;
