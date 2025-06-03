/* eslint-disable react/prop-types */

// Import Components from React Bootstrap, React Router DOM
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import Custom CSS
import "./BrandCard.css";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";

// Component responsible for displaying a single brand card
const BrandCard = ({ img, id, index }) => {
  const [sectionRef, isVisible] = useInviewAnimation();
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
        className={`my-1 brand-card ${isVisible ? "fade-in" : ""}`}
        ref={sectionRef}
        style={{
          animationDelay: `${index * 0.1}s`,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Link to={`/products/brands/${id}`}>
          <Card.Img src={img} alt={`Brand ${id}`} loading="lazy" />
        </Link>
      </Card>
    </Col>
  );
};

// Export the BrandCard component for use in other components
export default BrandCard;
