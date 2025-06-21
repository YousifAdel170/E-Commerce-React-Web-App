// Import Components from react-bootstrap
import { Col, Container, Row } from "react-bootstrap";

// Import Custom Hook for in-view animation
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";

// Import Used Images
import { DISCOUNT_SECTION_IMAGE } from "../../constants/images";

// Import Custom CSS
import "./DiscountSection.css";
import { useTranslation } from "react-i18next";

// Component responsible for displaying the discount section
const DiscountSection = () => {
  const [sectionRef, isVisible] = useInviewAnimation();

  const { t } = useTranslation("home");

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
              {t("homeDiscountTitlePart1")}
              <span className="highlighted-percentage">
                {t("homeDiscountPercentage")}
              </span>
              {t("homeDiscountTitlePart2")}
            </div>
          </Col>

          <Col sm="6" className="text-center">
            <img
              className="discount-img"
              src={DISCOUNT_SECTION_IMAGE}
              alt={t("homeDiscountAriaLabel")}
              loading="lazy"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DiscountSection;
