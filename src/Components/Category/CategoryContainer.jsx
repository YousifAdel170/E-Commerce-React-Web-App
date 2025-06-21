/* eslint-disable react/prop-types */

// Import Components from  React-Bootstrap
import { Row, Spinner } from "react-bootstrap";

// Import Custom Components
import CartegoryCard from "./CartegoryCard";

import { colors } from "../../constants/colors";

// Component Responsible for displaying the Category Container
const CategoryContainer = ({ categories, loading }) => {
  // Get The Mode of the Application (Light or Dark) from the Redux Store
  const darkMode = 1;

  // Apply the mode to the display the background color of the categories
  const mode = darkMode ? "dark" : "light";

  return (
    // Main Container of the Category
    <Row className="my-5 d-flex">
      {/* Check if the data is loading or not */}
      {!loading && categories.length > 0 ? (
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
      ) : loading ? (
        <Spinner
          className="mx-auto"
          animation="border"
          variant="dark"
          role="status"
          aria-label="Loading categories"
        />
      ) : (
        <h4>لا يوجد تصنيفات</h4>
      )}
    </Row>
  );
};

export default CategoryContainer;
