// Import Components from react bootstrap
import { Col, Container, Row } from "react-bootstrap";

// Import Used Assets
import laptop from "../../Assets/Imgs/laptops.png";

// Import Custom CSS
import "./DiscountSection.css";

// Component responsible for displaying the discount section
const DiscountSection = () => {
  return (
    // Main Container of the Discount Section
    <Container>
      {/* Title of the Discount Section */}
      <Row className="discount-background mt-4 mx-2 d-flex text-center align-items-center mb-30px-mobile ">
        <Col sm="6">
          {/* Discount Title */}
          <div className="discount-title">
            خصم يصل حتي 30% علي اجهزة اللاب توب
          </div>
        </Col>

        {/* Discount Image */}
        <Col sm="6">
          <img className="discount-img" src={laptop} alt="" />
        </Col>
      </Row>
    </Container>
  );
};

export default DiscountSection;
