/* eslint-disable react/prop-types */

// Import Components from React Bootstrap, React Router DOM
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Component responsible for displaying a single brand card
const BrandCard = ({ img, id }) => {
  return (
    // Card component to display the brand image
    <Col
      xs="6"
      sm="6"
      md="4"
      lg="2"
      className="d-flex my-2 justify-content-center"
    >
      <Card
        style={{
          width: "100%",
          height: "151px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#fff",
        }}
        className="my-1"
      >
        <Link to={`/products/brands/${id}`}>
          <Card.Img style={{ height: "151px", width: "100%" }} src={img} />
        </Link>
      </Card>
    </Col>
  );
};

// Export the BrandCard component for use in other components
export default BrandCard;
