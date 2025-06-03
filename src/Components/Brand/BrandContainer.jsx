/* eslint-disable react/prop-types */

// Import Components from React Bootstrap
import { Row, Spinner } from "react-bootstrap";

// Import Custom Components
import BrandCard from "./BrandCard";

// Component responsible for displaying the brand cards in a row
const BrandContainer = ({ brands, loading }) => {
  return (
    // Row to display the brand cards
    <Row className="my-2 d-flex justify-content-between">
      {/* Check if loading is false and brands array has items */}
      {!loading ? (
        brands.length > 0 ? (
          brands.map((item, index) => (
            <BrandCard
              key={item._id}
              id={item._id}
              img={item.image}
              index={index}
            />
          ))
        ) : (
          // If no brands are available, display a message
          <h4>لا يوجد ماركات</h4>
        )
      ) : (
        // If loading is true, display a spinner
        <Spinner
          className="mx-auto"
          animation="border"
          variant="dark"
          role="status"
          aria-label="Loading Brands"
        />
      )}
    </Row>
  );
};

export default BrandContainer;
