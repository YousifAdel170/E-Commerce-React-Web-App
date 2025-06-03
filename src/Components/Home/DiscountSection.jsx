// Import Components from react-bootstrap
import { Col, Container, Row } from "react-bootstrap";

// Import Custom Hook for in-view animation
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";

// Import Used Images
import { DISCOUNT_SECTION_IMAGE } from "../../constants/images";

// Import Custom CSS
import "./DiscountSection.css";

// Component responsible for displaying the discount section
const DiscountSection = () => {
  const [sectionRef, isVisible] = useInviewAnimation();

  return (
    <section aria-label="Laptop Discount Section">
      <Container>
        <Row
          ref={sectionRef}
          className={`discount-background mt-4 mx-2 d-flex text-center align-items-center justify-content-center flex-wrap ${
            isVisible ? "animate-discount" : ""
          }`}
        >
          <Col sm="6" className="mb-3 mb-md-0">
            <div className="discount-title">
              خصم يصل حتى
              <span className="highlighted-percentage"> 30%</span>
              على أجهزة اللاب توب
            </div>
          </Col>

          <Col sm="6" className="text-center">
            <img
              className="discount-img"
              src={DISCOUNT_SECTION_IMAGE}
              alt="Laptop Discount"
              loading="lazy"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DiscountSection;
