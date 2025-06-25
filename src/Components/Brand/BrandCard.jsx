/* eslint-disable react/prop-types */
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";

import "./BrandCard.css";

const BrandCard = ({ img, id, name, index }) => {
  const { t } = useTranslation("home");
  const [sectionRef, isVisible] = useInviewAnimation();

  return (
    <Col
      xs="12"
      sm="6"
      md="4"
      lg="2"
      className="d-flex my-2 justify-content-center align-items-center"
    >
      <Card
        className={`my-1 brand-card ${isVisible ? "fade-in" : ""}`}
        ref={sectionRef}
        style={{
          animationDelay: `${index * 0.1}s`,
        }}
        role="group"
        aria-label={t("productCardAriaLabel", { title: name || id })}
      >
        <Link
          to={`/products/brands/${id}`}
          tabIndex={0}
          aria-label={t("navigateToButton", { button: name || id })}
        >
          <Card.Img
            src={img}
            alt={t("productImageAlt", { title: name || id })}
            loading="lazy"
          />
        </Link>
      </Card>
    </Col>
  );
};

export default BrandCard;
